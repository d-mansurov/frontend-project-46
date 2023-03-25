import { fileURLToPath } from 'url';
import path from 'path';
import { readFileSync } from 'fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const fileName1 = 'file1.json';
const fileName2 = 'file2.json';
// const fileName1 = 'file3.yaml';
// const fileName2 = 'file4.yaml';

const expectedFileName = 'expected-file.json';
const expectedFilePath = getFixturePath(expectedFileName);
const expectedFileData = readFileSync(expectedFilePath, 'utf-8');

test('test 1 - compare two different files and return the expected data', () => {
  const filePath1 = getFixturePath(fileName1);
  const filePath2 = getFixturePath(fileName2);
  const diff = genDiff(filePath1, filePath2);

  console.log(diff);
  console.log(expectedFileData);
  expect(diff).toBe(expectedFileData);
});

test('test 2 - compare two similar files and return an empty string', () => {
  const filePath1 = getFixturePath(fileName1);
  const filePath2 = getFixturePath(fileName1);
  const diff = genDiff(filePath1, filePath2);

  console.log(diff);
  console.log(expectedFileData);
  expect(diff).toBe('');
});
