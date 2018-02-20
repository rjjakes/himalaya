'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.splitHead = splitHead;
exports.unquote = unquote;
exports.format = format;
function splitHead(str, sep) {
  var idx = str.indexOf(sep);
  if (idx === -1) return [str];
  return [str.slice(0, idx), str.slice(idx + sep.length)];
}

function unquote(str) {
  var car = str.charAt(0);
  var end = str.length - 1;
  var isQuoteStart = car === '"' || car === "'";
  if (isQuoteStart && car === str.charAt(end)) {
    return str.slice(1, end);
  }
  return str;
}

function format(nodes) {
  return nodes.map(function (node) {
    var type = node.type;
    if (type === 'element') {
      var tagName = node.tagName; // .toLowerCase()
      var attributes = node.attributes;
      var children = format(node.children);
      return { type: type, tagName: tagName, attributes: attributes, children: children };
    }

    return { type: type, content: node.content };
  });
}
//# sourceMappingURL=format.js.map
