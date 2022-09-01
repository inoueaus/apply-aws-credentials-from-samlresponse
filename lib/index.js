"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
Object.defineProperty(exports, "__esModule", { value: true });
//@ts-check
const dotenv_1 = __importDefault(require("dotenv"));
const convert_arguments_to_map_1 = __importDefault(require("./convert-arguments-to-map"));
dotenv_1.default.config();
const [_EXECPATH, _PATH, ...providedArguments] = process.argv;
const argumentsMap = (0, convert_arguments_to_map_1.default)(providedArguments);
console.log(argumentsMap);
const accountNumber = (_b = (_a = process.env.ACCNUM) !== null && _a !== void 0 ? _a : argumentsMap.get("--account-number")) !== null && _b !== void 0 ? _b : 0;
const role = (_d = (_c = process.env.ROLE) !== null && _c !== void 0 ? _c : argumentsMap.get("--role")) !== null && _d !== void 0 ? _d : "";
const provider = (_f = (_e = process.env.PROVIDER) !== null && _e !== void 0 ? _e : argumentsMap.get("--account-number")) !== null && _f !== void 0 ? _f : "";
const fileName = (_h = (_g = process.env.FILE) !== null && _g !== void 0 ? _g : argumentsMap.get("--account-number")) !== null && _h !== void 0 ? _h : "samlresponse.log";
const configLocation = (_k = (_j = process.env.CONFIG_LOCATION) !== null && _j !== void 0 ? _j : argumentsMap.get("--account-number")) !== null && _k !== void 0 ? _k : ".aws/credentials";
const profile = (_m = (_l = process.env.PROFILE) !== null && _l !== void 0 ? _l : argumentsMap.get("--account-number")) !== null && _m !== void 0 ? _m : `new${String(Date.now())}`;
// getAWSCredentials(accountNumber, role, provider, fileName)
//   .then((credentials) => {
//     writeCredentialsToConfig(credentials, configLocation, profile);
//     console.log(`Updated profile ${profile}.`);
//   })
//   .catch((error) => console.log(error));
//# sourceMappingURL=index.js.map