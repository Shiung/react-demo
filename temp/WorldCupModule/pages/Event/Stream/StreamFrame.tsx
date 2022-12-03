import { useMemo, useCallback } from 'react'
import type { GameInfo } from '@sport/components/WorldCupModule/types'

import { dateTransformMethod } from '@sport/utils/dateTransform'
import FormatMessage from '@sport/components/FormatMessage'
import { history } from '@/sports/utils'
import { CATEGORIES } from '@sport/constants/common'

import BadgeIcon from '@sport/components/WorldCupModule/components/BadgeIcon'
import { badgeUrlParse, BadgeType } from '@sport/components/WorldCupModule/utils'
import { Sid } from '@sport/components/WorldCupModule/constants'
import { RoundGroupName } from '@sport/components/WorldCupModule/components/WorldCup'
import styles from './Stream.module.scss'

import StreamContainer from '@sport/components/WorldCupModule/containers/Stream'
import { useStompUpdateForLive } from './hooks'

const StreamFrameInplay = ({ iid }: { iid: number }) => {
  const { infoID } = useStompUpdateForLive({ iid, inplay: true })

  return (
    <div data-iid={iid} data-info={infoID} >
      <StreamContainer />
    </div>
  )
}

const __parseImgSrc = (id: number) => !!id
  ? badgeUrlParse({ id, type: BadgeType.flagRect })
  : require('@sport/components/WorldCupModule/image/flag_rect_none.png').default

const StreamFrameNotStart: React.FC<Pick<GameInfo, 'iid' | 'awayId' | 'homeId' | 'roundGroup' | 'kickOffTime'>> = ({
  iid, homeId, awayId, roundGroup, kickOffTime
}) => {
  const showDate = useMemo(() => dateTransformMethod(kickOffTime, true) as any, [kickOffTime])
  const homeIcon = useMemo(() => __parseImgSrc(homeId), [homeId])
  const awayIcon = useMemo(() => __parseImgSrc(awayId), [awayId])

  const goMethod = useCallback(() => {
    if (!iid) return
    const url = `/${CATEGORIES.EARLY}/${Sid[Sid.football]}/match/${iid}/a`
    history.push(url)
  },[iid])

  return (
    <div className={styles.notStart}>
      <div className={styles.group}><RoundGroupName roundGroup={roundGroup} /></div>
      <div className={styles.date}>
        <span>{showDate.cusDDMM}</span>
        <span>{showDate.HHmm}</span>
      </div>
      <div className={styles.competitors}>
        <div className={styles.team}>
          <div className={styles.flag}>
            <BadgeIcon imgSrc={homeIcon} />
          </div>
          <div className={styles.name}>
            <FormatMessage msgCode={`wcteam_${homeId}`}/>
          </div>
        </div> 
        <div className={styles.versus}>VS</div>
        <div className={styles.team}>
          <div className={styles.flag}>
            <BadgeIcon imgSrc={awayIcon} />
          </div>
          <div className={styles.name}>
            <FormatMessage msgCode={`wcteam_${awayId}`}/>
          </div>
        </div>
      </div>
      <div className={styles.forward} onClick={goMethod}>
        <FormatMessage msgCode='worldCup.stream.detailInfo'/>
      </div>
    </div>
  )
}

const NoMatch = () => {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#fff'
    }}>no match</div>
  )
}

export { StreamFrameInplay, StreamFrameNotStart, NoMatch }
