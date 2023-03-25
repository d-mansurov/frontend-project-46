import readFile from './parsers.js';
import stringify from './stylish.js';

// Function that compares the data of two files:
const genDiff = (obj1, obj2) => {
  const diff = {};

  Object.keys(obj1).forEach((key) => {
    if (Object.prototype.hasOwnProperty.call(obj2, key)) {
      // Key exists in both obj1 and obj2:
      if (typeof obj1[key] === 'object' && typeof obj2[key] === 'object') {
        diff[key] = {
          name: key,
          status: 'nested',
          value: genDiff(obj1[key], obj2[key]),
          newValue: 'none',
          oldValue: 'none',
        };
      } else if (JSON.stringify(obj1[key]) === JSON.stringify(obj2[key])) {
        diff[key] = {
          name: key,
          status: 'unchanged',
          value: obj1[key],
          newValue: 'none',
          oldValue: 'none',
        };
      } else {
        diff[key] = {
          name: key,
          status: 'changed',
          value: 'none',
          newValue: obj2[key],
          oldValue: obj1[key],
        };
      }
    } else {
      // Key exists in obj1 only:
      diff[key] = {
        name: key,
        status: 'removed',
        value: obj1[key],
        newValue: 'none',
        oldValue: 'none',
      };
    }
  });

  Object.keys(obj2).forEach((key) => {
    if (!Object.prototype.hasOwnProperty.call(obj1, key)) {
      // Key exists in obj2 only:
      diff[key] = {
        name: key,
        status: 'added',
        value: obj2[key],
        newValue: 'none',
        oldValue: 'none',
      };
    }
  });

  return stringify(diff);
};

// Function that collects and exports the result:
export default (filePath1, filePath2) => {
  const fileDataObject1 = readFile(filePath1);
  const fileDataObject2 = readFile(filePath2);

  console.log(genDiff(fileDataObject1, fileDataObject2));
  return genDiff(fileDataObject1, fileDataObject2);
};
