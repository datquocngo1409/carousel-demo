module.exports = {
  async rewrites() {
    return [
      {
        source: '/lfr3/eg-services/:path*',
        destination: 'https://int.logifleet360.ch/lfr3/eg-services/:path*' // Proxy to Backend
      }
    ]
  }
}
