const { outputDir } = require('./_config')
const browserSync = require('browser-sync')
const server = browserSync.create()

async function reload () {
  return server.reload()
}

const serve = done => {
  server.init({
    open: false,
    server: {
      baseDir: outputDir
    }
  })

  done()
}

exports.reload = reload
exports.browserSync = serve
