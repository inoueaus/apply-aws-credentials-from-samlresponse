declare type ConfigMap = Map<string, Record<string, string>>;
/**
 * Converts credential config string into a Map for editing.
 *
 * @param {string} configString
 * @returns {ConfigMap}
 */
export declare const getCredentialsConfigMap: (configString: string) => ConfigMap;
/**
 * Converts a credential Config Map to a formatted string.
 *
 * @param {ConfigMap} configMap
 * @returns {string}
 */
export declare const convertCredentialMapToString: (configMap: ConfigMap) => string;
export {};
//# sourceMappingURL=config-map.d.ts.map