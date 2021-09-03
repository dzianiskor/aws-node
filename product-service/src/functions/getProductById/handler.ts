import "source-map-support/register";

import { formatJSONResponse } from "@libs/apiGateway";
import { middyfy } from "@libs/lambda";
import { sendError } from "@libs/errorResolver";
import { getProductByIdFromDB } from "@libs/dbHelper";

export const getProductById = async (event, context) => {
  console.log("Event\n" + JSON.stringify(event, null, 2));
  console.log("Context\n" + JSON.stringify(context, null, 2));
  try {
    const { id } = event.pathParameters;
    const product = await getProductByIdFromDB(id);

    return formatJSONResponse({
      product,
    });
  } catch (e) {
    return sendError(e, 500);
  }
};

export const main = middyfy(getProductById);
