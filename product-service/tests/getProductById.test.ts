import { getProductById } from "../src/functions/getProductById/handler";

describe("Test getProductById", () => {
  it("Should return status 400", async () => {
    const res = await getProductById(null);
    expect(res.statusCode).toEqual(400);
  });

  it("Should return error message", async () => {
    const pathParameters = { id: "300" };
    const res = await getProductById({ pathParameters });
    expect(JSON.parse(res.body).message).toEqual(
      'ProductException: "Product not found"'
    );
  });

  it("Should return status 200", async () => {
    const pathParameters = { id: "3" };
    const res = await getProductById({ pathParameters });
    expect(res.statusCode).toEqual(200);
  });

  it("Should return title first product", async () => {
    const pathParameters = { id: "3" };
    const res = await getProductById({ pathParameters });
    expect(JSON.parse(res.body).product.title).toEqual(
      "Injustice. Боги среди нас. Год второй. Издание делюкс"
    );
  });
});
