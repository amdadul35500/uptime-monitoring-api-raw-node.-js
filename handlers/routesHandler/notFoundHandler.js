/*
 *Title: NotFound Handler
 *Description:  NotFound Handler
 *Author: Amdadul haque
 *Data: 30/12/2021
 */

//module scaffolding
const handler = {};

handler.notFondHandler = (requestProperties, callback) => {
  callback(404, {
    message: "the requsted url not found",
  });
};

module.exports = handler;
