import { useMemo } from 'react'
import { useCardContext } from '../store/cardContext'
import { Sid } from '../../constants'
import type { IJersry } from '@Popular/Jersey/types'
import { OT_TIME, PK_TIME } from '@WorldCup/constants' //'@/constants/periodMapping'

type IJersryTypeKeyFootball = keyof Omit<IJersry, 'style' | 'className'>
type IJersryTypeKeyBasketball = keyof Pick<IJersry, 'base' | 'styleColor'>
const checkKey_football: IJersryTypeKeyFootball[]
  = ['base', 'sleeve', 'sleeveDetails', 'styleColor']
const checkKey_basketball: IJersryTypeKeyBasketball[]
  = ['base', 'styleColor']

const emptyType: IJersry = {
  base: '',
  sleeve: '',
  sleeveDetails: '',
  styleColor: '',
  style: ''
}

const _parseJersey = (sid?: Sid, jersey: IJersry = emptyType) => {
  if ([Sid.baseball, Sid.tennis].some(s => s === sid)) return null
  const regexpType = /^#?(\w{3}|\w{6})$/
  const isObject = !Array.isArray(jersey) && jersey instanceof Object
  if (!isObject || !(regexpType).test(jersey?.['base'] ?? '')) return null
  const checkArr = sid === Sid.football ? checkKey_football : checkKey_basketball
  return Object.entries(jersey).reduce((returnObj, [jKey, jVal]) => {
    let returnStr
    if (!checkArr.some(key => key === jKey)) {
      return {
        ...returnObj,
        [jKey]: jVal
      }
    }

    if (/^#/.test(jVal)) {
      returnStr = (regexpType).test(jVal) ? jVal : ''
    } else {
      returnStr = (regexpType).test(jVal) ? `#${jVal}` : ''
    }
    return {
      ...returnObj,
      [jKey]: returnStr
    }
  }, {} as IJersry)
}

const _parseScore = (score: string, isReverse: boolean = false, showEmpty: boolean = false) => {
  const scoreReturn = {
    l_score: 0,
    r_score: 0
  }

  const emptyReturn = {
    l_score: '-',
    r_score: '-'
  }

  if (!score) return showEmpty ? emptyReturn : scoreReturn

  const scoreSplit = score.split('-')
  return {
    l_score: isReverse ? scoreSplit[1] : scoreSplit[0],
    r_score: isReverse ? scoreSplit[0] : scoreSplit[1]
  }
}

const useParseGameScore = () => {
  const { data: { sid }, gameInfo: { detail } } = useCardContext()
  const {
    period,
    score,
    ot: otScore,
    pk: pkScore,
  } = detail || {}

  return useMemo(() => {
    if (sid === Sid.football) {
      if (OT_TIME.includes(period)) return _parseScore(otScore, false, true)
      if (PK_TIME.includes(period)) return _parseScore(pkScore, false, true)
    }
    if (sid === Sid.tennis) return _parseScore(score, false, true)
    if (sid === Sid.baseball) return _parseScore(score, true, true)
    return _parseScore(score, false, true)
  }, [sid, period, score, otScore, pkScore])
}

const useParseTeam = () => {
  const { data: { sid, away, home } } = useCardContext()
  const homeName = home?.name ?? ''
  const awayName = away?.name ?? ''

  const isReverse = sid === Sid.baseball
  const nameConf = useMemo(() => {
    return {
      left: isReverse ? awayName : homeName,
      right: isReverse ? homeName : awayName,
    }
  }, [homeName, awayName, isReverse])

  return {
    nameConf,
    isReverse,
    isTennis: sid === Sid.tennis
  }
}

const useParseIcons = () => {
  const { data: { sid, away, home } } = useCardContext()

  const { id: HId, jersey: HJersey, cid: Hcid } = home || {}
  const { id: AId, jersey: AJersey, cid: Acid } = away || {}

  const HJerseConf = useMemo(() => {
    return _parseJersey(sid, HJersey)
  }, [sid, HJersey])

  const AJerseConf = useMemo(() => {
    return _parseJersey(sid, AJersey)
  }, [sid, AJersey])

  return {
    sid,
    HId,
    AId,
    Hcid,
    Acid,
    HJerseConf,
    AJerseConf
  }
}

export {
  useParseGameScore,
  useParseTeam,
  useParseIcons
}
