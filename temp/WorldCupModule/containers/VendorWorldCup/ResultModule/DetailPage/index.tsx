import React, { useMemo, useRef } from 'react'
import { useParams } from 'react-router-dom'
import Layout from '@sport/components/ResultModule/Layout'
import { Sid } from '@sport/components/ResultModule/constants'
import { parseTotalScore } from '@sport/components/ResultModule/utils'
import { useWorldCupLeagueContext } from '../store/league-context'
import { useDetailMarketsList } from '@sport/components/ResultModule/store/hooks'
import { useDetailMatchData } from '../store/hooks'
import TopHeader from "../TopHeader"
import Header from '@sport/components/ResultModule/DetailPage/Header'
import UnitMarket from '@sport/components/ResultModule/DetailPage/UnitMarket'
import * as ScoreBoard from '@sport/components/ResultModule/DetailPage/ScoreBoard'

import { dateTransformMethod } from '@sport/utils/dateTransform'
import FormatMessage from '@sport/components/FormatMessage'

import * as WorldCup from '@sport/components/WorldCupModule/components/WorldCup'
import { RoundConf } from '@sport/components/WorldCupModule/constants'

const DetailPage: React.FC = () => {
  const ballType = 'football'
  const { group, iid } = useParams<{ group: string, iid: string }>()
  const { loading } = useWorldCupLeagueContext()
  const { data } = useDetailMatchData({ group, iid: Number(iid) })
  const { marketsFilter, marketCat, activeCat, handleMarketCatActive, loading: fetchLoading } = useDetailMarketsList({ ballType, iid })
  // 需要做使用者時區offset，故第二個參數帶true
  const { YYYYMMDDHHmm } = dateTransformMethod(data.kickOff, true) as any
  const isReverseHomeAway = false
  const TopHeaderRef = useRef<HTMLDivElement>(null)

  const totalScore = useMemo(() => {
    if (Sid[ballType] === Sid.football) {
      const ftScore = (data?.scoresInfo?.score?.ft?? '').split('-')
      const otScore = (data?.scoresInfo?.score?.ot?? '').split('-')
      return parseTotalScore(ftScore, otScore)
    }
    return data?.scoresInfo?.score?.ft
  }, [ballType, data])

  const isLoading = loading || fetchLoading
  const cancelReason = data.cancelReason
  const hasPKscore = Sid[ballType] === Sid.football && (data?.scoresInfo?.score?.pk ?? '')

  return (
    <Layout
      isLoading={isLoading}
      isEmpty={isNaN(data.iid) || marketsFilter.length === 0}
      noBackground
      header={
        <TopHeader title={<FormatMessage msgCode='gameResult.resultDetail' />} disableOption ref={TopHeaderRef} >
            {!isLoading && (
              <Header
                homeName={data.homeName}
                awayName={data.awayName}
                score={totalScore}
                date={YYYYMMDDHHmm}
                {...(hasPKscore && { pkScore: hasPKscore })}
                isReverse={isReverseHomeAway}>
                <React.Fragment>
                  <ScoreBoard.Football
                    homeId={data.homeId}
                    awayId={data.awayId}
                    leagueName={<WorldCup.RoundGroupName roundGroup={group as RoundConf}/>}
                    scoresInfo={data.scoresInfo} />
                  {cancelReason && (
                    <div style={{
                      width: '100%',
                      fontSize: '11px',
                      backgroundColor: 'var(--bg-primary)',
                      padding: '0 0 5px 10px',
                      color: 'var(--dark-gray-light4)'
                    }}>
                      <FormatMessage msgCode='common.cancel' />: {cancelReason}
                    </div>
                  )}
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
                  <FormatMessage msgCode={i18n}/>
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
