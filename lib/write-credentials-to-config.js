"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const config_map_1 = require("./config-map");
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
const writeCredentialsToConfig = (credentials, configLocation, profile) => {
    var _a, _b;
    const credentialsPath = path_1.default.resolve((_a = process.env.HOME) !== null && _a !== void 0 ? _a : "/", configLocation);
    const configString = (0, fs_1.readFileSync)(credentialsPath, { encoding: "utf-8" });
    const credentialsConfig = (0, config_map_1.getCredentialsConfigMap)(configString);
    {
        const keyToEdit = `[${profile}]`;
        const currentSettings = (_b = credentialsConfig.get(keyToEdit)) !== null && _b !== void 0 ? _b : {}; // creates new profile if not present
        currentSettings["aws_access_key_id"] = credentials.AccessKeyId;
        currentSettings["aws_secret_access_key"] = credentials.SecretAccessKey;
        currentSettings["aws_session_token"] = credentials.SessionToken;
        credentialsConfig.set(keyToEdit, currentSettings);
    }
    const updatedCredentialConfigString = (0, config_map_1.convertCredentialMapToString)(credentialsConfig);
    (0, fs_1.writeFileSync)(credentialsPath, updatedCredentialConfigString, {
        encoding: "utf-8",
    });
};
exports.default = writeCredentialsToConfig;
//# sourceMappingURL=write-credentials-to-config.js.map