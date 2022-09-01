"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b, _c, _d, _e, _f;
Object.defineProperty(exports, "__esModule", { value: true });
//@ts-check
const dotenv_1 = __importDefault(require("dotenv"));
const get_aws_credentials_1 = __importDefault(require("./get-aws-credentials"));
const write_credentials_to_config_1 = __importDefault(require("./write-credentials-to-config"));
dotenv_1.default.config();
const accountNumber = (_a = process.env.ACCNUM) !== null && _a !== void 0 ? _a : 0;
const role = (_b = process.env.ROLE) !== null && _b !== void 0 ? _b : "";
const provider = (_c = process.env.PROVIDER) !== null && _c !== void 0 ? _c : "";
const fileName = (_d = process.env.FILE) !== null && _d !== void 0 ? _d : "samlresponse.log";
const configLocation = (_e = process.env.CONFIG_LOCATION) !== null && _e !== void 0 ? _e : ".aws/credentials";
const profile = (_f = process.env.PROFILE) !== null && _f !== void 0 ? _f : "new" + String(Date.now());
(0, get_aws_credentials_1.default)(accountNumber, role, provider, fileName)
    .then((credentials) => {
    (0, write_credentials_to_config_1.default)(credentials, configLocation, profile);
    console.log(`Updated profile ${profile}.`);
})
    .catch((error) => console.log(error));
//# sourceMappingURL=index.js.map