import React, { useRef, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import Layout from '../Layout'
import { useLeagueContext } from '../store/league-context'
import { useTournamentMatchData } from '../store/hooks'
import Header  from './Header'
import ContentRow from './ContentRow'

import TopHeader from "../TopHeader"
import PlaceHolder  from '../PlaceHolder'

const TournamentPage: React.FC = () => {
  const TopHeaderRef = useRef<HTMLDivElement>(null)
  const { tid } = useParams<{ tid: string }>()
  const { loading } = useLeagueContext()
  const data = useTournamentMatchData({ tid })

  const title = useMemo(() => {
    return loading ? <PlaceHolder.Title /> : data.tnName
  }, [loading, data])

  return (
    <Layout
      isLoading={loading}
      isEmpty={data.matches.length === 0}
      header={<TopHeader title={title} disableOption ref={TopHeaderRef} />}
      content={
        <>
          <Header title={data.tnName} TopHeaderRef={TopHeaderRef} />
          {useMemo(() => (data.matches.map(m => {
            return (
              <ContentRow
                key={`${m.iid}-${m.kickOff}`}
                homeName={m.homeName}
                awayName={m.awayName}
                kickOff={m.kickOff}
                iid={m.iid}
                scoresInfo={m.scoresInfo}
                cancelReason={m.cancelReason} />
            )
          })), [data])}
        </>
      }
    />
  )
}

export default TournamentPage
