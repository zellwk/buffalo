const env = process.env.NODE_ENV
const isDev = env === 'development'
const isProd = env === 'production'
const isTest = env === 'test'

module.exports = {
  env,
  isDev,
  isProd,
  isTest,
  inputDir: 'src',
  outputDir: 'dist'
}
