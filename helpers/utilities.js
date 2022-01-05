/*
 * Title: Utilities
 * Description: Important utility functions
 * Author: Sumit Saha ( Learn with Sumit )
 * Date: 11/21/2020
 *
 */

// dependencies

// module scaffolding
const crypto = require("crypto");

const utilities = {};
const enviroment = require("./enviroment");

// parse JSON string to Object
utilities.parseJSON = (jsonString) => {
  let output;

  try {
    output = JSON.parse(jsonString);
  } catch {
    output = {};
  }

  return output;
};

// hash string
utilities.hash = (str) => {
  if (typeof str === "string" && str.length > 0) {
    const hash = crypto
      .createHmac("sha256", enviroment.secretKey)
      .update(str)
      .digest("hex");
    return hash;
  }
  return false;
};

// create random number
utilities.createRandomString = (strlength) => {
  let length = strlength;
  length = typeof strlength === "number" && strlength > 0 ? strlength : false;

  if (length) {
    const possiblecherecter = "abcdefghijklmnopqrstuvwxyz1234567890";
    let output = "";
    for (let i = 1; i <= length; i++) {
      const randomCharacter = possiblecherecter.charAt(
        Math.floor(Math.random() * possiblecherecter.length)
      );
      output += randomCharacter;
    }
    return output;
  } else {
    return false;
  }
};
module.exports = utilities;
