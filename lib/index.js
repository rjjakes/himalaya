'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseDefaults = undefined;
exports.parse = parse;
exports.stringify = stringify;

var _lexer = require('./lexer');

var _lexer2 = _interopRequireDefault(_lexer);

var _parser = require('./parser');

var _parser2 = _interopRequireDefault(_parser);

var _stringify = require('./stringify');

var _tags = require('./tags');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import {format} from './format'
var parseDefaults = exports.parseDefaults = {
  voidTags: _tags.voidTags,
  closingTags: _tags.closingTags,
  childlessTags: _tags.childlessTags,
  closingTagAncestorBreakers: _tags.closingTagAncestorBreakers
};

function parse(str) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : parseDefaults;
  var elementCallback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

  var tokens = (0, _lexer2.default)(str, options);
  return (0, _parser2.default)(tokens, options, elementCallback);
  // return format(nodes, options)
}

function stringify(ast) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : parseDefaults;
  var elementCallback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

  return (0, _stringify.toHTML)(ast, options, elementCallback);
}
//# sourceMappingURL=index.js.map
