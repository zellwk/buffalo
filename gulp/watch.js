const { inputDir } = require('./_config')
const { watch, series } = require('gulp')
const { reload } = require('./browser-sync')

const sass = require('./sass')
const images = require('./images')
const eleventy = require('./eleventy')

const watcher = cb => {
  watch(`${inputDir}/scss/**/*`, series(sass, reload), cb)
  watch(`${inputDir}/images/**/*`, series(images, reload), cb)

  // Eleventy files
  watch([
    '.eleventy.js',
    'eleventy/**/*',
    'src/**/*',
    '!src/scss/**/*',
    '!src/js/**/*'
  ], series(eleventy, reload), cb)
}

module.exports = watcher
