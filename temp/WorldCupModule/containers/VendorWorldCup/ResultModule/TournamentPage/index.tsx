import React, { useRef, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import Layout from '@sport/components/ResultModule/Layout'
import { useWorldCupLeagueContext } from '../store/league-context'
import { useTournamentMatchData } from '../store/hooks'
import Header  from './Header'
import ContentRow from './ContentRow'

import TopHeader from "../TopHeader"
import PlaceHolder  from '@sport/components/ResultModule/PlaceHolder'

import { RoundConf } from '@sport/components/WorldCupModule/constants'
import * as WorldCup from '@sport/components/WorldCupModule/components/WorldCup'

const TournamentPage: React.FC = () => {
  const TopHeaderRef = useRef<HTMLDivElement>(null)
  const { group } = useParams<{ group: string }>()
  const { loading } = useWorldCupLeagueContext()
  const data = useTournamentMatchData({ group })

  const title = useMemo(() => {
    return loading ? <PlaceHolder.Title /> : <WorldCup.RoundGroupName roundGroup={group as RoundConf} />
  }, [loading, group])

  return (
    <Layout
      isLoading={loading}
      isEmpty={data.length === 0}
      header={<TopHeader title={title} disableOption ref={TopHeaderRef} />}
      content={
        <>
          <Header title={title} TopHeaderRef={TopHeaderRef} />
          {useMemo(() => (data.map(m => {
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
