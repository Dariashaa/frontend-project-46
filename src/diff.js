import _ from "lodash";
import parser from "./parsers.js";

const diff = (filepath1, filepath2) => {
  let result = [];
  const obj1 = parser(filepath1);
  const obj2 = parser(filepath2);

  const keys = _.union(Object.keys(obj1), Object.keys(obj2));
  const sortedKeys = _.sortBy(keys);

  for (const key of sortedKeys) {
    if (!Object.hasOwn(obj1, key)) {
      result.push(`+ ${key}: ${obj2[key]}`);
    } else if (!Object.hasOwn(obj2, key)) {
      result.push(`- ${key}: ${obj1[key]}`);
    } else if (obj2[key] !== obj1[key]) {
      result.push(`- ${key}: ${obj1[key]}`);
      result.push(`+ ${key}: ${obj2[key]}`);
    } else {
      result.push(`  ${key}: ${obj1[key]}`);
    }
  }

  const indentedLines = result.map((line) => `  ${line}`).join("\n");
  return `{\n${indentedLines}\n}`;
};

export default diff;
