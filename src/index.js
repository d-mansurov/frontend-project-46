import { readFileSync } from 'fs';
import _ from 'lodash';
import path from 'path';

// Function that reads files with absolute and relative paths:
const readFile = (filePath) => {
  const fullPath = path.resolve(process.cwd(), filePath);
  const fileData = readFileSync(fullPath.toString());
  return fileData;
};

const genDiff = (data1, data2) => {
  const keys1 = _.keys(data1);
  const keys2 = _.keys(data2);
  const keys = _.sortBy(_.union(keys1, keys2));

  const result = keys.map((key) => {
    if (!_.has(data1, key)) {
      return [`+ ${key}: ${data2[key]}`];
    } else if (!_.has(data2, key)) {
      return [`- ${key}: ${data1[key]}`];
    } else if (data1[key] !== data2[key]) {
      return [`- ${key}: ${data1[key]}`, `+ ${key}: ${data2[key]}`];
    } else {
      return [`  ${key}: ${data1[key]}`];
    }
  });

  const flatResult = result.flat();
  const objectResult = Object.fromEntries(flatResult.map((entry) => entry.split(': ')));

  const diffString = JSON.stringify(objectResult, null, 2);
  return diffString.split('"').join('');
};

export default (filePath1, filePath2) => {
  const fileData1 = readFile(filePath1);
  const fileData2 = readFile(filePath2);

  const fileDataObject1 = JSON.parse(fileData1);
  const fileDataObject2 = JSON.parse(fileData2);

  console.log(genDiff(fileDataObject1, fileDataObject2));
};
