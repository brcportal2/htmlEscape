const escapeHTMLChars = _=>_
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
;

const joinPatternsWithValues = (patterns, values) => patterns
    .slice(0,-1)
    .map( _=>_ + values.shift())
    .join('')
    .concat(patterns[patterns.length-1])
;

export const HTML = (patterns, ...values) => joinPatternsWithValues(
    patterns,
    values.map(String).map(escapeHTMLChars)
);