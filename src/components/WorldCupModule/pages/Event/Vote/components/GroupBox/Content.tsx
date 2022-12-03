import type { VoteResult } from '../../hooks'
import styles from './GroupBox.module.scss'
import * as Flag from '../../../../../components/Flag' // '@sport/components/WorldCupModule/components/Flag'
import { BadgeType } from '../../../../../utils' //'@sport/components/WorldCupModule/utils'

// import FormatMessage from '@sport/components/FormatMessage'

const Content1 = ({ ls }: { ls: Array<VoteResult> }) => {
  return (
    <>
      {ls.map(({ id, gPercent, tPercent, promotion }) => (
        <div className={styles.content} key={`team-${id}`} >
          <div className={styles.left}>
            <div className={styles.flag}>
              {!!id
                ? <Flag.Circle width={40} type={BadgeType.flag} id={id} />
                : <Flag.CircleEmpty width={40} />}
              {promotion && <div className={styles.promotion}>{promotion}</div>} 
            </div>
            <div className={styles.teamName}>
              {/* <FormatMessage msgCode={`wcteam_${id}`} /> */}
              {`wcteam_${id}`}
            </div>
          </div>
          <div className={styles.right}>
            <div>{gPercent}%</div>
            <div>{tPercent}%</div>
          </div>
        </div>
      ))}
    </>
  )
}

const Content2 = ({ ls }: { ls: Array<VoteResult> }) => {
  return (
    <>
      {ls.map(({ id, tPercent }, idx) => (
        <div className={styles.content} key={`team-${id}-${idx}`} >
          <div className={styles.left}>
            <div className={styles.flag}>
              {!!id
                ? <Flag.Circle width={40} type={BadgeType.flag} id={id} />
                : <Flag.CircleEmpty width={40} />}
            </div>
            <div className={styles.teamName}>
              {/* {!!id ? <FormatMessage msgCode={`wcteam_${id}`} /> : '— —'} */}
              {!!id ? `wcteam_${id}` : '— —'}
            </div>
          </div>
          <div className={styles.right}>
            <div>{tPercent}%</div>
          </div>
        </div>
      ))}
    </>
  )
}

export { Content1, Content2 }
