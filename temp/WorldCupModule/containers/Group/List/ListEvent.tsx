import { useMemo } from 'react'
import cx from 'classnames'

import { RoundConf } from '@sport/components/WorldCupModule/constants'
import type { GroupDataLs } from '@sport/components/WorldCupModule/types'
import { ReactComponent as Label } from '@sport/components/WorldCupModule/svg/label.svg'
import GameCard, { ModalType } from '@sport/components/WorldCupModule/components/GameCard'
import * as Flag  from '@sport/components/WorldCupModule/components/Flag'
import { BadgeType } from '@sport/components/WorldCupModule/utils'

import { useWorldCupContext } from '@sport/components/WorldCupModule/store/WorldCupContext'
import PositionContextProvider, { usePositionContext } from './store/PositionContext'
import styles from './List.module.scss'

import FormatMessage from '@/sports/components/FormatMessage'

const NavBtn: React.FC<{ title: RoundConf }> = ({ title }) => {
  const { current, currentHandler } = usePositionContext()

  return (
    <div
      className={cx({ [styles.active]: current === title })}
      onClick={currentHandler.bind(null, title as RoundConf)}>
      {title}
    </div>
  )
}

const CurrentCounty: React.FC = () => {
  const { groupMapping } = useWorldCupContext()
  const { current } = usePositionContext()

  return (
    <div className={styles.currentGroup}>
      {useMemo(() => {
        const currentGroup = groupMapping.find(({ group: jsonGroup }) => jsonGroup === current)?.teams ?? []
        return currentGroup.map((iid) => {
          return (
            <div className={styles.unit} key={iid}>
              <Flag.Circle
                width={35}
                id={iid}
                type={BadgeType.flag} />
              <div className={styles.name}>
                <FormatMessage msgCode={`wcteam_${iid}`} />
              </div>
            </div>
          )
        })
      }, [groupMapping, current])}
    </div>
  )
}

const UnitEvent: React.FC<{ ls: GroupDataLs }> = ({ ls }) => {
  const { current } = usePositionContext()
  const posLs = useMemo(() => {
    return ls.reduce((returnArr, curr) => {
      return returnArr.concat(curr.group)
    }, [] as Array<RoundConf>)
  }, [ls])

  return (
    <div className={styles.unit} >
      <div className={styles.navBox}>
        <div className={styles.NavGroup}>
          {useMemo(() => {
            return posLs.map((p) => <NavBtn key={p} title={p} />)
          }, [posLs])}
        </div>
        <CurrentCounty />
      </div>
      <div className={styles.content}>
        {useMemo(() => {
          const currentLs = ls.find(({ group }) => group === current)?.matches ?? []
          return currentLs.map((game) => 
            <GameCard key={`${current}-${game.iid}-${game.sortId}`} info={game} modal={ModalType.grouppingName} useVote />
          )
        }, [ls, current])}
      </div>
    </div>
  )
}

const ListEvent: React.FC<{ ls: GroupDataLs }> = ({ ls }) => {
  return (
    <PositionContextProvider>
      <div className={cx(styles.list, styles.event)}>
        <UnitEvent ls={ls} />
      </div>
    </PositionContextProvider>
  )
}

const ListEventWithoutNav: React.FC<{ ls: GroupDataLs }> = ({ ls }) => {
  return (
    <div className={cx(styles.list, styles.event)}>
      {useMemo(() => ls.map(({ group, matches }) => {
        return (
          <div className={styles.unit} key={group}>
            <div className={styles.header}>
              <Label />
              <FormatMessage msgCode='worldCup.group' values={{ group }} />
            </div>
            <div className={styles.content}>
              {matches.map((game) => 
                <GameCard key={`${group}-${game.iid}-${game.sortId}`} info={game} modal={ModalType.grouppingName} />)}
            </div>
          </div>
        )
      }), [ls])}
    </div>
  )
}

export {
  ListEvent,
  ListEventWithoutNav
}
