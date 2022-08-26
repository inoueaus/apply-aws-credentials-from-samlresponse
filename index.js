//@ts-check
const { exec } = require("child_process");
const { readFileSync, writeFileSync } = require("fs");
const path = require("path");

/**
 * @typedef {{
 * AccessKeyId: string;
 * SecretAccessKey: string;
 * SessionToken: string;
 * Expiration: string;
 * }} AWSCredentials
 */

/**
 * Gets AWS credentials and returns JSON
 *
 * @param {string | number} accountNumber
 * @param {string} role
 * @param {string} provider
 * @param {string} fileName
 * @returns {Promise<AWSCredentials>}
 */
const getAWSCredentials = (accountNumber, role, provider, fileName) =>
  new Promise((resolve, reject) => {
    const command = `aws sts assume-role-with-saml \
    --role-arn arn:aws:iam::${accountNumber}:role/${role} \
    --principal-arn arn:aws:iam::${accountNumber}:saml-provider/${provider} \
    --saml-assertion file://${fileName}`;
    exec(command, (error, stout, stderr) => {
      if (error) return reject(error);
      if (stderr) return reject(stderr);

      console.log("Logged in!");
      const { Credentials } = JSON.parse(stout);
      resolve(Credentials);
    });
  });

/**
 * Writes AWS Credentials to credentials configuration file.
 *
 * @param {AWSCredentials} credentials
 * @param {string} configLocation Location from local ~/ directory.
 * @param {string} profile
 */
const writeCredentialsToConfig = (credentials, configLocation = ".aws/credentials", profile = "prayground") => {
  const credentialsPath = path.resolve(process.env.HOME ?? "/", configLocation);
  const configString = readFileSync(credentialsPath, { encoding: "utf-8" });

  const credentialsConfig = getCredentialsConfigMap(configString);

  {
    const keyToEdit = `[${profile}]`;
    const currentSettings = credentialsConfig.get(keyToEdit);
    if (!currentSettings) throw Error("Profile provided is not defined in settings file.");
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

/**
 * @typedef {Map<string, Record<string, string>>} ConfigMap
 */
/**
 * Converts credential config string into a Map for editing.
 *
 * @param {string} configString
 * @returns {ConfigMap}
 */
const getCredentialsConfigMap = (configString) => {
  const regex = /(\[.*\])\n*([^\[]+)/g;
  const matchGenerator = configString.matchAll(regex);
  const configMap = new Map();
  for (const match of matchGenerator) {
    if (!match) break;
    const [_, key, value] = match;
    /** @type {Record<string, string>} */
    const valueObject = value.split("\n").reduce((prev, row) => {
      if (!row) return prev;
      const regex = /([a-z_]*)=(.*)/g;
      const match = regex.exec(row);
      if (!match) return prev;
      const [_, key, value] = match;
      return { ...prev, [key]: value };
    }, {});
    configMap.set(key, valueObject);
  }
  return configMap;
};

/**
 * Converts a credential Config Map to a formatted string.
 *
 * @param {ConfigMap} configMap
 * @returns {string}
 */
const convertCredentialMapToString = (configMap) =>
  [...configMap.keys()].reduce((prev, key) => {
    const entry = configMap.get(key);
    if (!entry) return prev;
    const settings = Object.keys(entry).reduce((prev, key) => {
      const value = entry[key];
      return prev + key + "=" + value + "\n";
    }, "");
    const current = key + "\n" + settings;
    return prev + current + "\n";
  }, "");

const accountNumber = process.env.ACCNUM ?? 129119569090;
const role = process.env.ROLE ?? "GSuite-AWS-PrayGround-Menber";
const provider = process.env.PROVIDER ?? "Google";
const fileName = process.env.FILE ?? "samlresponse.log";

getAWSCredentials(accountNumber, role, provider, fileName)
  .then((credentials) => writeCredentialsToConfig(credentials))
  .catch((error) => console.log(error));
