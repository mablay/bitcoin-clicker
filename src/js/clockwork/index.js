import linearClock from './linear-clock'
import poissonClock from './poisson-clock'
import Clockwork from './base-clock'

const clockwork = new Clockwork()

export {
  clockwork,
  linearClock,
  poissonClock
}
