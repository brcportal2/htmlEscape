;(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.HtmlEscape = factory();
  }
}(this, function() {
(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var escapeHTMLChars = function escapeHTMLChars(_) {
    return _.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
};

var joinPatternsWithValues = function joinPatternsWithValues(patterns, values) {
    return patterns.slice(0, -1).map(function (_) {
        return _ + values.shift();
    }).join('').concat(patterns[patterns.length - 1]);
};

var HTML = exports.HTML = function HTML(patterns) {
    for (var _len = arguments.length, values = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        values[_key - 1] = arguments[_key];
    }

    return joinPatternsWithValues(patterns, values.map(String).map(escapeHTMLChars));
};

},{}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.URLProtocolFilter = URLProtocolFilter;
function URLProtocolFilter() {
	for (var _len = arguments.length, validProtocols = Array(_len), _key = 0; _key < _len; _key++) {
		validProtocols[_key] = arguments[_key];
	}

	function isValidURL(url) {
		try {
			var a = document.createElement('a');
			a.href = url;
			var href = a.href;
			return validProtocols.some(function (protocol) {
				return href.indexOf(protocol + ':') === 0;
			});
		} catch (error) {
			return false;
		}
	}

	return function filter(url, defaultValue) {
		if (isValidURL(url)) return url;else return defaultValue || "";
	};
};

},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var escape = exports.escape = JSON.stringify;

},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _URLProtocolFilter = require('./URLProtocolFilter.js');

Object.defineProperty(exports, 'URLProtocolFilter', {
  enumerable: true,
  get: function get() {
    return _URLProtocolFilter.URLProtocolFilter;
  }
});

var _escape = require('./escape.js');

Object.defineProperty(exports, 'escape', {
  enumerable: true,
  get: function get() {
    return _escape.escape;
  }
});

var _HTML = require('./HTML.js');

Object.defineProperty(exports, 'HTML', {
  enumerable: true,
  get: function get() {
    return _HTML.HTML;
  }
});

},{"./HTML.js":1,"./URLProtocolFilter.js":2,"./escape.js":3}]},{},[4]);

return HtmlEscape;
}));
