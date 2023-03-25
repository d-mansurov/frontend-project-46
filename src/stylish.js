// Function that stringifies the result:
const stringify = (node) => {
  const indent = ' ';
  const {
    name,
    status,
    value,
    newValue,
    oldValue,
  } = node;

  switch (status) {
    case 'nested': {
      const childString = value.map((child) => stringify(child)).join('\n');
      return `${indent}  ${name}: { ${childString}}`;
    }
    case 'unchanged': {
      return `${indent}  ${name}: ${value}`;
    }
    case 'changed': {
      return `${indent}- ${name}: ${oldValue}\n${indent}+ ${name}: ${newValue}`;
    }
    case 'removed': {
      return `${indent}- ${name}: ${value}`;
    }
    case 'added': {
      return `${indent}+ ${name}: ${value}`;
    }
    default: {
      throw new Error(`Invalid status: ${status}`);
    }
  }
};

// const stringify = (tree, replacer = ' ', spacesCount = 1) => {
//   const iter = (node, depth) => {
//     if (typeof node !== 'object' || node === null) {
//       return String(node);
//     }
//     const indentSize = depth * spacesCount;
//     const currentIndent = replacer.repeat(indentSize);
//     const bracketIndent = replacer.repeat(indentSize - spacesCount);

//     const nodeArray = Object.entries(node);
//     const lines = nodeArray.map(([key, value]) => {
//       const nestedIndent = replacer.repeat((depth + 1) * spacesCount);

//       return `${currentIndent}${nestedIndent}${key}: ${iter(value, depth + 1)}`;
//     });

//     const result = ['{', ...lines, `${bracketIndent}}`].join('\n');

//     return result;
//   };
//   return iter(tree, 1);
// };

export default stringify;
