class LinearClock {
  constructor (interval, cb) {
    this._interval = interval
    this.cb = cb
    this.handler = null
    this.name = 'linear-'.concat(Date.now())
  }

  start () {
    if (this.handler) return this
    console.log(`[lclock] START (${this._interval}ms)`)
    this.handler = setInterval(() => this.cb(this._interval), this._interval)
    return this
  }

  stop () {
    if (this.handler) {
      console.log('[lclock] STOP')
      clearInterval(this.handler)
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

function linearClock (interval, cb) {
  return new LinearClock(interval, cb)
}

export default linearClock
