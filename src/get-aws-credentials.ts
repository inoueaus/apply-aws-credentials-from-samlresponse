import { exec } from "child_process";

export type AWSCredentials = {
  AccessKeyId: string;
  SecretAccessKey: string;
  SessionToken: string;
  Expiration: string;
};

/**
 * Gets AWS credentials and returns JSON
 *
 * @param {string | number} accountNumber
 * @param {string} role
 * @param {string} provider
 * @param {string} fileName
 * @returns {Promise<AWSCredentials>}
 */
const getAWSCredentials = (accountNumber: string | number, role: string, provider: string, fileName: string) =>
  new Promise<AWSCredentials>((resolve, reject) => {
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

export default getAWSCredentials;
