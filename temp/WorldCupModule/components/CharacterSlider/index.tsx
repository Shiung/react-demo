import { useMemo, useCallback } from 'react'
import { useSelector } from 'react-redux'
import { CATEGORIES, SPORTS } from '@sport/constants/common'
import { getConfig } from '@/config'
import Slick from '@Mobile/components/Slick'
import { Settings } from 'react-slick'
import FormatMessage from '@sport/components/FormatMessage'
import { history, executePortalAction } from '@sport/utils'

import styles from './CharacterSlider.module.scss'

const isVd001 = process.env.REACT_APP_CLIENT === 'vd001' // 長城

const list = [
  {
    id: 'promo',
    title: 'worldCup.platform.promo.title',
    imgSrc: `${getConfig().FE_CDN_URL}/frontend/${getConfig().DEPLOY_ENV}/WorldCup/common/app/promo.png`,
    message: 'worldCup.platform.promo.message',
    btnI18n: 'worldCup.platform.promo.btnText'
  },
  {
    id: 'chatroom',
    title: 'worldCup.platform.chatroom.title',
    imgSrc: `${getConfig().FE_CDN_URL}/frontend/${getConfig().DEPLOY_ENV}/WorldCup/common/app/chatroom.png`,
    message: 'worldCup.platform.chatroom.message',
    btnI18n: 'worldCup.platform.chatroom.btnText'
  },
  /** 長城 */
  {
    id: 'copytrade',
    title: 'worldCup.platform.copytrade.title',
    imgSrc: `${getConfig().FE_CDN_URL}/frontend/${getConfig().DEPLOY_ENV}/WorldCup/common/app/copytrade.png`,
    message: 'worldCup.platform.copytrade.message',
    btnI18n: 'worldCup.platform.copytrade.btnText'
  },
  /** 非長城 */
  {
    id: 'stream',
    title: 'worldCup.platform.stream.title',
    imgSrc: `${getConfig().FE_CDN_URL}/frontend/${getConfig().DEPLOY_ENV}/WorldCup/common/app/stream.png`,
    message: 'worldCup.platform.stream.message',
    btnI18n: 'worldCup.platform.stream.btnText'
  }
]

const _settings: Settings = {
  dotsClass: styles.sliderDot,
  dots: true,
  infinite: true,
  // lazyLoad: 'ondemand',
  easing: 'ease-in',
  speed: 200,
  slidesToShow: 1,
  slidesToScroll: 1,
  accessibility: false,
  autoplay: true,
  autoplaySpeed: 5000,
  arrows: false,
  pauseOnHover: true,
  pauseOnFocus: true
}

const SliderUnit = ({
  id, imgSrc, title, message, btnI18n
}: { id: string, imgSrc: string, title: string, message: string, btnI18n: string }) => {
  const token = useSelector<any, string>(store => store.user.info.token)
  const clickHandler = useCallback(() => {
    switch (id) {
      case 'promo':
        return !!token ? executePortalAction({ type: 'go-promotion' }) : executePortalAction({ type: 'go-register' })
      case 'chatroom':
      case 'copytrade':
        return !!token
          ? history.push(`/${CATEGORIES.INPLAY}/${SPORTS.FOOTBALL}`)
          : executePortalAction({ type: 'go-login' })
      case 'stream':
        return executePortalAction({ type: 'go-promotion' })
      default:
        return
      }

  }, [id, token])

  return (
    <div className={styles.sliderBox}>
      <img src={imgSrc} alt='banner' />
      <div className={styles.info}>
        <div className={styles.title}><FormatMessage msgCode={title} /></div>
        <div className={styles.content}><FormatMessage msgCode={message} /></div>
      </div>
      <div className={styles.btn} onClick={clickHandler}><FormatMessage msgCode={btnI18n} /></div>
    </div>
  )
}

const CharacterSlider = () => {
  return (
    <Slick settings={_settings}>
      {useMemo(() => list.filter(({ id }) => isVd001 ? id !== 'stream' : id !== 'copytrade' ).map((l) =>
        <SliderUnit key={l.id} {...l} />), [])}
    </Slick>
  )
}

export default CharacterSlider
