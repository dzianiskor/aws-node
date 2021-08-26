import "source-map-support/register";
import { formatJSONResponse } from "@libs/apiGateway";
import { middyfy } from "@libs/lambda";
import { sendError } from "@libs/errorResolver";
import { getDataFromJsonFile } from "@libs/fileHelpers";

const pathFile = "/../../data/products.json";

const getProductsList = async () => {
  try {
    const products = await getDataFromJsonFile(pathFile);

    return formatJSONResponse({ products });
  } catch (e) {
    return sendError(e, 500);
  }
};

export const main = middyfy(getProductsList);
