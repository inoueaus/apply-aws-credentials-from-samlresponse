//@ts-check
const dotenv = require("dotenv");
const getAWSCredentials = require("./get-aws-credentials");
const writeCredentialsToConfig = require("./write-credentials-to-config");

dotenv.config();

const accountNumber = process.env.ACCNUM ?? 0;
const role = process.env.ROLE ?? "";
const provider = process.env.PROVIDER ?? "";
const fileName = process.env.FILE ?? "samlresponse.log";
const configLocation = process.env.CONFIG_LOCATION ?? ".aws/credentials";
const profile = process.env.PROFILE ?? "new" + String(Date.now());

getAWSCredentials(accountNumber, role, provider, fileName)
  .then((credentials) => {
    writeCredentialsToConfig(credentials, configLocation, profile);
    console.log(`Updated profile ${profile}.`);
  })
  .catch((error) => console.log(error));
