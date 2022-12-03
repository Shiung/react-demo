import { useMemo } from 'react'

import styles from './ShowGameEvent.module.scss'
// import { getConfig } from '@/config'
import { useGameInfo } from './hooks'
import { RoundGroupName } from '../../../components/WorldCup'

import BadgeIcon from '../../../components/BadgeIcon'
import { badgeUrlParse, BadgeType } from '../../../utils'

// import FormatMessage from '@/sports/components/FormatMessage'

const Team = ({ type, id }: { type: 'home' | 'away', id: number }) => {
  const url = useMemo(() => badgeUrlParse({ id, type: BadgeType.flagRect }), [id])
  return (
    <div className={styles.team}>
      <div className={styles.flag}>
        <BadgeIcon imgSrc={url} />
      </div>
      <div className={styles.name}>
        {/* <FormatMessage msgCode={`wcteam_${id}`}/> */}
        {`wcteam_${id}`}
      </div>
    </div>
  )
}

const ShowGameEvent = () => {
  const { showDate, roundGroup, homeId, awayId } = useGameInfo()
  return (
    <div className={styles.wrapper}>
      <div className={styles.competitors}>
        {homeId ? <Team type='home' id={homeId} /> : <div />}
        <div className={styles.versus}>
          {/* <img
            src={`${getConfig().FE_CDN_URL}/frontend/${getConfig().DEPLOY_ENV}/WorldCup/common/vs.png`}
            alt='versus'/> */}
        </div>
        {awayId ? <Team type='away' id={awayId} /> : <div />}
      </div>
      <div className={styles.date}>
        <div>
          {roundGroup && <RoundGroupName roundGroup={roundGroup}/>}
        </div>
        <div className={styles['date__time']}>
          <span>{showDate.cusDDMM}</span>
          <span>{showDate.HHmm}</span>
        </div>
      </div>
    </div>
  )
}

export default ShowGameEvent
