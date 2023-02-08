import React, { useState, useCallback } from 'react'
import cx from 'classnames'
import { SelectorConf } from '../../constants'
import { SelectorTypes } from '../../types'
import styles from './Selector.module.scss'
import { OddDown } from './svgSrc'

type UnitProps = {
  type: SelectorTypes,
  selectName?: string | React.ReactNode
}

const Unit: React.FC<UnitProps> = ({ type = SelectorConf.date, selectName = '', children }) => {
  const [show, setShow] = useState<boolean>(false)

  const clickHandler = useCallback(() => {
    setShow(prev => !prev)
  }, [])

  const isCheckBox = type === SelectorConf.league

  return (
    <>
      <div className={cx(styles.unit, { [styles.active]: show && type !== SelectorConf.league })} onClick={clickHandler}>
        <div className={styles.text}>
          {isCheckBox
            ? '联赛' // <FormatMessage msgCode='common.league'/>
            : selectName}
        </div>
        <div className={styles.icon}><OddDown width='10px' height='10px' /></div>
      </div>
      {show && React.isValidElement(children) && React.cloneElement<any>(children, {
        clickCallBack: clickHandler
      })}
      {show && <div className={styles.mask} onClick={clickHandler} />}
    </>
  )
}

export default Unit
