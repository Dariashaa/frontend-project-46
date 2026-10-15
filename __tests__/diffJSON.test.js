// @ts-check
import { expect, test } from "vitest";
import diff from "../src/diff";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import stylish from "../formatters/stylish";
import choiseFormat from "../formatters";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (/** @type {string} */ filename) =>
  path.join(__dirname, "..", "__fixtures__", filename);
const readFile = (/** @type {string} */ filename) => {
  const content = fs.readFileSync(getFixturePath(filename), "utf-8");
  return content.replace(/\r\n/g, "\n").replace(/\r/g, "\n").trim();
};

const stylishTest = [
  ["file1.json", "file2.json", "expected_stylish.txt"],
  ["file1.yaml", "file2.yaml", "expected_stylish.txt"],
];

test.each(stylishTest)("diff c стилизацией stylish форматами %s и %s", (ext1, ext2, expected) => {
  const file1 = getFixturePath(ext1);
  const file2 = getFixturePath(ext2);

  expect(diff(file1, file2)).toEqual(readFile(expected));
});

const plainTest = [
  ["file1.json", "file2.json", "expected_plain.txt"],
  ["file1.yaml", "file2.yaml", "expected_plain.txt"],
];

test.each(plainTest)("diff c стилизацией plain форматами %s и %s", (ext1, ext2, expected) => {
  const file1 = getFixturePath(ext1);
  const file2 = getFixturePath(ext2);

  expect(diff(file1, file2, "plain")).toEqual(readFile(expected));
});

const jsonTest = [
  ["file1.json", "file2.json", "expected_json.txt"],
  ["file1.yaml", "file2.yaml", "expected_json.txt"],
];

test.each(jsonTest)("diff c стилизацией json форматами %s и %s", (ext1, ext2, expected) => {
  const file1 = getFixturePath(ext1);
  const file2 = getFixturePath(ext2);

  expect(JSON.parse(diff(file1, file2, "json"))).toEqual(JSON.parse(readFile(expected)));
});

test("stylish throws on unknown node type", () => {
  const tree = [{ key: "foo", type: "unknown", value: "bar" }];

  expect(() => stylish(tree)).toThrow("unknown");
});

test("index formatters unknown format ", () => {
  expect(choiseFormat("sytlish")).toEqual("Неверный формат. Выберите plain или stylish");
});
