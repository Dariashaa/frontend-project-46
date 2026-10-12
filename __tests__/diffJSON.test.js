// @ts-check
import { expect, test } from "vitest";
import diff from "../src/diff";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import stylish from "../src/stylish";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (/** @type {string} */ filename) =>
  path.join(__dirname, "..", "__fixtures__", filename);
const readFile = (/** @type {string} */ filename) => {
  const content = fs.readFileSync(getFixturePath(filename), "utf-8");
  return content.replace(/\r\n/g, "\n").replace(/\r/g, "\n").trim();
};

const formats = [
  ["file1long.json", "file2long.json", "expected_long.txt"],
  ["file1long.yaml", "file2long.yaml", "expected_long.txt"],
];

test.each(formats)("diffSON c форматами %s и %s", (ext1, ext2, expected) => {
  const file1 = getFixturePath(ext1);
  const file2 = getFixturePath(ext2);

  expect(diff(file1, file2)).toEqual(readFile(expected));
});

test("stylish throws on unknown node type", () => {
  const tree = [{ key: "foo", type: "unknown", value: "bar" }];

  expect(() => stylish(tree)).toThrow("unknown");
});
