import genDiff from '../src/index.js';

let filePath1;
let filePath2;
const diff = genDiff();

test('test 1 gendiff', () => {
  filePath1 = '../fixtures/file1.json';
  filePath2 = '../fixtures/file2.json';
  expect(diff(filePath1, filePath2).toMatch(/- proxy: 123.234.53.22/));
});
