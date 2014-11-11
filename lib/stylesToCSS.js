'use strict';

var hyphenateStyleName = require('react/lib/hyphenateStyleName');

function buildRule(result, key, value) {
  if (typeof value.toCSS === 'function') {
    value = value.toCSS();
  }
  if (typeof value === 'number') {
    value = '' + value + 'px';
  }
  // TODO: escape value
  result.css += '  ' + hyphenateStyleName(key) + ': ' + value + ';\n';
}

function buildRules(result, rules, selector) {
  if (Object.keys(rules).length === 0) {
    return result;
  }

  result.css += selector + ' {\n';
  for (var styleKey in rules) {
    if (!rules.hasOwnProperty(styleKey)) {
      continue;
    }
    var value = rules[styleKey];

    if (Array.isArray(value)) {
      for (var i = 0, len = value.length; i < len; i++) {
        buildRule(result, styleKey, value[i]);
      }
    }
    else {
      buildRule(result, styleKey, value);
    }
  }
  result.css += '}\n';

  return result;
}

function replicateSelector(s) {
  return [
    s,
      s + (s + 1),
      s + (s + 1) + (s + 2),
      s + (s + 1) + (s + 2) + (s + 3),
      s + (s + 1) + (s + 2) + (s + 3) + (s + 4),
      s + (s + 1) + (s + 2) + (s + 3) + (s + 4) + (s + 5),
      s + (s + 1) + (s + 2) + (s + 3) + (s + 4) + (s + 5) + (s + 6),
      s + (s + 1) + (s + 2) + (s + 3) + (s + 4) + (s + 5) + (s + 6) + (s + 7),
      s + (s + 1) + (s + 2) + (s + 3) + (s + 4) + (s + 5) + (s + 6) + (s + 7) + (s + 8),
      s + (s + 1) + (s + 2) + (s + 3) + (s + 4) + (s + 5) + (s + 6) + (s + 7) + (s + 8) + (s + 9)
  ].join(',');
}

function buildStyle(result, style, selector) {
  if (!style.className) {
    return;
  }

  if (!selector && result.classNames[style.className]) {
    return;
  }

  if (!selector) {
    result.classNames[style.className] = true;
    selector = replicateSelector('.' + style.className);
  }

  buildRules(result, style.style, selector);

  if (style.children) {
    for (var childKey in style.children) {
      if (!style.children.hasOwnProperty(childKey)) {
        continue;
      }
      var child = style.children[childKey];
      if (childKey[0] === ':') {
        var childSelector = selector.split(',')
          .map(function(sel) {
            return sel + childKey;
          })
          .join(',');
        buildStyle(result, child, childSelector);
      } else if (childKey.indexOf('@media') === 0) {
        result.css += childKey + ' {\n';
        buildStyle(result, child, selector);
        result.css += '}\n';
      } else {
        buildStyle(result, child);
      }
    }
  }
}

function stylesToCSS(styles) {
  if (!Array.isArray(styles)) {
    styles = [styles];
  }

  var result = {css: '', classNames: {}};
  for (var i = 0, len = styles.length; i < len; i++) {
    buildStyle(result, styles[i]);
  }
  return result;
}

module.exports = stylesToCSS;
