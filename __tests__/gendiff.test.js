import { fileURLToPath } from 'url';
import path from 'path';
// import { readFileSync } from 'fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const fileName1 = 'file1.json';
const fileName2 = 'file2.json';
// const expectedFileName = 'expected-file.json';

const filePath1 = getFixturePath(fileName1);
const filePath2 = getFixturePath(fileName2);

// const expectedFilePath = getFixturePath(expectedFileName);
// const expectedFile = fs.readFileSync(expectedFilePath, 'utf-8');

const diff = genDiff();

test('test 1 gendiff', () => {
  expect(diff(filePath1, filePath2).toMatch(/- proxy: 123.234.53.22/));
});
