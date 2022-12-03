import { useState, useEffect, useCallback } from 'react'

let debounce_timer: ReturnType<typeof setTimeout>
const __debounce = function(fun: () => void, closeShowHandler: () => void) {
  return function(this: any) {
    closeShowHandler()
    clearTimeout(debounce_timer)
    debounce_timer = setTimeout(() => {
      fun.apply(this)
    }, 500)
    
  }
}

const useScrollGoTop = (boxDom: React.RefObject<HTMLDivElement>) => {
  const [show, setShow] = useState<boolean>(false)

  useEffect(() => {
    const callBackHandler = () => {
      const scrollTop = window.scrollY
      const boxTop = 0 // boxDom.current?.offsetTop ?? 0

      scrollTop > boxTop
        ? setShow(true)
        : setShow(false)
    }

    const debounceCallback = __debounce(callBackHandler, () => setShow(false))

    window.addEventListener('scroll', debounceCallback)

    return () => {
      window.removeEventListener('scroll', debounceCallback)
    }
  }, [boxDom])

  return {
    show,
    clickHandler: useCallback(() => window.scrollTo({ top: 0, behavior: 'smooth' }), [])
  }
}

export {
  useScrollGoTop
}
