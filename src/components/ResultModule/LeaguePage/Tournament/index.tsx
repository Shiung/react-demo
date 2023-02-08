import React, { useCallback } from 'react'
import cx from 'classnames'
import { useLeagueContext } from '../../store/league-context'
// import { ArrowRight } from '@icons/index'
import { ReactComponent as ArrowRight } from '@/assets/svg/arrow-right.svg'
import styles from './Tournament.module.scss'

type Props = {
  name: string,
  count: number,
  badge: React.ReactNode,
  click: () => void
}

const Tournament: React.FC<Props> = ({ name, count, badge, click }) => {
  const { searchText } = useLeagueContext()
  const clickHandler = useCallback(() => {
    typeof click === 'function' && click()
  }, [click])

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <div className={cx(styles.icon)}>
          {React.isValidElement(badge) && badge}
        </div>
        <div className={styles.content} onClick={clickHandler}>{name}</div>
        <div className={cx(styles.forward, { [styles.search]: !!searchText })} onClick={clickHandler}>
          {searchText
            ? <div className={styles.searchStr}>{searchText}</div>
            : <div className={styles.count}>{count}</div>
          }
          <div className={styles.forward__icon}>
            <ArrowRight width='15px' height='15px' />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Tournament
