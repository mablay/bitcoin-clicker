module.exports = {
  baseUrl: process.env.NODE_ENV === 'production'
    ? '/bitcoin-clicker/'
    : '/',
  pwa: {
    name: 'btc-clicker',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'translucent',
    themeColor: '#FF9900'
  }
}
