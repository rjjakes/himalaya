'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * This is a heavilt modified version of:
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * https://github.com/switer/attribute-parser
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * @param str
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * @returns {Array}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          */


exports.default = function (str) {
  var attParts = str.split(/\s+/);
  var attSpaces = str.match(/\s+/gm);
  var attrs = {};
  var openAttr = void 0;

  attParts.forEach(function (item, index) {
    if (!item) return;
    if (openAttr) {
      var space = attSpaces[index - 1];
      item = openAttr.open + space + item;
      if (openAttr.close.test(item)) {
        openAttr = null;
        var attMatches = item.match(/^([^\s=]*?)=['"]([\s\S]*?)['"]$/m);
        attrs[attMatches[1]] = attMatches[2];
        return attrs[attMatches[1]];
      } else {
        openAttr.open = item;
        return openAttr.open;
      }
    }

    var quotes = item.match(/^([^\s=]*?)=('|")([\s\S]*)$/m);
    if (quotes) {
      var reg = void 0;
      switch (quotes[2]) {
        case '"':
          reg = /"$/;
          break;
        case '\'':
          reg = /'$/;
          break;
      }
      if (reg.test(item) && !/^[^\s=]*?=['"]$/m.test(item)) {
        attrs[quotes[1]] = quotes[3].replace(reg, '');
        return attrs[quotes[1]];
      } else {
        openAttr = {
          open: item,
          close: reg
        };
        return openAttr;
      }
    }
    var withoutQuotes = item.match(/^([^\s=]*?)=([\s\S]*?)$/m);
    if (withoutQuotes) {
      attrs[withoutQuotes[1]] = withoutQuotes[2] || '';
      return attrs[withoutQuotes[1]];
    }
    // key only attribute
    var ret = attrs[item.split('=')[0]] = null;
    return ret;
  });
  if (openAttr) {}
  // console.warn(`Unclosed attribute: ${openAttr.open}`)


  // Now split into key/value pairs.
  var pairedAttributes = [];

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = Object.entries(attrs)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var _step$value = _slicedToArray(_step.value, 2),
          key = _step$value[0],
          value = _step$value[1];

      // Repeatdly overwrite the same object as we're only expecting one result.
      pairedAttributes = {
        key: key,
        value: value
      };
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return pairedAttributes;
};
//# sourceMappingURL=parse-attributes.js.map
