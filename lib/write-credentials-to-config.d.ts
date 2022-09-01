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
declare const writeCredentialsToConfig: (credentials: AWSCredentials, configLocation: string, profile: string) => void;
export default writeCredentialsToConfig;
//# sourceMappingURL=write-credentials-to-config.d.ts.map