import { getProductsList } from "../src/functions/getProductsList/handler";

describe("Test getProductsList", () => {
  it("Should return status 200", async () => {
    const res = await getProductsList();
    expect(res.statusCode).toEqual(200);
  });
  it("Should return products", async () => {
    const res = await getProductsList();
    expect(JSON.parse(res.body).products[0].title).toEqual(
      "Marvel Человек-Паук"
    );
  });
});
