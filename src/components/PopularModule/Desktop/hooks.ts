import React, { useState, useEffect, useCallback } from 'react'

const mutationObserverOption = {
  attributes: false,
  childList: true,
  characterData: false
}

const useCarousel = (domRef: React.RefObject<HTMLDivElement>, isActive: boolean) => {
  const [arrowLeft, setArrowLeft] = useState<boolean>(false)
  const [arrowRight, setArrowRight] = useState<boolean>(false)

  const moveHandler = useCallback((type: 'left' | 'right') => {
    const domEl = domRef.current
    const boxWidth = domEl?.clientWidth ?? 0
    const totalWidth = domEl?.scrollWidth ?? 0
    const currentScrollLeft = domEl?.scrollLeft ?? 0
    const diff = totalWidth - boxWidth
    let scrollDistance: number = 0
    if (type === 'left') {
      scrollDistance = diff < boxWidth
        ? 0
        : currentScrollLeft - boxWidth
      scrollDistance === 0 && setArrowLeft(false)
      setArrowRight(true)
    }
    if (type === 'right') {
      scrollDistance = diff < boxWidth
        ? 0 + diff
        : currentScrollLeft + boxWidth

      scrollDistance === diff && setArrowRight(false)
      setArrowLeft(true)
    }
    domEl?.scroll({
      top: 0,
      left: scrollDistance,
      behavior: 'smooth'
    })
  }, [domRef])

  const sizeHandler = useCallback(() => {
    const domEl = domRef.current
    const boxWidth = domEl?.clientWidth ?? 0
    const totalWidth = domEl?.scrollWidth ?? 0
    const currentScrollLeft = domEl?.scrollLeft ?? 0

    setArrowLeft(prev => currentScrollLeft !== 0)
    setArrowRight(prev => Math.ceil(totalWidth - boxWidth) !== Math.ceil(currentScrollLeft))
  }, [domRef])

  useEffect(() => {
    const domEl = domRef.current
    const resizeHandler = (e: Event) => { sizeHandler() }
    const mutationCallBack: MutationCallback = (mutations) => { sizeHandler() }
    const mutationOberver = new MutationObserver(mutationCallBack)
    const InterObserver = new IntersectionObserver((entires) => {
      for (let entry of entires) {
        entry.isIntersecting && sizeHandler()
      }
    }, {
      root: null,
      threshold: 0,
    })
    if (domEl && isActive) {
      mutationOberver.observe(domEl, mutationObserverOption)
      InterObserver.observe(domEl)
      window.addEventListener('resize', resizeHandler)
    }

    return () => {
      mutationOberver?.disconnect()
      InterObserver?.disconnect()
      window.removeEventListener('resize', resizeHandler)
    }
  }, [domRef, isActive, sizeHandler])

  return {
    arrowLeft,
    arrowRight,
    moveHandler
  }
}

export {
  useCarousel
}
