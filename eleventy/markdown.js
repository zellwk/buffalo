const markdownIt = require('markdown-it')
const containerPlugin = require('markdown-it-container')
const anchorPlugin = require('markdown-it-anchor')
const HtmlEntities = require('html-entities').AllHtmlEntities

const lib = markdownIt({
  html: true,
  typographer: true
})
  .use(anchorPlugin)
  .use(containerPlugin, 'note', {
    render: function (tokens, idx) {
      const tag = tokens[idx]

      // Opening tag
      if (tag.info) return '<div class="note">'

      // Closing tag
      return '</div>'
    }
  })

/**
 * Renders Markdown within Shortcode pair.
 * Trims each line so markdown pair can be used with any indentation.
 * Note:
 */
function pairedMarkdown (content) {
  const formatted = content.split(/\n/)
    .map(c => c.trim())
    .join('\n')
  return lib.render(formatted)
}

/**
 * Renders markdown file within shortcode pairs
 * Doesn't trim content. Must reset indentation manuall.
 * Easy way: include a markdown file inside this pair
 */
function markdownNoTrim (content) {
  const array = content.split(/\n/)

  // Trims the first line
  // (so users don't have to manually trim the first line
  array[1] = array[1].trim()

  const formatted = array.join('\n')
  return lib.render(formatted)
}

/**
 * Renders Markdown without `<p>` tag
 * Used as filter
 */
function inline (content) {
  return content ? lib.renderInline(content) : content
}

/**
 * Turns encoded HTML entities back into normal strings
 * Used for smart quotes
 * @param {String} content
 * @returns {String}
 */
function decode (content) {
  const entities = new HtmlEntities()
  return entities.decode(content)
}

module.exports = {
  lib,
  markdownNoTrim,
  pairedMarkdown,
  inline,
  decode
}
