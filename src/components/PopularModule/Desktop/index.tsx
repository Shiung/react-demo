import { useRef } from 'react'
import { usePopularList } from '../hooks'
import CardListDesktop from '../CardList/Desktop'
import cx from 'classnames'
import { useCarousel } from './hooks'
import styles from './PopularDesktop.module.scss'
import ArrowRight from '@/assets/icons/ArrowRight' // '@icons/index'
import { useEffect } from 'react'

type Props = {
  callBackIsShow?: (s: boolean) => void,
  callBackHasList?: (s: boolean) => void
}

const Desktop:React.FC<Props> = ({ callBackIsShow, callBackHasList  }) => {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const { list, language, timezone } = usePopularList()
  const hasList = list.length >= 4

  useEffect(() => {
    typeof callBackIsShow === 'function' && callBackIsShow(hasList)
    typeof callBackHasList === 'function' && callBackHasList(hasList)
  }, [hasList, callBackIsShow, callBackHasList])

  const { arrowLeft, arrowRight, moveHandler } = useCarousel(wrapperRef, hasList)

  return (
    <>
      {!hasList && <></>}
      {hasList && (
        <div className={styles.box}>
          {arrowLeft && (
            <div className={cx(styles.arrow, styles.left)} onClick={moveHandler.bind(null, 'left')}>
              <ArrowRight />
            </div>
          )}
          <div className={styles.wrapper} ref={wrapperRef}>
            <CardListDesktop key={`${language}-${timezone}`} list={list} />
          </div>
          {arrowRight && (
            <div className={cx(styles.arrow, styles.right)} onClick={moveHandler.bind(null, 'right')}>
              <ArrowRight />
            </div>
          )}
        </div>
      )}
    </>
  )
}

export default Desktop
