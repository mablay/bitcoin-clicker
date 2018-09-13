class Poisson {
  constructor (meanInterval, cb) {
    this._interval = meanInterval
    this.cb = cb
    window.handler = null
    this.curInterval = 0
    this.name = Date.now()
  }

  sample () {
    this.curInterval = -Math.log(Math.random()) * this._interval
    return this.curInterval
  }

  start () {
    // andt
    if (window.handler) return
    window.handler = setTimeout(() => this.iterate(), this.sample())
    return this
  }

  iterate () {
    console.log('[poisson]', this.name)
    this.cb(this.curInterval)
    window.handler = setTimeout(() => this.iterate(), this.sample())
  }

  stop () {
    if (window.handler) {
      clearTimeout(window.handler)
      window.handler = null
    }
    return this
  }

  set interval (newInterval) {
    if (window.handler) {
      this.stop()
      this._interval = newInterval
      this.start()
    } else {
      this._interval = newInterval
    }
  }
}

function poisson (meanInterval, cb) {
  return new Poisson(meanInterval, cb)
}

export default poisson
