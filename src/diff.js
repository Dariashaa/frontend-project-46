import _ from "lodash";
import parser from "./parsers.js";
import choiseFormat from "../formatters/index.js";

const logicDiff = (obj1, obj2) => {
  let result = [];
  const keys = _.union(Object.keys(obj1), Object.keys(obj2));
  const sortedKeys = _.sortBy(keys);

  for (const key of sortedKeys) {
    if (!Object.hasOwn(obj1, key)) {
      result.push({ key, type: "added", value: obj2[key] });
    } else if (!Object.hasOwn(obj2, key)) {
      result.push({ key, type: "removed", value: obj1[key] });
    } else if (_.isPlainObject(obj1[key]) && _.isPlainObject(obj2[key])) {
      result.push({ key, type: "nested", children: logicDiff(obj1[key], obj2[key]) });
    } else if (obj2[key] !== obj1[key]) {
      result.push({ key, type: "changed", value: [obj1[key], obj2[key]] });
    } else {
      result.push({ key, type: "unchanged", value: obj1[key] });
    }
  }

  return result;
};

const diff = (filepath1, filepath2, format = "stylish") => {
  const obj1 = parser(filepath1);
  const obj2 = parser(filepath2);
  const result = logicDiff(obj1, obj2);
  const style = choiseFormat(format);

  if (_.isString(style)) {
    return style;
  }
  return style(result);
};

export default diff;
