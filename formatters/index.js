import stylish from "./stylish.js"
import plain from "./plain.js"

const choiseFormat = (strFormat) => {
    if (strFormat === "stylish"){
        return stylish
    } else if (strFormat === "plain"){
        return plain
    } return "Неверный формат. Выберите plain или stylish"
}

export default choiseFormat