'use strict';

jest.dontMock('../stylesToCSS');
jest.dontMock('react/lib/hyphenate');
jest.dontMock('react/lib/hyphenateStyleName');

describe('stylesToCSS', function() {

  it('compiles styles with pseudo classes', function() {
    var stylesToCSS = require('../stylesToCSS');
    var exampleStyle = {
      className: 'yolo',
      style: {
        display: 'block'
      },
      children: {
        ':active': {
          className: 'yolo:active',
          style: {
            backgroundColor: 'onActive'
          }
        },
        '::-moz-focus-inner': {
          className: 'yolo::-moz-focus-inner',
          style: {
            padding: 0
          }
        }
      }
    };
    var test = stylesToCSS([exampleStyle]);
    expect(test.css).toBe([
      [
      '.yolo',
      '.yolo.yolo1',
      '.yolo.yolo1.yolo2',
      '.yolo.yolo1.yolo2.yolo3',
      '.yolo.yolo1.yolo2.yolo3.yolo4',
      '.yolo.yolo1.yolo2.yolo3.yolo4.yolo5',
      '.yolo.yolo1.yolo2.yolo3.yolo4.yolo5.yolo6',
      '.yolo.yolo1.yolo2.yolo3.yolo4.yolo5.yolo6.yolo7',
      '.yolo.yolo1.yolo2.yolo3.yolo4.yolo5.yolo6.yolo7.yolo8',
      '.yolo.yolo1.yolo2.yolo3.yolo4.yolo5.yolo6.yolo7.yolo8.yolo9'
      ].join(',') + ' {',
      '  display: block;',
      '}',
      [
      '.yolo:active',
      '.yolo.yolo1:active',
      '.yolo.yolo1.yolo2:active',
      '.yolo.yolo1.yolo2.yolo3:active',
      '.yolo.yolo1.yolo2.yolo3.yolo4:active',
      '.yolo.yolo1.yolo2.yolo3.yolo4.yolo5:active',
      '.yolo.yolo1.yolo2.yolo3.yolo4.yolo5.yolo6:active',
      '.yolo.yolo1.yolo2.yolo3.yolo4.yolo5.yolo6.yolo7:active',
      '.yolo.yolo1.yolo2.yolo3.yolo4.yolo5.yolo6.yolo7.yolo8:active',
      '.yolo.yolo1.yolo2.yolo3.yolo4.yolo5.yolo6.yolo7.yolo8.yolo9:active'
      ].join(',') + ' {',
      '  background-color: onActive;',
      '}',
      [
      '.yolo::-moz-focus-inner',
      '.yolo.yolo1::-moz-focus-inner',
      '.yolo.yolo1.yolo2::-moz-focus-inner',
      '.yolo.yolo1.yolo2.yolo3::-moz-focus-inner',
      '.yolo.yolo1.yolo2.yolo3.yolo4::-moz-focus-inner',
      '.yolo.yolo1.yolo2.yolo3.yolo4.yolo5::-moz-focus-inner',
      '.yolo.yolo1.yolo2.yolo3.yolo4.yolo5.yolo6::-moz-focus-inner',
      '.yolo.yolo1.yolo2.yolo3.yolo4.yolo5.yolo6.yolo7::-moz-focus-inner',
      '.yolo.yolo1.yolo2.yolo3.yolo4.yolo5.yolo6.yolo7.yolo8::-moz-focus-inner',
      '.yolo.yolo1.yolo2.yolo3.yolo4.yolo5.yolo6.yolo7.yolo8.yolo9::-moz-focus-inner'
      ].join(',') + ' {',
      '  padding: 0px;',
      '}',
      ''
    ].join('\n'));
  });

  it('compiles styles with media queries', function() {
    var stylesToCSS = require('../stylesToCSS');
    var exampleStyle = {
      className: 'yolo',
      style: {
        display: 'block'
      },
      children: {
        '@media (max-width: 800px)': {
          className: '@media (max-width: 800px)',
          style: {
            display: 'none'
          }
        }
      }
    };
    var test = stylesToCSS([exampleStyle]);
    expect(test.css).toBe([
      [
      '.yolo',
      '.yolo.yolo1',
      '.yolo.yolo1.yolo2',
      '.yolo.yolo1.yolo2.yolo3',
      '.yolo.yolo1.yolo2.yolo3.yolo4',
      '.yolo.yolo1.yolo2.yolo3.yolo4.yolo5',
      '.yolo.yolo1.yolo2.yolo3.yolo4.yolo5.yolo6',
      '.yolo.yolo1.yolo2.yolo3.yolo4.yolo5.yolo6.yolo7',
      '.yolo.yolo1.yolo2.yolo3.yolo4.yolo5.yolo6.yolo7.yolo8',
      '.yolo.yolo1.yolo2.yolo3.yolo4.yolo5.yolo6.yolo7.yolo8.yolo9'
      ].join(',') + ' {',
      '  display: block;',
      '}',
      '@media (max-width: 800px) {',
      [
      '.yolo',
      '.yolo.yolo1',
      '.yolo.yolo1.yolo2',
      '.yolo.yolo1.yolo2.yolo3',
      '.yolo.yolo1.yolo2.yolo3.yolo4',
      '.yolo.yolo1.yolo2.yolo3.yolo4.yolo5',
      '.yolo.yolo1.yolo2.yolo3.yolo4.yolo5.yolo6',
      '.yolo.yolo1.yolo2.yolo3.yolo4.yolo5.yolo6.yolo7',
      '.yolo.yolo1.yolo2.yolo3.yolo4.yolo5.yolo6.yolo7.yolo8',
      '.yolo.yolo1.yolo2.yolo3.yolo4.yolo5.yolo6.yolo7.yolo8.yolo9'
      ].join(',') + ' {',
      '  display: none;',
      '}',
      '}',
      ''
    ].join('\n'));
  });

  it('should hyphenate CSS properties', function() {
    var stylesToCSS = require('../stylesToCSS');
    var fooStyle = {
      className: 'foo',
      style: {
        backgroundColor: 'green'
      }
    };
    var compiled = stylesToCSS(fooStyle);
    expect(compiled.css.indexOf('background-color: green')).toBeGreaterThan(0);
  });

  it('should not add style without a className', function() {
    var stylesToCSS = require('../stylesToCSS');
    var fooStyle = {

    };
    var compiled = stylesToCSS(fooStyle);
    expect(compiled.css).toEqual('');
  });

  it('should not add a style if it\'s already present', function() {
    var stylesToCSS = require('../stylesToCSS');
    var fooStyle = {
      className: 'yolo',
      style: {
        backgroundColor: 'orange'
      }
    };
    var fooStyle2 = {
      className: 'yolo',
      style: {
        backgroundColor: 'orange'
      }
    };

    var oneStyle = stylesToCSS(fooStyle);
    var doubleStyle = stylesToCSS([fooStyle, fooStyle2]);

    expect(oneStyle).toEqual(doubleStyle);
  });

  it('should replicate the selector', function() {
    var stylesToCSS = require('../stylesToCSS');
    var fooStyle = {
      className: 'yolo',
      style: {
        backgroundColor: 'purple'
      }
    };
    var compiled = stylesToCSS(fooStyle);
    var replicatedSelector = compiled.css.split(' {')[0].split(',');
    var selector = '.yolo';
    for (var i = 0, l = replicatedSelector.length; i < l; i++) {
      if(i > 0) {
        selector += '.yolo' + i;
      }
      expect(selector).toEqual(replicatedSelector[i]);
    }
  });

  it('compiles numbers into px literals', function() {
    var stylesToCSS = require('../stylesToCSS');
    var fooStyle = {
      className: 'yolo',
      style: {
        top: 0
      }
    };
    var compiled = stylesToCSS(fooStyle);
    expect(compiled.css).toBe([
    [
    '.yolo',
    '.yolo.yolo1',
    '.yolo.yolo1.yolo2',
    '.yolo.yolo1.yolo2.yolo3',
    '.yolo.yolo1.yolo2.yolo3.yolo4',
    '.yolo.yolo1.yolo2.yolo3.yolo4.yolo5',
    '.yolo.yolo1.yolo2.yolo3.yolo4.yolo5.yolo6',
    '.yolo.yolo1.yolo2.yolo3.yolo4.yolo5.yolo6.yolo7',
    '.yolo.yolo1.yolo2.yolo3.yolo4.yolo5.yolo6.yolo7.yolo8',
    '.yolo.yolo1.yolo2.yolo3.yolo4.yolo5.yolo6.yolo7.yolo8.yolo9'
    ].join(',') + ' {',
    '  top: 0px;',
    '}',
    ''
    ].join('\n'));
  });

  it('compiles styles', function() {
    var stylesToCSS = require('../stylesToCSS');
    var fooStyle = {
      className: 'yolo',
      style: {
        color: 'red'
      }
    };
    var compiled = stylesToCSS(fooStyle);
    expect(compiled.css).toBe([
    [
    '.yolo',
    '.yolo.yolo1',
    '.yolo.yolo1.yolo2',
    '.yolo.yolo1.yolo2.yolo3',
    '.yolo.yolo1.yolo2.yolo3.yolo4',
    '.yolo.yolo1.yolo2.yolo3.yolo4.yolo5',
    '.yolo.yolo1.yolo2.yolo3.yolo4.yolo5.yolo6',
    '.yolo.yolo1.yolo2.yolo3.yolo4.yolo5.yolo6.yolo7',
    '.yolo.yolo1.yolo2.yolo3.yolo4.yolo5.yolo6.yolo7.yolo8',
    '.yolo.yolo1.yolo2.yolo3.yolo4.yolo5.yolo6.yolo7.yolo8.yolo9'
    ].join(',') + ' {',
    '  color: red;',
    '}',
    ''
    ].join('\n'));
  });

  it('compiles styles along with their children', function() {
    var stylesToCSS = require('../stylesToCSS');
    var fooStyle = {
      className: 'yolo',
      style: {
        color: 'red'
      },
      children: {
        highlighted: {
          className: 'yolo_hl',
          style: {
            color: 'yellow'
          }
        }
      }
    };
    var compiled = stylesToCSS(fooStyle);
    expect(compiled.css).toBe([
    [
    '.yolo',
    '.yolo.yolo1',
    '.yolo.yolo1.yolo2',
    '.yolo.yolo1.yolo2.yolo3',
    '.yolo.yolo1.yolo2.yolo3.yolo4',
    '.yolo.yolo1.yolo2.yolo3.yolo4.yolo5',
    '.yolo.yolo1.yolo2.yolo3.yolo4.yolo5.yolo6',
    '.yolo.yolo1.yolo2.yolo3.yolo4.yolo5.yolo6.yolo7',
    '.yolo.yolo1.yolo2.yolo3.yolo4.yolo5.yolo6.yolo7.yolo8',
    '.yolo.yolo1.yolo2.yolo3.yolo4.yolo5.yolo6.yolo7.yolo8.yolo9'
    ].join(',') + ' {',
    '  color: red;',
    '}',
    [
    '.yolo_hl',
    '.yolo_hl.yolo_hl1',
    '.yolo_hl.yolo_hl1.yolo_hl2',
    '.yolo_hl.yolo_hl1.yolo_hl2.yolo_hl3',
    '.yolo_hl.yolo_hl1.yolo_hl2.yolo_hl3.yolo_hl4',
    '.yolo_hl.yolo_hl1.yolo_hl2.yolo_hl3.yolo_hl4.yolo_hl5',
    '.yolo_hl.yolo_hl1.yolo_hl2.yolo_hl3.yolo_hl4.yolo_hl5.yolo_hl6',
    '.yolo_hl.yolo_hl1.yolo_hl2.yolo_hl3.yolo_hl4.yolo_hl5.yolo_hl6.yolo_hl7',
    '.yolo_hl.yolo_hl1.yolo_hl2.yolo_hl3.yolo_hl4.yolo_hl5.yolo_hl6.yolo_hl7.yolo_hl8',
    '.yolo_hl.yolo_hl1.yolo_hl2.yolo_hl3.yolo_hl4.yolo_hl5.yolo_hl6.yolo_hl7.yolo_hl8.yolo_hl9'
    ].join(',') + ' {',
    '  color: yellow;',
    '}',
    ''
    ].join('\n'));
  });

  it('replicates with the duplicate style key', function() {
    var stylesToCSS = require('../stylesToCSS');
    var fooStyle = {
      className: 'yolo',
      style: {
        color: ['red', 'white']
      }
    };
    var compiled = stylesToCSS(fooStyle);
    expect(compiled.css).toBe([
    [
    '.yolo',
    '.yolo.yolo1',
    '.yolo.yolo1.yolo2',
    '.yolo.yolo1.yolo2.yolo3',
    '.yolo.yolo1.yolo2.yolo3.yolo4',
    '.yolo.yolo1.yolo2.yolo3.yolo4.yolo5',
    '.yolo.yolo1.yolo2.yolo3.yolo4.yolo5.yolo6',
    '.yolo.yolo1.yolo2.yolo3.yolo4.yolo5.yolo6.yolo7',
    '.yolo.yolo1.yolo2.yolo3.yolo4.yolo5.yolo6.yolo7.yolo8',
    '.yolo.yolo1.yolo2.yolo3.yolo4.yolo5.yolo6.yolo7.yolo8.yolo9'
    ].join(',') + ' {',
    '  color: red;',
    '  color: white;',
    '}',
    ''
    ].join('\n'));
  });
});
