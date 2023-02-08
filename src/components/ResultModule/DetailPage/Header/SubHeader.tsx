import React, { useState, useRef, useEffect, useCallback } from 'react'
import cx from 'classnames'
import styles from './Header.module.scss'

const NavTab: React.FC<{ isActive: boolean, action: () => void }> = ({ isActive = false, action, children }) => {
  const clickHandler = useCallback(() => {
    typeof action === 'function' && action()
  }, [action])

  return <div className={cx({ [styles.active]: isActive })} onClick={clickHandler}>{children}</div>
}

type Props = {
  TopHeaderRef?: React.RefObject<HTMLDivElement>
}

const SubHeader: React.FC<Props> = ({ TopHeaderRef, children }) => {
  const DomRef = useRef<HTMLDivElement>(null)
  const PrevScrollRef = useRef<number>(0)
  const [style, setStyle] = useState<{ top: string, transition: string }>({
    top: `${TopHeaderRef?.current?.getBoundingClientRect()?.height ?? 0}px`,
    transition: 'top 0s'
  })

  useEffect(() => {
    const scrollHandler = (e: Event) => {
      const target = e.currentTarget as Window
      const scrollTop = target.scrollY ?? 0
      const TopHeaderHeight = TopHeaderRef?.current?.getBoundingClientRect()?.height ?? 0
      const DomHeight = DomRef.current?.getBoundingClientRect()?.height ?? 0
      const documentHeight = Math.abs(document.body.scrollHeight)
      if (scrollTop < DomHeight * 2) {
        setStyle({
          top: `${TopHeaderHeight}px`,
          transition: 'top 0s'
        })
      } else {
        const overScrollBound = documentHeight - target.innerHeight
        if (scrollTop >= overScrollBound) return PrevScrollRef.current = overScrollBound
        if (scrollTop > PrevScrollRef.current) {
          const top = (TopHeaderHeight) - DomHeight
          setStyle({
            top: `${top}px`,
            transition: 'top .3s'
          })
        } else {
          const top = TopHeaderHeight
          setStyle({
            top: `${top}px`,
            transition: 'top .3s'
          })
        }
      }

      PrevScrollRef.current = scrollTop
    }

    window.addEventListener('scroll', scrollHandler, true)
    return () => {
      window.removeEventListener('scroll', scrollHandler, true)
    }
  }, [TopHeaderRef])

  return (
    <div
      className={styles.sub}
      style={style}
      ref={DomRef} >
      <div className={styles.block}>
        {React.isValidElement(children) && children}
      </div>
    </div>
  )
}

export { NavTab }
export default SubHeader
