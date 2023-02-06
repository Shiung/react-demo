import React from 'react'
import cx from 'classnames'
import styles from './Row.module.scss'

type Props = {
  slotFirst: React.ReactNode,
  slotOthers: React.ReactNode,
  slotOthersLen: number
}

const Row: React.FC<Props> = ({ slotFirst, slotOthers, slotOthersLen = 5 }) => {
  return (
    <div className={styles.container}>
      {React.isValidElement(slotFirst) && React.cloneElement(slotFirst, {
        className: cx(slotFirst.props.className, styles.ellipse)
      })}
      <div className={styles[`fixed__${slotOthersLen}`]}>{slotOthers}</div>
    </div>
  )
}

export default Row
