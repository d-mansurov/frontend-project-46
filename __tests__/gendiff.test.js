import { fileURLToPath } from 'url';
import path from 'path';
// import { readFileSync } from 'fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

// const fileName1 = 'file1.json';
// const fileName2 = 'file2.json';

const fileName1 = 'file3.yaml';
const fileName2 = 'file4.yaml';

// const expectedFileName = 'expected-file.json';

// const expectedFilePath = getFixturePath(expectedFileName);
// const expectedFile = fs.readFileSync(expectedFilePath, 'utf-8');

test('test 1 gendiff', () => {
  const filePath1 = getFixturePath(fileName1);
  const filePath2 = getFixturePath(fileName2);
  const diff = genDiff(filePath1, filePath2);
  expect(diff).toEqual('{\n  - follow: false,\n    host: hexlet.io,\n  - proxy: 123.234.53.22,\n  - timeout: 50,\n  + timeout: 20,\n  + verbose: true\n}');
});
