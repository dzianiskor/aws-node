import { DBException } from "@libs/errorResolver";

const { Client } = require("pg");
const { PG_HOST, PG_PORT, PG_DATABASE, PG_USERNAME, PG_PASSWORD } = process.env;

const dbOptions = {
  host: PG_HOST,
  port: PG_PORT,
  database: PG_DATABASE,
  user: PG_USERNAME,
  password: PG_PASSWORD,
  ssl: { rejectUnauthorized: false },
  connectionTimeoutMillis: 5000,
};

export const DBConnection = async () => {
  try {
    const client = new Client(dbOptions);
    await client.connect();

    return client;
  } catch (e) {
    throw new DBException("DB Connection lost");
  }
};

export const getProductsFromDB = async () => {
  const client = await DBConnection();
  try {
    const { rows: products } = await client.query(
      "SELECT products.*, stocks.count FROM products JOIN stocks ON id = product_id"
    );

    return products;
  } catch (e) {
    throw new DBException(e);
  } finally {
    client.end();
  }
};

export const getProductByIdFromDB = async (id) => {
  const client = await DBConnection();
  try {
    const {
      rows: products,
    } = await client.query(
      "SELECT products.*, stocks.count FROM products JOIN stocks ON id = product_id WHERE id=$1",
      [id]
    );

    return products[0];
  } catch (e) {
    throw new DBException(e);
  } finally {
    client.end();
  }
};

export const addProductInDB = async (product) => {
  const client = await DBConnection();
  try {
    await client.query("BEGIN");

    const {
      rows: newProduct,
    } = await client.query(
      "INSERT INTO products(title, description, price, image, year) values ($1, $2, $3, $4, $5) RETURNING id",
      [
        product.title,
        product.description,
        product.price,
        product.image,
        product.year,
      ]
    );
    const {
      rows: result,
    } = await client.query(
      "INSERT INTO stocks(product_id, count) values ($1, $2) RETURNING product_id",
      [newProduct[0].id, product.count]
    );
    await client.query("COMMIT");

    return result[0].product_id;
  } catch (e) {
    await client.query("ROLLBACK");
    throw e;
  } finally {
    client.end();
  }
};
