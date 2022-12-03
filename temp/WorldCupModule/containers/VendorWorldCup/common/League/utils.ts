import { CATEGORIES } from '@sport/constants/common'
import { worldCupBallName } from '@sport/components/WorldCupModule/constants'

export const parsePath = ({ category, interval }: { category: string; interval?: string }) => {
  switch (category) {
    case CATEGORIES.TODAY:
      return `/${category}/${worldCupBallName}`
    case CATEGORIES.EARLY:
      return `/${category}/${worldCupBallName}/interval/${interval}`
    case CATEGORIES.PARLAY:
      return `/${category}/${worldCupBallName}/interval/${interval}`
    default:
      return null
  }
}
