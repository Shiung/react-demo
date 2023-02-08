import React, { useMemo, useRef } from 'react'
import { useParams } from 'react-router-dom'
import Layout from '../Layout'
import { BallType } from '../types'
import { Sid } from '../constants'
import { parseTotalScore } from '../utils'
import { useLeagueContext } from '../store/league-context'
import { useDetailMatchData, useDetailMarketsList } from '../store/hooks'
import TopHeader from "../TopHeader"
import Header from './Header'
import UnitMarket from './UnitMarket'
import * as ScoreBoard from './ScoreBoard'

// import { dateTransformMethod } from '@utils/dateTransform'
// import FormatMessage from '@/components/FormatMessage'


const DetailPage: React.FC = () => {
  const { ballType, tid, iid } = useParams<{ ballType: BallType, tid: string, iid: string }>()
  const { loading } = useLeagueContext()
  const { data, leagueName } = useDetailMatchData({ tid, iid })
  const { marketsFilter, marketCat, activeCat, handleMarketCatActive, loading: fetchLoading } = useDetailMarketsList({ ballType, iid })
  // const { YYYYMMDDHHmm } = dateTransformMethod(data.kickOff) as any
  const isReverseHomeAway = Sid[ballType] === Sid.baseball
  const TopHeaderRef = useRef<HTMLDivElement>(null)

  const totalScore = useMemo(() => {
    if (Sid[ballType] === Sid.tennis) return data?.scoresInfo?.score?.['fts-set']
    if (Sid[ballType] === Sid.football) {
      const ftScore = (data?.scoresInfo?.score?.ft?? '').split('-')
      const otScore = (data?.scoresInfo?.score?.ot?? '').split('-')
      return parseTotalScore(ftScore, otScore)
    }
    return data?.scoresInfo?.score?.ft
  }, [ballType, data])

  const isLoading = loading || fetchLoading

  return (
    <Layout
      isLoading={isLoading}
      isEmpty={isNaN(data.iid) || marketsFilter.length === 0}
      noBackground
      header={
        <TopHeader title='赛果详情' disableOption ref={TopHeaderRef} >
            {!isLoading && (
              <Header
                homeName={data.homeName}
                awayName={data.awayName}
                score={totalScore}
                date={'this is date'}
                isReverse={isReverseHomeAway}>
                <React.Fragment>
                  {Sid[ballType] === Sid.football &&
                    <ScoreBoard.Football
                      homeId={data.homeId} awayId={data.awayId} leagueName={leagueName} scoresInfo={data.scoresInfo} />}
                  {Sid[ballType] === Sid.basketball &&
                    <ScoreBoard.Basketball
                      homeName={data.homeName} awayName={data.awayName} leagueName={leagueName} scoresInfo={data.scoresInfo} />}
                  {Sid[ballType] === Sid.tennis &&
                    <ScoreBoard.Tennis
                      homeName={data.homeName} awayName={data.awayName} leagueName={leagueName} scoresInfo={data.scoresInfo} />}
                  {Sid[ballType] === Sid.baseball &&
                    <ScoreBoard.Baseball
                      homeName={data.homeName} awayName={data.awayName} leagueName={leagueName} scoresInfo={data.scoresInfo} />}
                </React.Fragment>
              </Header>
            )}
        </TopHeader>
      }
      subHeader={!isLoading && (
        <Header.SubHeader TopHeaderRef={TopHeaderRef}>
          <React.Fragment>
            {marketCat.map(({ id, i18n }) =>
              <Header.NavTab
                key={id}
                isActive={id === activeCat}
                action={handleMarketCatActive.bind(null, id)}>
                  {/* <FormatMessage msgCode={i18n}/> */}
                  {i18n}
              </Header.NavTab>)}
          </React.Fragment>
        </Header.SubHeader>
      )}
      content={<>
        {marketsFilter.map(key => {
          return (
            <UnitMarket
              key={key}
              iid={iid}
              market={key}
              ballType={ballType}
              homeName={data.homeName}
              awayName={data.awayName} />
          )
        })}
      </>}
    />
  )
}

export default DetailPage
