import React, { useMemo } from 'react'
import cx from 'classnames'
import { MatchObj } from '../../types'
import { badgeUrlParse, BadgeType } from '@/utils'
import BadgeIcon from '../../BadgeIcon'
import Carousel from './Carousel'
import styles from './ScoreBoard.module.scss'

import { CornerKick } from '@icons/index'


type BoardScore = {
  key: string,
  icon: React.ReactNode,
  homeScore?: string,
  awayScore?: string,
  homeIcon?: React.ReactNode,
  awayIcon?: React.ReactNode
}

type ScoreConfType = {
  regular: BoardScore[],
  ot: BoardScore[],
}

const scoreConf: ScoreConfType = {
  regular: [
    { key: 'team', icon: '' },
    { key: 'score_ht', icon: <div className={styles.icon__score}>HT</div> },
    { key: 'corner_ht', icon: <CornerKick width='16px' height='16px'/> },
    { key: 'yellowCard_ht', icon: <div className={cx(styles.icon__card, styles.yellow)} /> },
    { key: 'redCard_ht', icon: <div className={cx(styles.icon__card, styles.red)} /> },
    { key: 'score_ft', icon: <div className={styles.icon__score}>FT</div> },
    { key: 'corner_ft', icon: <CornerKick width='16px' height='16px'/> },
    { key: 'yellowCard_ft', icon: <div className={cx(styles.icon__card, styles.yellow)} /> },
    { key: 'redCard_ft', icon: <div className={cx(styles.icon__card, styles.red)} /> },
  ],
  ot: [
    { key: 'team', icon: '' },
    { key: 'score_ot-ht', icon: <div className={styles.icon__score}><div>OT</div><div>HT</div></div> },
    { key: 'corner_ot-ht', icon: <CornerKick width='16px' height='16px'/> },
    { key: 'yellowCard_ot-ht', icon: <div className={cx(styles.icon__card, styles.yellow)} /> },
    { key: 'redCard_ot-ht', icon: <div className={cx(styles.icon__card, styles.red)} /> },
    { key: 'score_ot', icon: <div className={styles.icon__score}><div>OT</div><div>FT</div></div> },
    { key: 'corner_ot', icon: <CornerKick width='16px' height='16px'/> },
    { key: 'yellowCard_ot', icon: <div className={cx(styles.icon__card, styles.yellow)} /> },
    { key: 'redCard_ot', icon: <div className={cx(styles.icon__card, styles.red)} /> },
    { key: 'score_pk', icon: <div className={styles.icon__score}>PK</div> },
  ],
}

const UnitCol = ({
  home, away, title, isPrimary = false
}: {
  home: string | React.ReactNode,
  away: string | React.ReactNode,
  title: React.ReactNode,
  isPrimary?: boolean
}) => {
  return (
    <div className={styles.scrollBoard__col}>
      <div>{title}</div>
      <div className={cx(styles.row, { [styles.primary]: isPrimary })}>{home}</div>
      <div className={cx(styles.row, { [styles.primary]: isPrimary })}>{away}</div>
    </div>
  )
}

const BoardComp = ({ ls }: { ls: BoardScore[] }) => {
  return (
    <div className={styles.scrollBoard}>
      {ls.map((v) => {
        return v.key === 'team'
          ? (
            <UnitCol
              key={v.key}
              title={v.icon}
              home={v.homeIcon}
              away={v.awayIcon}
              />)
          : (
            <UnitCol
              key={v.key}
              title={v.icon}
              home={v.homeScore || '-'}
              away={v.awayScore || '-'}
              {...(v.key.includes('score') && { isPrimary: true })} />)
      })}
    </div>
  )
}

type Props = {
  leagueName: string,
} & Pick<MatchObj, 'homeId' | 'awayId' | 'scoresInfo'>

const Football: React.FC<Props> = ({ leagueName, homeId, awayId, scoresInfo }) => {
  const showBadgeH = useMemo(() => isNaN(homeId) ? '' : badgeUrlParse({ type: BadgeType.competitors, id: homeId }), [homeId])
  const showBadgeA = useMemo(() => isNaN(awayId) ? '' : badgeUrlParse({ type: BadgeType.competitors, id: awayId }), [awayId])

  const regularList = useMemo(() => {
    return scoreConf.regular.map((val) => {
      if (val.key === 'team') {
        return {
          ...val,
          homeIcon: <div className={styles.img}><BadgeIcon defaultType={BadgeType.competitors} imgSrc={showBadgeH}></BadgeIcon></div>,
          awayIcon: <div className={styles.img}><BadgeIcon defaultType={BadgeType.competitors} imgSrc={showBadgeA}></BadgeIcon></div>
        }
      }
      const [mainKey, subkey] = val.key.split('_')
      const [home, away] = scoresInfo?.[mainKey]?.[subkey]?.split('-') ?? []
      return {
        ...val,
        homeScore: home,
        awayScore: away
      }
    })
  }, [showBadgeH, showBadgeA, scoresInfo])

  const otList = useMemo(() => {
    const filterRule = ({ key, homeScore, awayScore }: BoardScore) => {
      if (key === 'score_pk') return homeScore !== undefined && awayScore !== undefined
      return true
    }
    return scoreConf.ot.map((val) => {
      if (val.key === 'team') {
        return {
          ...val,
          homeIcon: <div className={styles.img}><BadgeIcon defaultType={BadgeType.competitors} imgSrc={showBadgeH}></BadgeIcon></div>,
          awayIcon: <div className={styles.img}><BadgeIcon defaultType={BadgeType.competitors} imgSrc={showBadgeA}></BadgeIcon></div>
        }
      }
      const [mainKey, subkey] = val.key.split('_')
      const [home, away] = scoresInfo?.[mainKey]?.[subkey]?.split('-') ?? []
      return {
        ...val,
        homeScore: home,
        awayScore: away
      }
    }).filter(filterRule)
  }, [showBadgeH, showBadgeA, scoresInfo])

  const hasShowOt = useMemo(() => otList.some(data => data.homeScore !== undefined), [otList])

  return (
    <div className={styles.football}>
      <div className={styles.league}>{leagueName}</div>
      <div className={styles.boardBox}>
        <Carousel disable={!hasShowOt}>
          <BoardComp ls={regularList} />
          <BoardComp ls={otList} />
        </Carousel>
      </div>
    </div>
  )
}

export default Football
