import _ from "lodash";

const objHelp = (valueItem, height) => {
  if (!_.isPlainObject(valueItem)) {
    return valueItem;
  }
  const objStyle = Object.entries(valueItem).map(([key, value]) => {
    return { key, type: "unchanged", value };
  });
  return stylish(objStyle, height);
};

const stylish = (treeObj, height = 1) => {
  const result = [];
  const beforeOperand = " ".repeat(height * 4 - 2);
  const beforeBrace = " ".repeat((height - 1) * 4);
  treeObj.forEach((item) => {
    switch (item.type) {
      case "added":
        result.push(`${beforeOperand}+ ${item.key}: ${objHelp(item.value, height + 1)}`);
        break;
      case "removed":
        result.push(`${beforeOperand}- ${item.key}: ${objHelp(item.value, height + 1)}`);

        break;
      case "changed":
        result.push(`${beforeOperand}- ${item.key}: ${objHelp(item.value[0], height + 1)}`);
        result.push(`${beforeOperand}+ ${item.key}: ${objHelp(item.value[1], height + 1)}`);

        break;
      case "unchanged":
        result.push(`${beforeOperand}  ${item.key}: ${objHelp(item.value, height + 1)}`);

        break;
      case "nested":
        result.push(`${beforeOperand}  ${item.key}: ${stylish(item.children, height + 1)}`);

        break;
      default:
        throw new Error(item.type);
    }
  });

  const indentedLines = result.join("\n");
  return `{\n${indentedLines}\n${beforeBrace}}`;
};

export default stylish;
