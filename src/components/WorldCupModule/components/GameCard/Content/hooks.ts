import { useMemo, useCallback } from 'react'
import type { GameInfo, InfoDetail } from '../../../types'
import { OT_TIME, PK_TIME } from '../../../constants'

const useParseScore = ({ isShowScore, scoreList }: {
  isShowScore: boolean,
} & Pick<GameInfo, 'scoreList'>) => {
  return useMemo(() => {
    if (!isShowScore) return null
    return scoreList.reduce((sum, cur) => {
      const { total } = sum
      const { home, away } = cur
      if (['ft', 'ot'].includes(cur?.period)) {
        if (isNaN(home) && isNaN(away)) return sum
        return total.length === 0
        ? { ...sum, total: [Number(home), Number(away)] }
        : {
          ...sum,
          total: [total[0] + Number(home), total[1] + Number(away)]
        }
      } else {
        return (!home && !away)
          ? sum
          : { ...sum, pk: [Number(home), Number(away)] }
      }
    }, { total: [], pk: [] } as { total: number[], pk: number[]})
  }, [isShowScore, scoreList])
}

const useIswin = ({ isShowResult, finalScore }: {
  isShowResult: boolean,
  finalScore: {
    total: number[],
    pk: number[]
  } | null
}): { home: boolean, away: boolean } => {
  return useMemo(() => {
    if (!isShowResult || !finalScore) return {
      home: false,
      away: false
    }

    const totalScore = finalScore.total.length > 0 ? finalScore.total : [0, 0]
    const pkScore = finalScore.pk.length > 0 ? finalScore.pk : [0, 0]
    const [hScore, aScore] = totalScore
    const [hScorePK, aScorePK] = pkScore

    return {
      home: hScore === aScore ? (hScorePK > aScorePK) : (hScore > aScore),
      away: hScore === aScore ? (hScorePK < aScorePK) : (hScore < aScore)
    }
  }, [isShowResult, finalScore])
}

const _parseScore = (score: string, showEmpty: boolean = false) => {
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
    l_score: scoreSplit[0],
    r_score: scoreSplit[1]
  }
}

const useParseInplayScore = (detail: Partial<InfoDetail>) => {
  const {
    period = '',
    score = '',
    ot = '',
    pk = '',
  } = detail 
  
  return useMemo(() => {
    if (OT_TIME.includes(period)) return _parseScore(ot, false)
    if (PK_TIME.includes(period)) return _parseScore(pk, false)
    return _parseScore(score, false)
  }, [period, score, ot, pk])
}

const useToDetail = ({ iid, isInplay, isTrigger = false }: { iid: number, isInplay: boolean, isTrigger: boolean }) => {
  return useCallback(() => {
    if (!isTrigger || !iid) return
    // const pushHandler = (url: string) => history.push(url)
    // const url = `/${isInplay ? 'inplay' : 'ela'}/${Sid[Sid.football]}/match/${iid}/a`
    // pushHandler(url)
    console.log('iid, isInplay, isTrigger', iid, isInplay, isTrigger)
  }, [iid, isInplay, isTrigger])
}

export {
  useParseScore,
  useIswin,
  useParseInplayScore,
  useToDetail
}
