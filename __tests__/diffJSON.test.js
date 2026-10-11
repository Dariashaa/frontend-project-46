// @ts-check
import { expect, test } from "vitest";
import diff from "../src/diff";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (/** @type {string} */ filename) =>
  path.join(__dirname, "..", "__fixtures__", filename);
const readFile = (/** @type {string} */ filename) => {
  const content = fs.readFileSync(getFixturePath(filename), "utf-8");
  return content.replace(/\r\n/g, "\n").replace(/\r/g, "\n").trim();
};

const formats = [
  ["json", "json", "expected_flat.txt"],
  ["yaml", "yaml", "expected_flat.txt"],
];

const formatsEmpty = [["json", "file_empty.json", "expected_empty.txt"]];

test.each(formats)("diffSON c форматами .%s и .%s", (ext1, ext2, expected) => {
  const file1 = getFixturePath(`file1.${ext1}`);
  const file2 = getFixturePath(`file2.${ext2}`);

  expect(diff(file1, file2)).toEqual(readFile(expected));
});

test.each(formatsEmpty)("diffSON c пустыми вторыми файлами", (ext1, ext2, expected) => {
  const file1 = getFixturePath(`file1.${ext1}`);
  const file2 = getFixturePath(ext2);

  expect(diff(file1, file2)).toEqual(readFile(expected));
});
