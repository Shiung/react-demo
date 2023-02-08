import { useParams } from 'react-router-dom'
import { Sid ,PageType } from './constants'
import { useFetchResultLeagueData } from './store/hooks'
import type { BallType, MathType } from './types'
import LeaguePage from './LeaguePage'
import TournamentPage from './TournamentPage'
import DetailPage from './DetailPage'

// import { getDate } from '@/utils'
// import { dateTransformMethod } from '@utils/dateTransform'

const ResultModule = () => {
  // const timezone = useSelector((state: any) => state.common.timezone)
  const { ballType, match, date, tid, iid } = useParams<{ ballType: BallType, match: MathType, date: string, tid: string, iid: string }>()

  const currentPage = iid
    ? PageType.Detail
    : tid
      ? PageType.Tournament
      : PageType.League

  // const { YYYYMMDD } = dateTransformMethod(getDate(0, timezone)) as any
  
  // const datePareser = date === 'today' ? YYYYMMDD : date
  const datePareser = date
  useFetchResultLeagueData({ sid: Sid[ballType], date: datePareser })

  return (
    <>
      {currentPage === PageType.League && <ResultModule.League />}
      {currentPage === PageType.Tournament && <ResultModule.Tournament />}
      {currentPage === PageType.Detail && <ResultModule.Detail />}
    </>
  )
}

ResultModule.League = LeaguePage
ResultModule.Tournament = TournamentPage
ResultModule.Detail = DetailPage

export default ResultModule
