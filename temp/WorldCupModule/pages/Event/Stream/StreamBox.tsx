import { useCallback, useMemo } from 'react'
import cx from 'classnames'
import styles from './Stream.module.scss'

import { StatesConst } from '@sport/components/WorldCupModule/constants'
import BadgeIcon from '@sport/components/WorldCupModule/components/BadgeIcon'
import { badgeUrlParse, BadgeType } from '@sport/components/WorldCupModule/utils'

import * as StreamFrame from './StreamFrame'
import { useStreamData, useParseScore } from './hooks'
import { useStompUpdate } from '@sport/components/WorldCupModule/components/GameCard/hooks/useStomp'

const __parseImgSrc = (id: number) => {
  return !!id
    ? badgeUrlParse({ id, type: BadgeType.flagRect })
    : require('@sport/components/WorldCupModule/image/flag_rect_none.png').default
}

type TabProps = {
  isActive?: boolean
  homeId?: number
  awayId?: number
  iid?: number
  isInplay: boolean
  callback: (iid: number) => void
}

const UnitTab: React.FC<TabProps> = ({
  isActive = false, iid = 0, homeId = 0, awayId = 0, isInplay, callback
}) => {
  const { infoID, gameInfo: { detail = {}} } = useStompUpdate({ iid, inplay: isInplay, initServerTime: '' })
  const { l_score, r_score } = useParseScore(detail, isInplay)
  const homeIcon = useMemo(() => __parseImgSrc(homeId), [homeId])
  const awayIcon = useMemo(() => __parseImgSrc(awayId), [awayId])

  const clickHandler = useCallback(() => {
    if (isActive) return
    typeof callback === 'function' && callback(iid)
  }, [callback, iid, isActive])

  return (
    <div
      data-iid={iid}
      data-info={infoID}
      className={cx(styles.unitTab, { [styles.active]: isActive })}
      onClick={clickHandler}>
      <div className={styles.flag}><BadgeIcon imgSrc={homeIcon} /></div>
      <div className={styles.score}>
        <div className={styles.point}>{l_score}</div>
        <div className={styles.versus}>:</div>
        <div className={styles.point}>{r_score}</div>
      </div>
      <div className={styles.flag}><BadgeIcon imgSrc={awayIcon} /></div>
    </div>
  )
}

const StreamBox = () => {
  const { ls, selected, selectedHandler, currentGame } = useStreamData()

  return (
    <div className={styles.streamBox}>
      <div className={styles.tabHeader}>
        {useMemo(() => {
          return ls.map(({ iid, homeId, awayId, statePhase }) => {
            return (
              <UnitTab
                key={iid}
                iid={iid}
                homeId={homeId}
                awayId={awayId}
                isInplay={statePhase === StatesConst.INPLAY}
                callback={selectedHandler}
                isActive={iid === selected} />
            )})
        }, [ls, selected, selectedHandler])}
      </div>
      <div className={styles.streamFrame}>
        {currentGame && currentGame.statePhase === StatesConst.INPLAY
          ? <StreamFrame.StreamFrameInplay  iid={currentGame.iid} key={currentGame.iid}/>
          : currentGame?.statePhase === StatesConst.NON_START
            ? <StreamFrame.StreamFrameNotStart { ...currentGame }/>
            : <StreamFrame.NoMatch />}
      </div>
    </div>
  )
}

export default StreamBox
