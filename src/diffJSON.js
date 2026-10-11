import _ from "lodash";
import fs from "node:fs";
import { cwd } from "node:process";
import path from "node:path";

const parser = (filepath) => {
  const absolutePath = path.resolve(cwd(), filepath);
  const fileContent = fs.readFileSync(absolutePath, "utf-8");
  return JSON.parse(fileContent);
};

const sortObj = (obj) => {
  const sortedKeys = _.sortBy(Object.keys(obj));
  const sortedObj = sortedKeys.reduce((acc, cur) => {
    acc[cur] = obj[cur];
    return acc;
  }, {});

  return sortedObj;
};

const diffJSON = (filepath1, filepath2) => {
  let result = [];
  const sortedObj1 = sortObj(parser(filepath1));
  const sortedObj2 = sortObj(parser(filepath2));
  const keys2Obj = Object.keys(sortedObj2);

  Object.entries(sortedObj1).forEach(([keyObj1, valueObj1]) => {
    // обработка случая когда ключ есть у обоих
    if (keys2Obj.includes(keyObj1) && valueObj1 === sortedObj2[keyObj1]) {
      result.push(`  ${keyObj1}: ${valueObj1}`);
      _.remove(keys2Obj, (n) => n === keyObj1);
    } else if (keys2Obj.includes(keyObj1) && valueObj1 !== sortedObj2[keyObj1]) {
      result.push(`- ${keyObj1}: ${valueObj1}`);
      result.push(`+ ${keyObj1}: ${sortedObj2[keyObj1]}`);
      _.remove(keys2Obj, (n) => n === keyObj1);

      // ключ есть только у первого
    } else {
      result.push(`- ${keyObj1}: ${valueObj1}`);
    }
  });

  // оставшиеся ключи у второго
  keys2Obj.forEach((key) => {
    result.push(`+ ${key}: ${sortedObj2[key]}`);
  });

  const indentedLines = result.map((line) => `  ${line}`).join("\n");
  return `{\n${indentedLines}\n}`;
};

export default diffJSON;
