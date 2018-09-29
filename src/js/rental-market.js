import { GTIME_DAY as DAY } from './util'

/**
 * Spaces the player can rent
 */
const rentalMarket = {
  flat: {
    title: 'small flat',
    duration: 1 * DAY, // until it can be used
    rentalPrice: 800, // monthly rent
    space: 10
  },
  office: {
    title: 'office',
    duration: 20 * DAY,
    rentalPrice: 5000,
    space: 50
  },
  datacenter: {
    title: 'datacenter',
    duration: 30 * DAY,
    rentalPrice: 20000,
    space: 300
  }
}

export default rentalMarket
