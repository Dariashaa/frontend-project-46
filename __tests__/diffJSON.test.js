// @ts-check
import { expect, test } from "vitest";
import diffJSON from "../src/diffJSON";
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (/** @type {string} */ filename) =>  path.join(__dirname, '..', '__fixtures__', filename)
const readFile = (/** @type {string} */ filename) => {
  const content = fs.readFileSync(getFixturePath(filename), 'utf-8');
  return content.replace(/\r\n/g, '\n').replace(/\r/g, '\n').trim();
};



test('diffJSON on file1 and file2', () => {
    expect(diffJSON(getFixturePath('file1.json'), getFixturePath('file2.json'))).toEqual(readFile("expected_flat.txt"))
})

test('diffJSON on file1 and empty file', () => {
    expect(diffJSON(getFixturePath('file1.json'), getFixturePath('file_empty.json'))).toEqual(readFile("expected_empty.txt"))
})

test('diffJSON on file1 and file2', () => {
    expect(diffJSON(getFixturePath('file_empty.json'), getFixturePath('file2.json'))).toEqual(readFile("expected_empty_file2.txt"))
})