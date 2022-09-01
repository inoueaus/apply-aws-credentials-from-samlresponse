//@ts-check
import dotenv from "dotenv";
import convertArgumentsToMap from "./convert-arguments-to-map";
import getAWSCredentials from "./get-aws-credentials";
import writeCredentialsToConfig from "./write-credentials-to-config";

dotenv.config();

const [_EXECPATH, _PATH, ...providedArguments] = process.argv;

const argumentsMap = convertArgumentsToMap(providedArguments);

console.log(argumentsMap);

const accountNumber = process.env.ACCNUM ?? argumentsMap.get("--account-number");
if (!accountNumber) throw Error("Account number must be provided.");
const role = process.env.ROLE ?? argumentsMap.get("--role");
if (!role) throw Error("Role must be provided.");
const provider = process.env.PROVIDER ?? argumentsMap.get("--provider");
if (!provider) throw Error("SAML provider name must be provided.");
const fileName = process.env.FILE ?? argumentsMap.get("--file-name") ?? "samlresponse.log";
const configLocation = process.env.CONFIG_LOCATION ?? argumentsMap.get("--config-location") ?? ".aws/credentials";
const profile = process.env.PROFILE ?? argumentsMap.get("--profile") ?? `new${String(Date.now())}`;

getAWSCredentials(accountNumber, role, provider, fileName)
  .then((credentials) => {
    writeCredentialsToConfig(credentials, configLocation, profile);
    console.log(`Updated profile ${profile}.`);
  })
  .catch((error) => console.log(error));
