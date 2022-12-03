import { useRef, useMemo, useCallback, useState, useEffect } from 'react'
import cx from 'classnames'

import { RoundConf } from '@sport/components/WorldCupModule/constants'
import type { GroupDataLs, GroupData } from '@sport/components/WorldCupModule/types'
import { ReactComponent as Label } from '@sport/components/WorldCupModule/svg/label.svg'
import GameCard, { ModalType } from '@sport/components/WorldCupModule/components/GameCard'

import PositionContextProvider, { usePositionContext } from './store/PositionContext'
import { useScroll } from './hooks/useScroll'
import styles from './List.module.scss'

import FormatMessage from '@/sports/components/FormatMessage'

const Unit: React.FC<GroupData> = ({
  group,
  matches
}) => {
  const domRef = useRef<HTMLDivElement>(null)
  const { activeVal, resetActiveHandler, currentHandler } = usePositionContext()
  const setPosHandler = useCallback(() => currentHandler(group), [currentHandler, group]) 
  useScroll({ ref: domRef, action: setPosHandler, isUse: activeVal === null })
  
  useEffect(() => {
    if (activeVal === group) {
      const curHeight = domRef.current?.offsetTop ?? 0
      const top = curHeight - 200

      setPosHandler()
      window.scroll({
        top,
        behavior: 'smooth'
      })

      setTimeout(() => {
        resetActiveHandler()
      }, 500)
    }
  }, [activeVal, group, setPosHandler, resetActiveHandler])

  return (
    <div className={styles.unit} ref={domRef}>
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
}

const NavList = ({ posLs, collapse, callBack }: {
  callBack: () => void,
  posLs: Array<RoundConf>,
  collapse: boolean
}) => {
  const { current, activeHandler } = usePositionContext()
  const clickHandler = useCallback((v: RoundConf) => {
    activeHandler(v)
    callBack()
  }, [activeHandler, callBack])
  if (posLs.length === 0) return <></>
  return (
    <div className={styles.nav} >
      {!collapse && (
        <div className={styles.unCollapse} onClick={callBack}>
          {/* <FormatMessage msgCode='worldCup.group' values={{ group: current }} /> */}
          {current}
        </div>
      )}
      {collapse && (
        <div className={styles.collapse}>
          {posLs.map((p) =>
            <div key={p} className={cx({ [styles.active]: p === current})} onClick={clickHandler.bind(null, p)}>
              {/* <FormatMessage msgCode='worldCup.group' values={{ group: p }} /> */}
              {p}
            </div>)}
        </div>
      )}
  </div>
  )
}

const List: React.FC<{ ls: GroupDataLs, disableNav?: boolean }> = ({ ls, disableNav = false }) => {
  const [collapse, setCollapse] = useState<boolean>(false) 
  const collapseHandler = useCallback(() => setCollapse(prev => !prev), [])
  const posLs = useMemo(() => {
    return ls.reduce((returnArr, curr) => {
      return returnArr.concat(curr.group)
    }, [] as Array<RoundConf>)
  }, [ls])

  return (
    <PositionContextProvider>
      <div className={styles.list}>
        {useMemo(() => ls.map((l) => {
          return <Unit
            key={l.group}
            group={l.group}
            matches={l.matches}/>
        }), [ls])}
        {!disableNav && <NavList {...{posLs, collapse }} callBack={collapseHandler} />}
        {collapse && <div className={styles.mask} onClick={collapseHandler} />}
      </div>
    </PositionContextProvider>
  )
}

export default List
