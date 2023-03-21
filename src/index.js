import _ from 'lodash';
import readFile from './parsers.js';
import stringify from './stylish.js';

// Function that compares the data of two files:
const genDiff = (obj1, obj2) => {
  const diff = {};

  Object.keys(obj1).forEach((key) => {
    if (obj2.hasOwnProperty(key)) {
      // key exists in both obj1 and obj2:
      if (typeof obj1[key] === 'object' && typeof obj2[key] === 'object') {
        diff[key] = { status: 'nested', value: genDiff(obj1[key], obj2[key])};
      } else {
        if (JSON.stringify(obj1[key]) === JSON.stringify(obj2[key])) {
          diff[key] = { status: 'unchanged', value: obj1[key] };
        } else {
          diff[key] = { status: 'changed', oldValue: obj1[key], newValue: obj2[key] };
        }
      }
    } else {
      // key exists in obj1 only:
      diff[key] = { status: 'removed', value: obj1[key] };
    }
  });

  Object.keys(obj2).forEach((key) => {
    if (!obj1.hasOwnProperty(key)) {
      // key exists in obj2 only:
      diff[key] = { status: 'added', value: obj2[key] };
    }
  });

  return stringify(diff, ' ', 2);
};

// Function that collects and exports the result:
export default (filePath1, filePath2) => {
  const fileDataObject1 = readFile(filePath1);
  const fileDataObject2 = readFile(filePath2);
  console.log(genDiff(fileDataObject1, fileDataObject2));
  return genDiff(fileDataObject1, fileDataObject2);
};
