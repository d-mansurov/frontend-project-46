// const readFile = (filePath) => {
//   const fullPath = path.resolve(process.cwd(), filePath);
//   const format = path.extname(fullPath);
//   const fileData = fs.readFileSync(fullPath.toString());

//   let parse;
//   if (format === '.json') {
//     parse = JSON.parse;
//   } else if (format === '.yml') {
//     parse = yaml.safeLoad;
//   }

//   return parse(fileData);
// };
