import { useMemo } from 'react'
import { useCardContext } from '../store/cardContext'
import { marketConf } from '../constants'
import { Sid, simpleType } from '../../constants'
import { CATEGORIES } from '@/constants'
import { OT_TIME, PK_TIME } from '@WorldCup/constants' //'@/constants/periodMapping'
// import FormatMessage from '@/components/FormatMessage'

const _parseTitleFor1x2 = (marketType: string, betTarget: string) => {
  if (marketType.includes('1x2') || marketType.includes('ml')) {
    switch (betTarget) {
      case 'h':
        return '主' // FormatMessage({ msgCode: 'sport.common.home' })
      case 'a':
        return '客' //FormatMessage({ msgCode: 'sport.common.away' })
      case 'd':
        return '和' //FormatMessage({ msgCode: 'sport.common.draw' })
      default:
        return betTarget
    }
  }
}

const _parseOddsBtn = ({ data, mappingData, marketType, betTarget, category }: {
  data: any,
  mappingData: any,
  marketType: string,
  betTarget: string,
  category: string
}) => {
  const {
    sid,
    detail,
    iid,
    tid,
    inplay,
    kickoffDT,
    tnName,
    home,
    away
  } = data
  const { name: hName } = home || {}
  const { name: aName } = away || {}

  const _oddsInfo = ({ marketType, betTarget, title }: {
    marketType: string,
    betTarget: string,
    title: string
  }) => ({
    type: marketType, // '1x2',
    betTarget: betTarget, // 'h',
    iid, // 845010,
    title, // 'h'
    value: marketType, // '1x2',
    sid,
    tid,
    home: hName,
    away: aName,
    kickoffDT,
    tnName,
    idx: 0,
    inplay,
    category,
    detail
  })

  let odds = 0
  let title
  let titleK

  if (mappingData) {
    const betTargetInfo = (mappingData instanceof Array ? mappingData[0] : mappingData) ?? {}
    const isShowK = !['1x2', 'ml'].some(key => key === marketType)
    const titleParse = isShowK ? betTargetInfo.k : _parseTitleFor1x2(marketType, betTarget)
    odds = betTargetInfo[betTarget] || 0
    title = titleParse
    titleK = titleParse
  }

  return {
    odds,
    title,
    oddsInfo: _oddsInfo({
      marketType,
      betTarget,
      title: titleK
    }),
    key: `oddsbtn-${marketType}-${betTarget}-${iid}`
  }
}

const useMarketMapping = () => {
  const {
    data = {},
    gameInfo: { detail = {} },
    market: updateMarket,
    isInter
  } = useCardContext()

  const { sid = Sid.football, inplay } = data
  const {
    period
  } = detail

  const mappingConf = useMemo(() => {
    const isCurrentOt = OT_TIME.includes(period)
    const isCurrentPk = PK_TIME.includes(period)
    if (sid === Sid.football) {
      const currentStatus = isCurrentOt ? 'ot' : isCurrentPk ? 'pk' : 'normal'
      return marketConf[sid][isInter ? simpleType.inter : simpleType.asia][currentStatus]
    } else {
      return marketConf[sid][isInter ? simpleType.inter : simpleType.asia].normal
    }

  }, [period, sid, isInter])

  const currentMarket = mappingConf.market
  const oddsBtnList = mappingConf.betTargets.map((betTarget) => _parseOddsBtn({
    data: { ...data, detail },
    mappingData: updateMarket[currentMarket],
    marketType: currentMarket,
    betTarget,
    category: inplay ? CATEGORIES.INPLAY : CATEGORIES.EARLY
  }))

  return {
    oddsBtnList,
    length: mappingConf.betTargets.length
  }
}

export {
  useMarketMapping,
}
