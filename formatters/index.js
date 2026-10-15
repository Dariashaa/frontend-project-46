import stylish from "./stylish.js";
import plain from "./plain.js";
import jsonFormat from "./jsonFormat.js";

const choiseFormat = (strFormat) => {
  if (strFormat === "stylish") {
    return stylish;
  } else if (strFormat === "plain") {
    return plain;
  } else if (strFormat === "json") {
    return jsonFormat;
  }
  return "Неверный формат. Выберите plain или stylish";
};

export default choiseFormat;
