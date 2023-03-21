// Function that stringifies the result:
const stringify = (tree, replacer = ' ', spacesCount = 1) => {
  const iter = (node, depth) => {
    if (typeof node !== 'object' || node === null) {
      return String(node);
    }
    const indentSize = depth * spacesCount;
    const currentIndent = replacer.repeat(indentSize);
    const bracketIndent = replacer.repeat(indentSize - spacesCount);

    const nodeArray = Object.entries(node);
    const lines = nodeArray.map(([key, value]) => `${currentIndent}${key}: ${iter(value, depth + 1)}`);
    const result = ['{', ...lines, `${bracketIndent}}`].join('\n');

    return result;
  };
  return iter(tree, 1);
};

export default stringify;
