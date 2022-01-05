/*
 *Title: Handle Reqest Response
 *Description: Handle Reqest and Response
 *Author: Amdadul haque
 *Data: 30/12/2021
 */

// Dependencise
const url = require("url");
const { StringDecoder } = require("string_decoder");
const routes = require("../routes");
const { notFondHandler } = require("../handlers/routesHandler/notFoundHandler");
const { parseJSON } = require("../helpers/utilities");

// Modele scaffolding
const handler = {};

handler.handleReqRes = (req, res) => {
  // get the url and parse it
  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname;
  const trimmedPath = path.replace(/^\/+|\/+$/g, "");
  const method = req.method.toLowerCase();
  const qureyStringObject = parsedUrl.query;
  const headerObject = req.headers;

  const requestProperties = {
    parsedUrl,
    path,
    trimmedPath,
    method,
    qureyStringObject,
    headerObject,
  };

  const decoder = new StringDecoder("utf-8");
  let = realData = "";

  const chosenHandler = routes[trimmedPath]
    ? routes[trimmedPath]
    : notFondHandler;

  req.on("data", (buffer) => {
    realData = realData + decoder.write(buffer);
  });

  req.on("end", () => {
    realData = realData + decoder.end();

    requestProperties.body = parseJSON(realData);

    chosenHandler(requestProperties, (statusCode, payload) => {
      statusCode = typeof statusCode === "number" ? statusCode : 500;
      payload = typeof payload === "object" ? payload : {};

      const payloadString = JSON.stringify(payload);

      // Return the final Response
      res.setHeader("Content-Type", "application/json");
      res.writeHead(statusCode);
      res.end(payloadString);
    });
  });
};

module.exports = handler;
