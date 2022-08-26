//@ts-check
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

module.exports = { convertCredentialMapToString, getCredentialsConfigMap };
