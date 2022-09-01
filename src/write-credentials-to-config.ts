import { readFileSync, writeFileSync } from "fs";
import path from "path";
import { convertCredentialMapToString, getCredentialsConfigMap } from "./config-map";
import { AWSCredentials } from "./get-aws-credentials";

/**
 * @typedef {Awaited<ReturnType<import('./get-aws-credentials')>>} AWSCredentials
 */

/**
 * Writes AWS Credentials to credentials configuration file.
 *
 * @param {AWSCredentials} credentials
 * @param {string} configLocation Location from local ~/ directory.
 * @param {string} profile
 */
const writeCredentialsToConfig = (credentials: AWSCredentials, configLocation: string, profile: string) => {
  const credentialsPath = path.resolve(process.env.HOME ?? "/", configLocation);
  const configString = readFileSync(credentialsPath, { encoding: "utf-8" });

  const credentialsConfig = getCredentialsConfigMap(configString);

  {
    const keyToEdit = `[${profile}]`;
    const currentSettings = credentialsConfig.get(keyToEdit) ?? {}; // creates new profile if not present
    currentSettings["aws_access_key_id"] = credentials.AccessKeyId;
    currentSettings["aws_secret_access_key"] = credentials.SecretAccessKey;
    currentSettings["aws_session_token"] = credentials.SessionToken;
    credentialsConfig.set(keyToEdit, currentSettings);
  }

  const updatedCredentialConfigString = convertCredentialMapToString(credentialsConfig);

  writeFileSync(credentialsPath, updatedCredentialConfigString, {
    encoding: "utf-8",
  });
};

export default writeCredentialsToConfig;
