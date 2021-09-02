import "source-map-support/register";
import { formatJSONResponse } from "@libs/apiGateway";
import { middyfy } from "@libs/lambda";
import { sendError } from "@libs/errorResolver";
import { getProductsFromDB } from "@libs/dbHelper";

export const getProductsList = async () => {
  try {
    const products = await getProductsFromDB();

    return formatJSONResponse({ products });
  } catch (e) {
    return sendError(e, 500);
  }
};

export const main = middyfy(getProductsList);
