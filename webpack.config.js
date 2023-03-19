const createExpoWebpackConfigAsync = require('@expo/webpack-config')
const path = require('path')

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv)
  config.resolve.alias = {
    '~': path.join(__dirname, 'src')
  }
  // Customize the config before returning it.
  return config
}
