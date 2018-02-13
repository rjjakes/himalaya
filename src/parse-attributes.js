/**
 * This is a heavilt modified version of:
 * https://github.com/switer/attribute-parser
 *
 * @param str
 * @returns {Array}
 */
export default function (str) {
  let attParts = str.split(/\s+/)
  let attSpaces = str.match(/\s+/gm)
  let attrs = {}
  let openAttr

  attParts.forEach(function (item, index) {
    if (!item) return
    if (openAttr) {
      let space = attSpaces[index - 1]
      item = openAttr.open + space + item
      if (openAttr.close.test(item)) {
        openAttr = null
        let attMatches = item.match(/^([^\s=]*?)=['"]([\s\S]*?)['"]$/m)
        attrs[attMatches[1]] = attMatches[2]
        return attrs[attMatches[1]]
      } else {
        openAttr.open = item
        return openAttr.open
      }
    }

    let quotes = item.match(/^([^\s=]*?)=('|")([\s\S]*)$/m)
    if (quotes) {
      let reg
      switch (quotes[2]) {
        case '"':
          reg = /"$/
          break
        case '\'':
          reg = /'$/
          break
      }
      if (reg.test(item) && !/^[^\s=]*?=['"]$/m.test(item)) {
        attrs[quotes[1]] = quotes[3].replace(reg, '')
        return attrs[quotes[1]]
      } else {
        openAttr = {
          open: item,
          close: reg
        }
        return openAttr
      }
    }
    let withoutQuotes = item.match(/^([^\s=]*?)=([\s\S]*?)$/m)
    if (withoutQuotes) {
      attrs[withoutQuotes[1]] = withoutQuotes[2] || ''
      return attrs[withoutQuotes[1]]
    }
    // key only attribute
    let ret = attrs[item.split('=')[0]] = true
    return ret
  })
  if (openAttr) {
    // console.warn(`Unclosed attribute: ${openAttr.open}`)
  }

  // Now split into key/value pairs.
  let pairedAttributes = []

  for (const [key, value] of Object.entries(attrs)) {
    // Repeatdly overwrite the same object as we're only expecting one result.
    pairedAttributes = {
      key: key,
      value: value
    }
  }

  return pairedAttributes
}
