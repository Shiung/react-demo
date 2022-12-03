import { useEffect, useRef, useCallback } from 'react'

const useScroll = ({ ref, action, isUse = false }: {
  ref: React.RefObject<HTMLDivElement>,
  action: () => void,
  isUse?: boolean
}) => {
  const observerRef = useRef<IntersectionObserver | null>(null)

  const ObserverHandler = useCallback(() => {  
    const callBackHandler: IntersectionObserverCallback = (entires, observer) => {
      entires.forEach(entry => {
        const { isIntersecting } = entry
        isIntersecting && typeof action === 'function' && action()
      })
    }
    const wh = window.innerHeight
    
    observerRef.current = new IntersectionObserver(callBackHandler, {
      root: null,
      rootMargin: `-${200 + 8}px 0px -${wh - 200 - 8}px 0px`,
      threshold: 0
    })
    isUse && ref.current && observerRef.current.observe(ref.current)
  }, [isUse, action, ref])

  useEffect(() => {
    ObserverHandler()
    window.addEventListener('resize', () => {
      observerRef?.current?.disconnect()
      ObserverHandler()
    })
    return () => {
      observerRef?.current?.disconnect()
    }
  }, [ObserverHandler])
}

export {
  useScroll
}