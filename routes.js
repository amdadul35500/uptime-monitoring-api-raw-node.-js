/*
 *Title: Routes
 *Description: Application Routes
 *Author: Amdadul haque
 *Data: 30/12/2021
 */

// Dependencies
const { sampleHandler } = require("./handlers/routesHandler/sampleHandler");
const { userHandler } = require("./handlers/routesHandler/userHandler");
const { tokenHandler } = require("./handlers/routesHandler/tokenHandler");
const { checkHandler } = require("./handlers/routesHandler/checkHandler");

const routes = {
  sample: sampleHandler,
  user: userHandler,
  token: tokenHandler,
  check: checkHandler,
};

module.exports = routes;
