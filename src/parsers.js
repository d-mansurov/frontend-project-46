import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

// Function that reads and parses the files with absolute and relative paths:
const readFile = (filePath) => {
  const fullPath = path.resolve(process.cwd(), filePath);
  const fileFormat = path.extname(fullPath);
  const fileData = fs.readFileSync(fullPath.toString());

  const parse = (data, format) => {
    let parser;
    if (format === '.json') {
      parser = JSON.parse;
    } else if (format === '.yml' || format === '.yaml') {
      parser = yaml.load;
    } else {
      throw new Error(`Unsupported file format: ${format}`);
    }

    return parser(data);
  };

  return parse(fileData, fileFormat);
};

export default readFile;
