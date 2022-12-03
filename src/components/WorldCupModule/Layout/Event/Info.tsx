import React, { useRef, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import styles from './Layout.module.scss'

type Props = {
  infoNav?: React.ReactNode
  infoSubNav?: React.ReactNode
}

const Info: React.FC<Props> = ({
  infoNav, infoSubNav, children
}) => {
  const domEl = useRef<HTMLDivElement>(null)
  const { pathname } = useLocation()

  useEffect(() => {
    const { offsetTop = 0 } = domEl.current || {}
    window.scroll(0, offsetTop)
  }, [pathname])

  return (
    <div className={styles.info} ref={domEl}>
      <div className={styles['info__header']}>
        {React.isValidElement(infoNav) && infoNav}
        {React.isValidElement(infoSubNav) && infoSubNav}
      </div>
      <div className={styles['info__content']}>
        {children}
      </div>
    </div>
  )
}

export default Info
