module.exports = {
  baseUrl: process.env.NODE_ENV === 'production'
    ? '/bitcoin-clicker/'
    : '/',
  pwa: {
    name: 'bitcoin-clicker',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'translucent',
    themeColor: '#FF9900'
  }
}
