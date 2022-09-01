"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b, _c, _d, _e, _f, _g, _h, _j;
Object.defineProperty(exports, "__esModule", { value: true });
//@ts-check
const dotenv_1 = __importDefault(require("dotenv"));
const convert_arguments_to_map_1 = __importDefault(require("./convert-arguments-to-map"));
const get_aws_credentials_1 = __importDefault(require("./get-aws-credentials"));
const write_credentials_to_config_1 = __importDefault(require("./write-credentials-to-config"));
dotenv_1.default.config();
const [_EXECPATH, _PATH, ...providedArguments] = process.argv;
const argumentsMap = (0, convert_arguments_to_map_1.default)(providedArguments);
console.log(argumentsMap);
const accountNumber = (_a = process.env.ACCNUM) !== null && _a !== void 0 ? _a : argumentsMap.get("--account-number");
if (!accountNumber)
    throw Error("Account number must be provided.");
const role = (_b = process.env.ROLE) !== null && _b !== void 0 ? _b : argumentsMap.get("--role");
if (!role)
    throw Error("Role must be provided.");
const provider = (_c = process.env.PROVIDER) !== null && _c !== void 0 ? _c : argumentsMap.get("--provider");
if (!provider)
    throw Error("SAML provider name must be provided.");
const fileName = (_e = (_d = process.env.FILE) !== null && _d !== void 0 ? _d : argumentsMap.get("--file-name")) !== null && _e !== void 0 ? _e : "samlresponse.log";
const configLocation = (_g = (_f = process.env.CONFIG_LOCATION) !== null && _f !== void 0 ? _f : argumentsMap.get("--config-location")) !== null && _g !== void 0 ? _g : ".aws/credentials";
const profile = (_j = (_h = process.env.PROFILE) !== null && _h !== void 0 ? _h : argumentsMap.get("--profile")) !== null && _j !== void 0 ? _j : `new${String(Date.now())}`;
(0, get_aws_credentials_1.default)(accountNumber, role, provider, fileName)
    .then((credentials) => {
    (0, write_credentials_to_config_1.default)(credentials, configLocation, profile);
    console.log(`Updated profile ${profile}.`);
})
    .catch((error) => console.log(error));
//# sourceMappingURL=index.js.map