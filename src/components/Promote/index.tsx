import { useCallback } from 'react'
import { useCarousel } from './hooks'
import { ReactComponent as HomeEvent } from './svg/home_event.svg'
import { ReactComponent as Lines } from './svg/lines.svg'
import styles from './Promote.module.scss'
import cx from 'classnames'

const Promote = () => {
  const { current, prevRef, timeoutRef, list } = useCarousel()

  const clickHandler = useCallback(() => {
    if (timeoutRef.current) return
    const { id, promotionType } = list[current] ?? {}
    if (id !== undefined && promotionType !== undefined) console.log('do noting')
  }, [current, list, timeoutRef])

  if (!list?.length) return null
  return (
    <div className={styles.wrapper}>
      <div className={styles.icon}><HomeEvent width='20px' height='20px' /></div>
      <div className={styles.content} onClick={clickHandler}>
        {list.map(({ id, title }, idx) => {
          return (
            <div
              key={id}
              className={cx(
                styles.carousel,
                { [styles.active]: current === idx },
                { [styles.slideOut]: current !== idx && prevRef.current === idx }
              )}>
              <div className={styles.ellipsis}>{title}</div>
            </div>
          )
        })}
      </div>
      <div className={styles.toward} onClick={clickHandler} />

      <div className={styles.background}><Lines width='44px' height='44px' /></div>
    </div>
  )
}

export default Promote
