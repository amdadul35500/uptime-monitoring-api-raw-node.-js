/*
 *Title: user Handler
 *Description: Handler to handle user
 *Author: Amdadul haque
 *Data: 30/12/2021
 */

// dependencies
const data = require("../../lib/data");
const { hash } = require("../../helpers/utilities");
const { parseJSON } = require("../../helpers/utilities");
const tokenHandler = require("./tokenHandler");

//module scaffolding
const handler = {};

handler.userHandler = (requestProperties, callback) => {
  const acceptedMethod = ["get", "post", "put", "delete"];
  if (acceptedMethod.indexOf(requestProperties.method) > -1) {
    handler._user[requestProperties.method](requestProperties, callback);
  } else {
    callback(405);
  }
};

handler._user = {};

handler._user.post = (requestProperties, callback) => {
  const firstName =
    typeof requestProperties.body.firstName === "string" &&
    requestProperties.body.firstName.trim().length > 0
      ? requestProperties.body.firstName
      : false;

  const lastName =
    typeof requestProperties.body.lastName === "string" &&
    requestProperties.body.lastName.trim().length > 0
      ? requestProperties.body.lastName
      : false;

  const phone =
    typeof requestProperties.body.phone === "string" &&
    requestProperties.body.phone.trim().length === 11
      ? requestProperties.body.phone.trim()
      : false;

  const password =
    typeof requestProperties.body.password === "string" &&
    requestProperties.body.password.trim().length > 0
      ? requestProperties.body.password
      : false;

  const tosAgreement =
    typeof requestProperties.body.tosAgreement === "boolean" &&
    requestProperties.body.tosAgreement
      ? requestProperties.body.tosAgreement
      : false;

  if (firstName && lastName && phone && password && tosAgreement) {
    // make sure that the user doesn't already exists
    data.read("users", phone, (err1) => {
      if (err1) {
        const userObject = {
          firstName,
          lastName,
          phone,
          password: hash(password),
          tosAgreement,
        };

        // store the user to db
        data.create("users", phone, userObject, (err2) => {
          if (!err2) {
            callback(200, { message: "User was created successfully!" });
          } else {
            callback(500, { error: "could not create user!" });
          }
        });
      } else {
        callback(500, { error: "there was an problem in server side!" });
      }
    });
  } else {
    callback(500, {
      error: "You have a problem in your request",
    });
  }
};

handler._user.get = (requestProperties, callback) => {
  // check the phone number if is the valid
  const phone =
    typeof requestProperties.qureyStringObject.phone === "string" &&
    requestProperties.qureyStringObject.phone.trim().length === 11
      ? requestProperties.qureyStringObject.phone.trim()
      : false;

  if (phone) {
    // verify token
    const token =
      typeof requestProperties.headerObject.token === "string"
        ? requestProperties.headerObject.token
        : false;

    tokenHandler._token.verify(token, phone, (tokenId) => {
      if (tokenId) {
        // look up the user
        data.read("users", phone, (err, u) => {
          const user = { ...parseJSON(u) };

          if (!err && user) {
            delete user.password;
            callback(200, user);
          } else {
            callback(404, {
              erroe: "Requsted user was not found",
            });
          }
        });
      } else {
        callback(403, { error: "Authentication failure!" });
      }
    });
  } else {
    callback(404, {
      erroe: "Requsted user was not found 2",
    });
  }
};

handler._user.put = (requestProperties, callback) => {
  // check the phone number if valid
  const firstName =
    typeof requestProperties.body.firstName === "string" &&
    requestProperties.body.firstName.trim().length > 0
      ? requestProperties.body.firstName
      : false;

  const lastName =
    typeof requestProperties.body.lastName === "string" &&
    requestProperties.body.lastName.trim().length > 0
      ? requestProperties.body.lastName
      : false;

  const phone =
    typeof requestProperties.body.phone === "string" &&
    requestProperties.body.phone.trim().length === 11
      ? requestProperties.body.phone.trim()
      : false;

  const password =
    typeof requestProperties.body.password === "string" &&
    requestProperties.body.password.trim().length > 0
      ? requestProperties.body.password
      : false;

  if (phone) {
    if (firstName || lastName || password) {
      // verify token
      const token =
        typeof requestProperties.headerObject.token === "string"
          ? requestProperties.headerObject.token
          : false;

      tokenHandler._token.verify(token, phone, (tokenId) => {
        if (tokenId) {
          // look up the user
          data.read("users", phone, (err1, uData) => {
            const userData = { ...parseJSON(uData) };

            if (!err1 && userData) {
              if (firstName) {
                userData.firstName = firstName;
              }
              if (lastName) {
                userData.lastName = lastName;
              }
              if (password) {
                userData.password = password;
              }

              // store the database
              data.update("users", phone, userData, (err2) => {
                if (!err2) {
                  callback(200, { message: "user was updated successfully!" });
                } else {
                  callback(400, {
                    error: "there was an problem in server side!",
                  });
                }
              });
            } else {
              callback(400, { error: "you have an problem in your requst!" });
            }
          });
        } else {
          callback(403, { error: "Authentication failure!" });
        }
      });
    } else {
      callback(400, {
        error: "You have a problem in your request!",
      });
    }
  } else {
    callback(400, {
      error: "You have a problem in your request 2!",
    });
  }
};

handler._user.delete = (requestProperties, callback) => {
  // if phone is valid
  const phone =
    typeof requestProperties.qureyStringObject.phone === "string" &&
    requestProperties.qureyStringObject.phone.trim().length === 11
      ? requestProperties.qureyStringObject.phone
      : false;

  if (phone) {
    // verify token
    const token =
      typeof requestProperties.headerObject.token === "string"
        ? requestProperties.headerObject.token
        : false;

    tokenHandler._token.verify(token, phone, (tokenId) => {
      if (tokenId) {
        // look up the user
        data.read("users", phone, (err, userData) => {
          if (!err && userData) {
            data.delete("users", phone, (err2) => {
              if (!err2) {
                callback(200, {
                  message: "the user was successfully deleted!",
                });
              } else {
                callback(500, { error: "there was an server side error!" });
              }
            });
          } else {
            callback(500, { error: "there was an server side error!" });
          }
        });
      } else {
        callback(403, { error: "Authentication failure!" });
      }
    });
  } else {
    callback(400, { error: "there was an problem in your requst!" });
  }
};

module.exports = handler;
