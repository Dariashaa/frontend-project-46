import fs from "node:fs";
import { cwd } from "node:process";
import path from "node:path";
import { load } from "js-yaml";

const parser = (filepath) => {
  const absolutePath = path.resolve(cwd(), filepath);
  const fileContent = fs.readFileSync(absolutePath, "utf-8");

  if (path.extname(path.basename(filepath)) === ".json") return JSON.parse(fileContent);
  else if (
    path.extname(path.basename(filepath)) === ".yaml" ||
    path.extname(path.basename(filepath)) === ".yml"
  )
    return load(fileContent);
};

export default parser;
