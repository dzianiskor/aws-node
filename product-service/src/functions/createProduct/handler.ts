import "source-map-support/register";

import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/apiGateway";
import { formatJSONResponse } from "@libs/apiGateway";
import { middyfy } from "@libs/lambda";

import schema from "./schema";
import { sendError } from "@libs/errorResolver";
import { addProductInDB } from "@libs/dbHelper";

const hello: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event
) => {
  try {
    const product = event.body;
    const id = await addProductInDB(product);
    return formatJSONResponse({
      message: `New product was done successfully with id = ${id}`,
    });
  } catch (e) {
    return sendError(e, 400);
  }
};

export const main = middyfy(hello);
