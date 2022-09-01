export declare type AWSCredentials = {
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
declare const getAWSCredentials: (accountNumber: string | number, role: string, provider: string, fileName: string) => Promise<AWSCredentials>;
export default getAWSCredentials;
//# sourceMappingURL=get-aws-credentials.d.ts.map