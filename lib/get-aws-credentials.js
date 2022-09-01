"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
/**
 * Gets AWS credentials and returns JSON
 *
 * @param {string | number} accountNumber
 * @param {string} role
 * @param {string} provider
 * @param {string} fileName
 * @returns {Promise<AWSCredentials>}
 */
const getAWSCredentials = (accountNumber, role, provider, fileName) => new Promise((resolve, reject) => {
    const command = `aws sts assume-role-with-saml \
    --role-arn arn:aws:iam::${accountNumber}:role/${role} \
    --principal-arn arn:aws:iam::${accountNumber}:saml-provider/${provider} \
    --saml-assertion file://${fileName}`;
    (0, child_process_1.exec)(command, (error, stout, stderr) => {
        if (error)
            return reject(error);
        if (stderr)
            return reject(stderr);
        console.log("Logged in!");
        const { Credentials } = JSON.parse(stout);
        resolve(Credentials);
    });
});
exports.default = getAWSCredentials;
//# sourceMappingURL=get-aws-credentials.js.map