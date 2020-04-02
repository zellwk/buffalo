const path = require('path')
const gulp = require('gulp')
const rev = require('gulp-rev')
const through = require('through2')
const rename = require('gulp-rename')
const toCamelCase = require('to-camel-case')
const { inputDir, outputDir } = require('./_config')

const initialRev = (cb) => {
  return gulp.src([outputDir + '/**/*.{css,js,mjs}'])
    .pipe(rev())
    .pipe(gulp.dest(outputDir))
    .pipe(rev.manifest())
    .pipe(rename('rev.json'))
    .pipe(gulp.dest(outputDir))
}

const modifyRevPaths = () => {
  return through.obj(function (file, enc, cb) {
    const manifest = JSON.parse(file.contents.toString())

    const r = Object.keys(manifest).reduce((acc, curr) => {
      const extname = path.extname(curr)
      const filename = path.basename(curr, extname)
      const formatted = toCamelCase(filename)
      acc[formatted] = manifest[curr]
      return acc
    }, {})

    file.contents = Buffer.from((JSON.stringify(r, null, 2)))

    this.push(file)
    cb()
  })
}

const modifyRev = (cb) => {
  return gulp.src(outputDir + '/rev.json')
    .pipe(modifyRevPaths())
    .pipe(gulp.dest(inputDir + '/_data/'))
}

module.exports = gulp.series(initialRev, modifyRev)
