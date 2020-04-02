const path = require('path')
const datefns = require('date-fns')
const pluginRss = require('@11ty/eleventy-plugin-rss')
const markdown = require('./eleventy/markdown')
const pagination = require('./eleventy/pagination')
const { inputDir, outputDir } = require('./gulp/_config')

module.exports = eleventyConfig => {
  eleventyConfig.addPlugin(pluginRss)
  eleventyConfig.addLayoutAlias('post', '_layout/post')

  // Markdown
  eleventyConfig.setLibrary('md', markdown.lib)
  eleventyConfig.addFilter('markdown', markdown.inline)
  eleventyConfig.addPairedShortcode('markdown', markdown.pairedMarkdown)
  eleventyConfig.addPairedShortcode('markdownNoTrim', markdown.markdownNoTrim)
  eleventyConfig.addFilter('decode', markdown.decode)

  // Pages
  // Override permalink to remove /page prefix
  eleventyConfig.addFilter('pagePathOverride', content => {
    const regex = /page\/(.*).njk/
    const match = content.match(regex)
    return match[1]
  })

  // Posts
  // Create a post collection for all articles inside `/post` folder
  eleventyConfig.addCollection('posts', collection => {
    return collection.getFilteredByGlob('./src/posts/*.md')
  })

  // Excerpts
  eleventyConfig.setFrontMatterParsingOptions({
    excerpt: true,
    excerpt_separator: "<!-- more -->"
  });

  // Blog pagination
  eleventyConfig.addShortcode('createPagination', pagination)

  // Tags
  eleventyConfig.addCollection('tagslist', collection => {
    const col = collection.getFilteredByGlob('./src/posts/*.md')
      .reduce((collated, item) => {
        let tags = item.data.tags
        if (typeof tags === 'string') tags = [tags]

        for (const tag of tags) {
          const tagIndex = collated.findIndex(ctag => ctag.name === tag)
          if (tagIndex === -1) {
            collated.push({
              name: tag,
              items: [item.data.title]
            })
          } else {
            collated[tagIndex].items.push(item.data.title)
          }
        }

        return collated
      }, [])
      .filter(tag => tag.name !== 'best')
      .sort((a, b) => {
        const nameA = a.name.toUpperCase() // ignore upper and lowercase
        const nameB = b.name.toUpperCase() // ignore upper and lowercase
        if (nameA < nameB) return -1
        if (nameA > nameB) return 1
        return 0
      })

    return col
  })

  // Dates
  eleventyConfig.addFilter('readableDate', value => {
    return datefns.format(value, 'do MMM yyyy')
  })

  eleventyConfig.addFilter('htmlDateString', value => {
    return datefns.format(value, 'yyyy-MM-dd')
  })

  return {
    dir: {
      input: inputDir,
      output: outputDir,
      includes: '_includes'
    },
    templateFormats: ['njk', 'md'],
    passthroughFileCopy: true
  }
}
