import { useMemo, useCallback, useRef, useEffect } from 'react'
import cx from 'classnames'
import styles from './Chart.module.scss'

import Square from './Square'
import GameList from './GameList'
import ChartContextProvider from './store/ChartContext'
import GroupContextProvider, { useGroupContext } from './store/GroupContext'

import { useWorldCupContext } from '@sport/components/WorldCupModule/store/WorldCupContext'

import { RoundConf } from '@sport/components/WorldCupModule/constants'
import type { GroupData, GroupDataLs } from '@sport/components/WorldCupModule/types' 

import { chartMapping, SquareType } from '../Chart/constants'

import { ArrowDown } from '@sportIcons/index'

import FormatMessage from '@/sports/components/FormatMessage'

const Unit: React.FC<GroupData> = ({ group, matches }) => {
  const domRef = useRef<HTMLDivElement>(null)
  const { active, isEventPage, activeHander } = useGroupContext()
  const { groupMapping, scoreLs } = useWorldCupContext()

  const isActiveGroup = active === group

  const clickHandler = useCallback((group: RoundConf) => {
    if (isActiveGroup) return
    activeHander(group)
  },[activeHander, isActiveGroup])

  const mappingConf = useMemo(() => {
    const findConf = groupMapping.find(({ group: jsonGroup }) => jsonGroup === group)
    const [AID, BID, CID, DID] = findConf?.teams || []

    const groupConf = chartMapping[group]
    !!AID && (groupConf[SquareType.A].id = AID)
    !!BID && (groupConf[SquareType.B].id = BID)
    !!CID && (groupConf[SquareType.C].id = CID)
    !!DID && (groupConf[SquareType.D].id = DID)

    return groupConf
  }, [groupMapping, group])

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>
    if (isActiveGroup && !isEventPage) {
      timer = setTimeout(() => {
        const scrollTop = domRef.current?.offsetTop ?? 0
        window.scroll({
          top: scrollTop - 208,
          behavior: 'smooth'
        })
      }, 0)
    } else if (isActiveGroup && isEventPage) {
      timer = setTimeout(() => {
        const scrollTop = domRef.current?.offsetTop ?? 0
        window.scroll({
          top: scrollTop - 100,
          behavior: 'smooth'
        })
      }, 0)
    }
    return () => {
      timer && clearTimeout(timer)
    }
  }, [isActiveGroup, isEventPage])

  return (
    <ChartContextProvider data={matches} mappingConf={mappingConf} scoreLsMatch={scoreLs?.[group] ?? []}>
      <div className={styles.wrapper} ref={domRef}>
        <div className={styles.top} onClick={clickHandler.bind(null, group)}>
          <div className={cx(styles.header, {
            [styles.active]: isActiveGroup
          })}
            onClick={activeHander.bind(null, group)}>
              <div>
                <FormatMessage msgCode='worldCup.group' values={{ group }}/>
              </div>
              <ArrowDown />
            </div>
          <div className={styles.map}>
            <Square groupActive={isActiveGroup} />
          </div>
        </div>
        <div className={cx(styles.content, { [styles.close]: !isActiveGroup })}>
          <GameList />
        </div>
      </div>
    </ChartContextProvider>
  )
}

const Chart: React.FC<{ ls: GroupDataLs }> = ({ ls }) => {
  return (
    <GroupContextProvider>
      {useMemo(() => ls.map(({ group, matches }) => <Unit key={group} {...{ group, matches }} />), [ls])}
    </GroupContextProvider>
  )
}

export const ChartEvent: React.FC<{ ls: GroupDataLs }> = ({ ls }) => {
  return (
    <GroupContextProvider isEventPage>
      {useMemo(() => ls.map(({ group, matches }) => <Unit key={group} {...{ group, matches }} />), [ls])}
    </GroupContextProvider>
  )
}

export default Chart