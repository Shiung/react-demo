import React, { useState, useRef, useEffect } from 'react'
import cx from 'classnames'
import styles from './Carousel.module.scss'

type Props = {
  children: React.ReactNode[],
  disable?: boolean,
  switchDistance?: number
}

const Carousel: React.FC<Props> = ({ children, switchDistance = 100, disable = false }) => {
  const BoxRef = useRef<HTMLDivElement>(null)
  const touchPos = useRef<number>(0)
  const ControlBoxRef = useRef<HTMLDivElement>(null)
  const CurrentActiveRef = useRef<number>(0)
  const [scrolling, setScolling] = useState<boolean>(false)
  const [shiftPos, setShiftPos] = useState<number>(0)
  const childrenLs = children.length

  useEffect(() => {
    const DomEl = BoxRef.current
    const handleTouchStartEvent = (e: TouchEvent ) => {
      e.stopPropagation()
      e.preventDefault()
      setScolling(true)
      touchPos.current = e.targetTouches[0].pageX
    }
    const handleTouchMoveEvent = (e: TouchEvent ) => {
      e.preventDefault()
      e.stopPropagation()
      const standard = ((ControlBoxRef.current?.scrollWidth ?? 0) / childrenLs) || document.body.scrollWidth
      const distanse =  e.changedTouches[0].pageX - touchPos.current
      setShiftPos((CurrentActiveRef.current * standard * -1) + distanse)
    }
    const handleTouchEndEvent = (e: TouchEvent ) => {
      e.preventDefault()
      e.stopPropagation()
      const standard = ((ControlBoxRef.current?.scrollWidth ?? 0) / childrenLs) || document.body.scrollWidth
      const distanse = e.changedTouches[0].pageX - touchPos.current
      if (distanse < 0) { // 向右
        if (distanse < -switchDistance) {
          const updateStatus = CurrentActiveRef.current < (childrenLs - 1) ? CurrentActiveRef.current + 1 : CurrentActiveRef.current
          setShiftPos(standard * -(updateStatus))
          CurrentActiveRef.current = updateStatus
        } else {
          setShiftPos(-CurrentActiveRef.current * standard)
        }
      } else { // 向左
        if (distanse > switchDistance) {
          const updateStatus = CurrentActiveRef.current === 0 ? 0 : CurrentActiveRef.current - 1
          setShiftPos(standard * -(updateStatus))
          CurrentActiveRef.current = updateStatus
          setShiftPos(-CurrentActiveRef.current * standard)
        } else {
          setShiftPos(-CurrentActiveRef.current * standard)
        }
      }
      setScolling(false)
    }
    if (DomEl && !disable) {
      DomEl?.addEventListener('touchmove', handleTouchMoveEvent)
      DomEl?.addEventListener('touchstart', handleTouchStartEvent)
      DomEl?.addEventListener('touchend', handleTouchEndEvent)
    }

    return () => {
      if (DomEl && !disable) {
        DomEl?.removeEventListener('touchmove', handleTouchMoveEvent)
        DomEl?.removeEventListener('touchstart', handleTouchStartEvent)
        DomEl?.removeEventListener('touchend', handleTouchEndEvent)
      }
    }
  }, [childrenLs, switchDistance, disable])

  return (
    <div className={styles.carousel} ref={BoxRef} >
      <div
        ref={ControlBoxRef}
        className={cx(styles.container, { [styles.animation]: !scrolling })}
        style={{ transform: `translateX(${shiftPos}px)`}}>
        {children}
      </div>
      <div className={styles.guide}>
        {!disable &&Array.from({ length: childrenLs }, (_, key) => {
          return <div key={`dot-${key}`} className={cx(CurrentActiveRef.current === key && styles.active)} />
        })}
      </div>
    </div>
  )
}

export default Carousel
