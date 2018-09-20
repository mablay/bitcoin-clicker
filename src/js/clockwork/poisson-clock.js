class PoissonClock {
  constructor (meanInterval, cb) {
    this._interval = meanInterval
    this.cb = cb
    this.handler = null
    this.curInterval = 0
    this.name = Date.now()
  }

  sample () {
    this.curInterval = -Math.log(Math.random()) * this._interval
    return this.curInterval
  }

  start () {
    if (this.handler) return
    console.log(`[poisson] START (${this._interval}ms)`)
    this.handler = setTimeout(() => this.iterate(), this.sample())
    return this
  }

  iterate () {
    this.cb(this.curInterval)
    this.handler = setTimeout(() => this.iterate(), this.sample())
  }

  stop () {
    if (this.handler) {
      console.log('[poisson] STOP')
      clearTimeout(this.handler)
      this.handler = null
    }
    return this
  }

  set interval (newInterval) {
    if (this.handler) {
      this.stop()
      this._interval = newInterval
      this.start()
    } else {
      this._interval = newInterval
    }
  }
}

function poissonClock (meanInterval, cb) {
  return new PoissonClock(meanInterval, cb)
}

export default poissonClock
