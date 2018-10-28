class LinearClock {
  constructor (interval, cb, name) {
    this._interval = interval
    this.cb = cb
    this.handler = null
    this.name = 'linear-'.concat(Date.now())
  }

  start () {
    if (this.handler) return this
    // console.log(`[lclock] START ${this.name} (${this._interval}ms)`)
    this.handler = setInterval(() => this.cb(this._interval), this._interval)
    return this
  }

  stop () {
    if (this.handler) {
      // console.log(`[lclock] STOP ${this.name} (${this._interval}ms)`)
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

function linearClock (interval, cb, name) {
  return new LinearClock(interval, cb, name)
}

export default linearClock
