import { readFileSync } from 'fs';
import _ from 'lodash';

const genDiff = (data1, data2) => {
  const keys1 = _.keys(data1);
  const keys2 = _.keys(data2);
  const keys = _.union(keys1, keys2);

  const result = {};
  for (const key of keys) {
    if (!_.has(data1, key)) {
      result[`+ ${key}`] = data2[key];
    } else if (!_.has(data2, key)) {
      result[`- ${key}`] = data1[key];
    } else if (data1[key] !== data2[key]) {
      result[`- ${key}`] = data1[key];
      result[`+ ${key}`] = data2[key];
    } else if (data1[key] === data2[key]) {
      result[`  ${key}`] = data1[key];
    }
  }

  return JSON.stringify(result, null, 2);
};

export default (filePath1, filePath2) => {
  const fileData1 = readFileSync(filePath1, 'utf-8');
  const fileData2 = readFileSync(filePath2, 'utf-8');
  const fileDataObject1 = JSON.parse(fileData1);
  const fileDataObject2 = JSON.parse(fileData2);

  console.log(genDiff(fileDataObject1, fileDataObject2));
};
