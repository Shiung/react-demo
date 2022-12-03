import React from 'react'
import { Checkbox2A, CheckboxPersonalN } from '@sportPages/mobile/components/League/icons'
import cx from 'classnames'
import { ArrowRight } from '@sportIcons/index'
import styles from '@sportPages/mobile/components/League/Tournament/Tournament.module.scss'

type Props = {
  name: React.ReactNode
  count: number
  active: boolean
  select: () => void
  click: () => void
}

const Tournament: React.FC<Props> = props => {
  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <div className={cx(styles.checkBox, { [styles.active]: props.active })} onClick={props.select}>
          {props.active ? <Checkbox2A width='24px' height='24px' /> : <CheckboxPersonalN width='24px' height='24px' />}
        </div>
        <div className={styles.content} onClick={props.click}>
          {props.name}
        </div>
        <div className={styles.forward} onClick={props.click}>
          <div className={styles.count}>{props.count}</div>
          <div className={styles.forward__icon}>
            <ArrowRight width='15px' height='15px' />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Tournament
