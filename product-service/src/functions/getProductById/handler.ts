import "source-map-support/register";

import { formatJSONResponse } from "@libs/apiGateway";
import { middyfy } from "@libs/lambda";
import {
  ParamException,
  ProductException,
  sendError,
} from "@libs/errorResolver";
import { getDataFromJsonFile } from "@libs/fileHelpers";

let pathFile = "/../../data/products.json";

if (process.env.NODE_ENV === "test") {
  pathFile = "/../../src/data/products.json";
}

export const getProductById = async (event) => {
  try {
    const products = await getDataFromJsonFile(pathFile);

    const { id } = event.pathParameters;
    const product = products.find((product) => product.id === id);

    if (!id) return sendError(new ParamException("ID not found"), 400);
    if (!product)
      return sendError(new ProductException("Product not found"), 400);

    return formatJSONResponse({
      product,
    });
  } catch (e) {
    return sendError(e, 400);
  }
};

export const main = middyfy(getProductById);
