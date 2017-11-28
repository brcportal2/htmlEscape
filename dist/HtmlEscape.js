;(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.HtmlEscape = factory();
  }
}(this, function() {
function escapeHTMLChars(text) {
    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;")
    ;
}

function joinPatternsWithValues(patterns, values){
    return patterns
        .slice(0,-1)
        .map(function(p){return p + values.shift()})
        .join('')
        .concat(patterns[patterns.length-1])
    ;
}

function URLProtocolFilter() {

    var validProtocols = Array.prototype.slice.call(arguments);

    function isValidURL(url){
        try {
            var a = document.createElement('a');
            a.href = url;
            var href = a.href;
            return validProtocols.some(function(protocol) {
                return href.indexOf(protocol + ':') === 0
            });
        } catch (error) {
            return false;
        }
    }

    return function filter(url, defaultValue){
        if (isValidURL(url)) return url;
        else return defaultValue || "";
    }
}

function HtmlEscape(){
    var values = Array.prototype.slice.call(arguments);
    var patterns = values.shift();
    return joinPatternsWithValues(
        patterns,
        values.map(String).map(escapeHTMLChars)
    );
}

HtmlEscape.escapeHTML = escapeHTMLChars;
HtmlEscape.escapeValue = JSON.stringify;
HtmlEscape.URLProtocolFilter = URLProtocolFilter;
return HtmlEscape;
}));
