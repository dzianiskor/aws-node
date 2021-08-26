const fs = require("fs");
const util = require("util");
const path = require("path");
const readFile = util.promisify(fs.readFile);

export const getDataFromJsonFile = async (pathFile) => {
  try {
    const data = await readFile(path.join(__dirname, pathFile), {
      encoding: "utf-8",
    });

    return JSON.parse(data);
  } catch (e) {
    console.log(e);
    throw "Can't read file";
  }
};
