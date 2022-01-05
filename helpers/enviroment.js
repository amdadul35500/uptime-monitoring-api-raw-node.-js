/*
 *Title: enviroments variable
 *Description: enviroments variable
 *Author: Amdadul haque
 *Data: 30/12/2021
 */

// modeul scaffolding
const enviroments = {};

enviroments.staging = {
  port: 3000,
  envName: "staging",
  secretKey: "hsjdhsdhsjdhjshdjshd",
  maxChecks: 5,
  twilio: {
    fromPhone: "",
    accountSid: "",
    authToken: "",
  },
};

enviroments.production = {
  port: 5000,
  envName: "production",
  secretKey: "djkdjskdjksdjksjdskjd",
  maxChecks: 5,
  twilio: {
    fromPhone: "",
    accountSid: "",
    authToken: "",
  },
};

// detarmine which enviroments was passed
const currentEnviroment =
  typeof process.env.NODE_ENV === "string" ? process.env.NODE_ENV : "staging";

//export coresponding enviroments object
const enviromentToExport =
  typeof enviroments[currentEnviroment] === "object"
    ? enviroments[currentEnviroment]
    : enviroments.staging;

// export module
module.exports = enviromentToExport;
