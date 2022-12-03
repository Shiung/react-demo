import React from 'react'
import ReactDOM from 'react-dom'
import { useState, useEffect, useRef } from 'react'
import { ElementId } from '@/hooks/useStickyController'
import styles from './Sticky.module.scss'
import cx from 'classnames'

import { history } from '@sport/utils'
import Toast from './components/Toast'
import FormatMessage from '@sport/components/FormatMessage'
import { pathConfig } from './constants'
import useOutsideEvent from '@sport/hooks/useOutsideEvent'

const Sticky = React.memo(() => {
  const ref = useRef(null)
  const [__counting, setCounting] = useState<number>(5)
  const [status, setStatus] = useState<string>('virtual')

  const handleClickEvent = (path: string) => {
    if (!path) return Toast(FormatMessage({ msgCode: 'worldCup.comingSoon' }))
    history.push(path)
  }

  useOutsideEvent({
    refs: ref,
    onClickOutside: () => {
      setCounting(5)
      setStatus('virtual')
    }
  })

  const handleClickSticky = () => setStatus('open')

  useEffect(() => {
    if (__counting <= 0) return setStatus('reality')
  }, [__counting])

  useEffect(() => {
    if (status !== 'virtual') return

    let timer = setInterval(() => {
      setCounting(__counting => __counting - 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [status])

  useEffect(() => {
    const handleScroll = () => {
      setCounting(5)
      setStatus('virtual')
    }
    document.addEventListener('scroll', handleScroll)
    return () => document.removeEventListener('scroll', handleScroll)
  }, [])

  return ReactDOM.createPortal(
    <div id={ElementId.WORLD_CUP_ID} className={cx(styles.wrapper, styles[status])} onClick={handleClickSticky}>
      <img className={styles.img} src={require('./images/bg.png').default} alt='' />
      <div className={styles.content}>
        {pathConfig.map((item, index) => (
          <div key={`sticky_${index}`} onClick={() => handleClickEvent(item.path)} className={styles.item}>
            {FormatMessage({ msgCode: item.text })}
          </div>
        ))}
      </div>
    </div>,
    document.getElementById('sports-sticky') as HTMLDivElement
  )
})

export default Sticky
