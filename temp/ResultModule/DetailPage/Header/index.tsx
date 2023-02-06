import React from 'react'
import styles from './Header.module.scss'
import SubHeader, { NavTab } from './SubHeader'

type Props = {
  homeName: string,
  awayName: string,
  score: string,
  date: string,
  isReverse?: boolean,
  children?: React.ReactNode
}

// const Header: React.FC<Props> = ({ homeName, awayName, score = '', date, isReverse = false }) => {
const Header = ({ homeName, awayName, score, date, isReverse = false, children }: Props) => {
  const scoreParse = score
    ? score.split('-')
    : ['-', '-']

  const leftName = isReverse ? awayName : homeName
  const rightName = isReverse ? homeName : awayName
  const leftFt = isReverse ? scoreParse[1] : scoreParse[0]
  const rightFt = isReverse ? scoreParse[0] : scoreParse[1]

  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <div className={styles.team} data-direct='left'>{leftName}</div>
        <div className={styles.board}>
          <div className={styles.total}>
            <div className={styles.score} data-direct='left'>{leftFt}</div>
            <div className={styles.versus}>VS</div>
            <div className={styles.score} data-direct='right'>{rightFt}</div>
          </div>
          <div className={styles.dateTime}>{date}</div>
        </div>
        <div className={styles.team} data-direct='right'>{rightName}</div>
      </div>
      {React.isValidElement(children) && children}
    </div>
  )
}

Header.SubHeader = SubHeader
Header.NavTab = NavTab
export default Header
