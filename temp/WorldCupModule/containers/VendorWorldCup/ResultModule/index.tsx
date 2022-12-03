import { useParams } from 'react-router-dom'
import moment from 'moment'
import { dateTransformMethod } from '@sport/utils/dateTransform'
import { useFetchResultLeagueData } from './store/hooks'

import { PageType } from '@sport/components/ResultModule/constants'

import LeaguePage from './LeaguePage'
import TournamentPage from './TournamentPage'
import DetailPage from './DetailPage'

const WorldCupResult = () => {
  const {
    date,
    group,
    iid
  } = useParams<{ date: string, group: string, iid: string }>()

  const currentPage = iid
    ? PageType.Detail
    : group
      ? PageType.Tournament
      : PageType.League

  // 需要做使用者時區offset，故第二個參數帶true
  const { YYYYMMDD } = dateTransformMethod(moment(), true) as any
  const datePareser = date === 'today' ? YYYYMMDD : date
  useFetchResultLeagueData({ date: datePareser })

  return (
    <>
      {currentPage === PageType.League && <LeaguePage />}
      {currentPage === PageType.Tournament && <TournamentPage />}
      {currentPage === PageType.Detail && <DetailPage />}
    </>
  )
}

export default WorldCupResult
