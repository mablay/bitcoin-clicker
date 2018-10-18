import linearClock from './linear-clock'

export default class Clockwork {
  constructor () {
    this.clocks = {}
    this.started = true
  }

  start () {
    this.started = true
    for (const clock in this.clocks) {
      this.clocks[clock].start()
    }
  }
  stop () {
    this.started = false
    for (const clock in this.clocks) {
      this.clocks[clock].stop()
    }
  }

  create (interval, handler) {
    const key = 'LC-'.concat(Date.now())
    const clock = linearClock(interval, handler)
    if (this.started) clock.start()
    this.clocks[key] = clock
    return key
  }
  destroy (key) {
    // console.log('[clockwork] destroy', key, Object.keys(this.clocks))
    if (key && key in this.clocks) {
      this.clocks[key].stop()
      delete this.clocks[key]
      return
    }
    for (const clock in this.clocks) {
      this.clocks[clock].stop()
      delete this.clocks[clock]
    }
  }
}
