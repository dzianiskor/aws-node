import { handlerPath } from "@libs/handlerResolver";
import schema from "@functions/createProduct/schema";

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: "post",
        path: "product/add",
        request: {
          schema: {
            "application/json": schema,
          },
        },
      },
    },
  ],
};
