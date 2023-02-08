// import FormatMessage from '@/components/FormatMessage'
import React from 'react'
import styles from './Header.module.scss'

type Props = {
  homeName: string,
  awayName: string,
  isReverse?: boolean
}

/**
 * 主/和 客/和 主/客
 * i18n
 */
const Header5: React.FC<Props> = ({ isReverse }) => {
  const home = 'home' //FormatMessage({ msgCode: 'sport.subHeader.hd' })
  const draw = 'draw' //FormatMessage({ msgCode: 'sport.subHeader.ad' })
  const away = 'away' //FormatMessage({ msgCode: 'sport.subHeader.ha' })
  return (
    <div className={styles.container}>
      <div className={styles.teamName}>{!isReverse ? home : away}</div>
      <div className={styles.teamName}>{draw}</div>
      <div className={styles.teamName}>{!isReverse ? away : home}</div>
    </div>
  )
}

/**
 * 主 和 客
 * i18n
 */
const Header4: React.FC<Props> = ({ isReverse }) => {
  const home = 'home' // FormatMessage({ msgCode: 'sport.subHeader.home' })
  const draw = 'draw' // FormatMessage({ msgCode: 'sport.subHeader.draw' })
  const away = 'away' // FormatMessage({ msgCode: 'sport.subHeader.away' })
  return (
    <div className={styles.container}>
      <div className={styles.teamName}>{!isReverse ? home : away}</div>
      <div className={styles.teamName}>{draw}</div>
      <div className={styles.teamName}>{!isReverse ? away : home}</div>
    </div>
  )
}

/**
 *  主  客
 *  i18n
 */
const Header3: React.FC<Props> = ({ isReverse }) => {
  const home = 'home' // FormatMessage({ msgCode: 'sport.subHeader.home' })
  const away = 'away' // FormatMessage({ msgCode: 'sport.subHeader.away' })
  return (
    <div className={styles.container}>
      <div className={styles.teamName}>{!isReverse ? home : away}</div>
      <div className={styles.teamName}>{!isReverse ? away : home}</div>
    </div>
  )
}

/**
 *  [主隊名]  [客隊名]
 */
const Header2: React.FC<Props> = ({ homeName, awayName, isReverse }) => {
  return (
    <div className={styles.container}>
      <div className={styles.teamName}>{!isReverse ? homeName : awayName}</div>
      <div className={styles.teamName}>{!isReverse ? awayName : homeName}</div>
    </div>
  )
}


/**
 *  [主隊名] vs [客隊名]
 */
const Header1: React.FC<Props> = ({ homeName, awayName, isReverse }) => {
  return (
    <div className={styles.container}>
      <div className={styles.teamName}>{!isReverse ? homeName : awayName}</div>
      <div className={styles.versus}>VS</div>
      <div className={styles.teamName}>{!isReverse ? awayName : homeName}</div>
    </div>
  )
}

export {
  Header1,
  Header2,
  Header3,
  Header4,
  Header5
}
