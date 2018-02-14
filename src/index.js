import lexer from './lexer'
import parser from './parser'
// import {format} from './format'
import {toHTML} from './stringify'
import {
  voidTags,
  closingTags,
  childlessTags,
  closingTagAncestorBreakers
} from './tags'

export const parseDefaults = {
  voidTags,
  closingTags,
  childlessTags,
  closingTagAncestorBreakers
}

export function parse (str, options = parseDefaults, elementCallback = null) {
  const tokens = lexer(str, options)
  return parser(tokens, options, elementCallback)
  // return format(nodes, options)
}

export function stringify (ast, options = parseDefaults, elementCallback = null) {
  return toHTML(ast, options, elementCallback)
}
