import React, { useMemo, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import cx from 'classnames'
import TopHeader from "../TopHeader"
import { useWorldCupLeagueContext } from '../store/league-context'
import Tournament from '@sport/components/ResultModule/LeaguePage/Tournament'
import { history } from '@sport/utils'
import FormatMessage from '@sport/components/FormatMessage'
import { CATEGORIES } from '@sport/constants/common'
import HeaderContent from '@sportComponents/Header/HeaderContent'
import type { MathType } from '@sport/components/ResultModule/types'
import styles from '@sport/components/ResultModule/LeaguePage/League.module.scss'
import Layout from '@sport/components/ResultModule/Layout'

import { worldCupBallName, RoundConf } from '@sport/components/WorldCupModule/constants'
import * as WorldCup from '@sport/components/WorldCupModule/components/WorldCup'

const GameUnit: React.FC<{ round: string, count: number }> = ({ round, count }) => {
  const { match, date } = useParams<{ match: MathType, date: string }>()

  const clickHandler = useCallback(() => {
    history.push(`/${CATEGORIES.GAMERESULT}/${worldCupBallName}/${match}/${date}/${round}`)
  }, [match, date, round])

  return (
    <Tournament
      name={<WorldCup.RoundGroupName roundGroup={round as RoundConf} />}
      count={count}
      badge={<img src={require('@sport/components/WorldCupModule/image/fifa_2022_circle.png').default} alt='country-flag' />}
      click={clickHandler} />
  )
}

const LeaguePage: React.FC = () => {
  const { loading, filterLs, searchText } = useWorldCupLeagueContext()

  const searchExist = !!searchText
  return (
    <Layout
      isLoading={loading}
      isEmpty={Object.keys(filterLs.matches ?? {}).length === 0}
      header={<TopHeader title={<FormatMessage msgCode='gameResult.result' />} hasSearch={searchExist} />}
      content={useMemo(() => (
        <HeaderContent
          title={<FormatMessage msgCode='worldCup.FIFIA22Title' />}
          showBadge
          badge={
            <div className={cx(styles.badge, styles.categories)}>
              <img src={require('@sport/components/WorldCupModule/image/fifa_2022.png').default} alt='header-flag' />
            </div>
          }
          titleBold
          fixInitExpand
          expand
          disableCollapse >
            {Object.entries(filterLs.matches ?? {}).map(([dKey, dVal]) => {
              return <GameUnit key={`${dKey}`} round={dKey} count={dVal.length} />
            })}
          </HeaderContent>), [filterLs])}
    />
  )
}

export default LeaguePage
