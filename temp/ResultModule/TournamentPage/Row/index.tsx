import React from 'react'
import styles from './Row.module.scss'

type Props = {
  slotFirst: React.ReactNode,
  slotOthers: React.ReactNode,
  slotOthersLen: number
}

const Row: React.FC<Props> = ({ slotFirst, slotOthers, slotOthersLen = 3 }) => {
  return (
    <div className={styles.container}>
      <div className={styles.slot_1}>{slotFirst}</div>
      <div className={styles[`slot_others__${slotOthersLen}`]}>{slotOthers}</div>
    </div>
  )
}

export default Row
