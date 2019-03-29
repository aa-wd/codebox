module.exports = function (api) {
  const presets = [
    '@babel/preset-env',
    '@babel/preset-react',
    '@babel/preset-typescript',
  ];

  const plugins = []

  api.cache(true)

  return {
    presets,
    plugins
  }
}
