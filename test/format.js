import test from 'ava'
import {parse, parseDefaults} from '../'

/*
These tests ensure the parser and v1 formatting align.

These tests mainly serve as a gauntlet for generic use.
Do not add any more of these kinds of tests, instead
test the more granular bits.
*/

test('parse() should pass the Hello World case', t => {
  const html = '<html><h1>Hello, World</h1></html>'
  const data = [{
    type: 'element',
    tagName: 'html',
    attributes: [],
    children: [{
      type: 'element',
      tagName: 'h1',
      attributes: [],
      children: [{
        type: 'text',
        content: 'Hello, World'
      }]
    }]
  }]
  t.deepEqual(data, parse(html, parseDefaults))
})

test('parse() should work for mixed attributes', t => {
  const html = "<div class='section widget'><b disabled>Poop</b><p>Pee</p></div>"
  const data = [{
    type: 'element',
    tagName: 'div',
    attributes: [{
      key: 'class',
      value: 'section widget'
    }],
    children: [{
      type: 'element',
      tagName: 'b',
      attributes: [{
        key: 'disabled',
        value: null
      }],
      children: [{
        type: 'text',
        content: 'Poop'
      }]
    }, {
      type: 'element',
      tagName: 'p',
      attributes: [],
      children: [{
        type: 'text',
        content: 'Pee'
      }]
    }]
  }]
  t.deepEqual(data, parse(html, parseDefaults))
})

test('parse() should work for commented html', t => {
  const html = '<b><!--comment text-->words</b>'
  const data = [{
    type: 'element',
    tagName: 'b',
    attributes: [],
    children: [{
      type: 'comment',
      content: 'comment text'
    }, {
      type: 'text',
      content: 'words'
    }]
  }]
  t.deepEqual(data, parse(html, parseDefaults))
})

test('parse() should work for style properties', t => {
  const html = "<div style='width: 360px; height: 120px; background-color: #fff'></div>"
  const data = [{
    type: 'element',
    tagName: 'div',
    attributes: [{
      key: 'style',
      value: 'width: 360px; height: 120px; background-color: #fff'
    }],
    children: []
  }]
  t.deepEqual(data, parse(html, parseDefaults))
})

test('parse() should work on data-* attributes', t => {
  const html = "<div data-num=0 data-word='poop' data-cake='2'></div>"
  const data = [{
    type: 'element',
    tagName: 'div',
    attributes: [{
      key: 'data-num',
      value: '0'
    }, {
      key: 'data-word',
      value: 'poop'
    }, {
      key: 'data-cake',
      value: '2'
    }],
    children: []
  }]
  t.deepEqual(data, parse(html, parseDefaults))
})

test('should work on unclosed tags', t => {
  const html = '<p>One two<p>three four'
  const data = [{
    type: 'element',
    tagName: 'p',
    attributes: [],
    children: [{
      type: 'text',
      content: 'One two'
    }]
  }, {
    type: 'element',
    tagName: 'p',
    attributes: [],
    children: [{
      type: 'text',
      content: 'three four'
    }]
  }]
  t.deepEqual(data, parse(html, parseDefaults))
})

test('should not set custom attrs to zeroes', t => {
  const html = "<div custom-attr=''></div>"
  const data = [{
    type: 'element',
    tagName: 'div',
    attributes: [{
      key: 'custom-attr',
      value: ''
    }],
    children: []
  }]
  t.deepEqual(data, parse(html, parseDefaults))
})

test('custom tags should appear in the ast', t => {
  {
    const html = '<result>Hello</result>'
    const data = [{
      type: 'element',
      tagName: 'result',
      attributes: [],
      children: [{
        type: 'text',
        content: 'Hello'
      }]
    }]
    t.deepEqual(data, parse(html, parseDefaults))
  }

  {
    const html = `<div><h1>Hi there</h1><result></result></div>`
    const data = [{
      type: 'element',
      tagName: 'div',
      attributes: [],
      children: [{
        type: 'element',
        tagName: 'h1',
        attributes: [],
        children: [{
          type: 'text',
          content: 'Hi there'
        }]
      }, {
        type: 'element',
        tagName: 'result',
        attributes: [],
        children: []
      }]
    }]
    t.deepEqual(data, parse(html, parseDefaults))
  }
})
