import _ from "lodash";

const objHelp = (valueItem) => {
  if (_.isPlainObject(valueItem)) {
    return `[complex value]`;
  } else if (_.isString(valueItem)) {
    return `'${valueItem}'`;
  }
  return valueItem;
};

const plain = (treeObj, path = []) => {
  const result = [];
  treeObj.forEach((item) => {
    switch (item.type) {
      case "added":
        result.push(
          `Property '${path.concat(item.key).join(".")}' was added with value: ${objHelp(item.value)}`,
        );
        break;
      case "removed":
        result.push(`Property '${path.concat(item.key).join(".")}' was removed`);

        break;
      case "changed":
        result.push(
          `Property '${path.concat(item.key).join(".")}' was updated. From ${objHelp(item.value[0])} to ${objHelp(item.value[1])}`,
        );

        break;
      case "unchanged":
        break;
      case "nested":
        result.push(plain(item.children, path.concat(item.key)));
        break;
      default:
        throw new Error(item.type);
    }
  });

  const plainResult = result.flat().join("\n");

  return plainResult;
};

export default plain;
