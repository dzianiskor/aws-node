import "source-map-support/register";
import { formatJSONResponse } from "@libs/apiGateway";
import { middyfy } from "@libs/lambda";
import { sendError } from "@libs/errorResolver";
import { getDataFromJsonFile } from "@libs/fileHelpers";

let pathFile = "/../../data/products.json";

if (process.env.NODE_ENV === "test") {
  pathFile = "/../../src/data/products.json";
}

export const getProductsList = async () => {
  try {
    const products = await getDataFromJsonFile(pathFile);

    return formatJSONResponse({ products });
  } catch (e) {
    return sendError(e, 500);
  }
};

export const main = middyfy(getProductsList);
