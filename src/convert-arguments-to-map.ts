const convertArgumentsToMap = (providedArguments: string[]) => {
  const argumentsMap = new Map<string, string>();
  const keyRegex = /--[a-z]{1,}-?[a-z]{1,}/;
  for (let index = 0; index < providedArguments.length; index += 2) {
    const key = providedArguments[index];
    if (!key) break;
    if (!keyRegex.test(key)) throw Error(`Invalid key provided: "${key}". Keys must be provided with two hyphens.`);
    const value = providedArguments[index + 1];
    if (!value) throw Error(`Value not provided for flag ${key}`);
    argumentsMap.set(key, value);
  }

  return argumentsMap;
};

export default convertArgumentsToMap;
