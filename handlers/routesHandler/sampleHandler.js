/*
 *Title: Sample Handler
 *Description:  Sample Handler
 *Author: Amdadul haque
 *Data: 30/12/2021
 */

//module scaffolding
const handler = {};

handler.sampleHandler = (requestProperties, callback) => {
  console.log(requestProperties);
  callback(200, {
    message: "this is a sample url",
  });
};

module.exports = handler;
