'use strict';

var makeCSSBuilder = require('css-builder');

/**
 * Converts the given JSON to valid CSS
 *
 * @param {{}} cssJSON
 * @return {string}
 */
function compileStylesToCSS(cssJSON) {
  var classNames = Object.keys(cssJSON);
  var css = makeCSSBuilder();

  for (var i = 0, l = classNames.length; i < l; i++) {
    var className = classNames[i];
    var pseudo = cssJSON[className].pseudo;
    if (cssJSON[className].classBody) {
      css.rule(
          '.' + className + (pseudo ? (':' + pseudo) : ''),
          cssJSON[className].classBody
      );
    }
  }

  return css.toString();
}

module.exports = compileStylesToCSS;