module.exports = {
  baseUrl: process.env.NODE_ENV === 'production'
    ? '/bitcoin-clicker/'
    : '/',
  pwa: {
    name: 'Bitcoin Clicker',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',
    themeColor: '#FF9900'
  }
}
