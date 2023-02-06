import React, { useMemo } from 'react'
import { useParams } from 'react-router-dom'
import cx from 'classnames'
import { BallType, MathType } from '../types'
import TopHeader from "../TopHeader"
import { TournamentObj } from '../types'
import { useLeagueContext } from '../store/league-context'
import { badgeUrlParse, BadgeType } from '@/utils'
import { history } from '@/utils'
import FormatMessage from '@/components/FormatMessage'
import { CATEGORIES } from '@/constants/common'
import HeaderContent from '@components/Header/HeaderContent'
import BadgeIcon from '../BadgeIcon'
import styles from './League.module.scss'
import Tournament from './Tournament'
import Layout from '../Layout'

const GameUnit: React.FC<{ tournament: TournamentObj }> = ({ tournament }) => {
  const { ballType, match, date } = useParams<{ ballType: BallType, match: MathType, date: string }>()
  const showBadge = useMemo(() => badgeUrlParse({ type: BadgeType.tournaments, id: tournament.tid }), [tournament.tid])

  return (
    <Tournament
      name={tournament.tnName}
      count={tournament?.matches?.length ?? 0}
      badge={<BadgeIcon imgSrc={showBadge} defaultType={BadgeType.competitors}/>}
      click={history.push.bind(null, `/${CATEGORIES.GAMERESULT}/${ballType}/${match}/${date}/${tournament.tid}`)}/>
  )
}

const LeaguePage: React.FC = () => {
  const { loading, filterLs, searchText } = useLeagueContext()

  const searchExist = !!searchText
  return (
    <Layout
      isLoading={loading}
      isEmpty={filterLs.length === 0}
      header={<TopHeader title={<FormatMessage msgCode='gameResult.result' />} hasSearch={searchExist} />}
      content={useMemo(() => (
          <>
            {filterLs.map((l) => {
              const showBadge = badgeUrlParse({ type: BadgeType.categories, id: l.cid })
              const badgeDom = (
                <div className={cx(styles.badge, styles.categories)}>
                  <BadgeIcon imgSrc={showBadge} defaultType={BadgeType.categories}/>
                </div>
              )
              return (
                <HeaderContent
                  key={l.cid}
                  title={l.catName}
                  shoeBadge
                  badge={badgeDom}
                  titleBold
                  fixInitExpand
                  expand={false}
                  disableCollapse={searchExist} >
                  {l.tournaments.map((tournament) =>
                    <GameUnit key={`${l.cid}-${l.catName}-${tournament.tid}`} tournament={tournament} />
                  )}
                </HeaderContent>
              )
            })}
          </>), [filterLs, searchExist])}
    />
  )
}

export default LeaguePage
