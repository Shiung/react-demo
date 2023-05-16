import { useRef, useEffect, useState } from 'react'
// import { useSelector } from 'react-redux'

type PromotionLs = {
  id: number,
  title: string,
  promotionType: number
}[]

const fakeList: PromotionLs = [
  {
    id: 3753,
    title: 'VIP等級回饋 -抵用',
    promotionType: 4
  },
  {
    id: 3752,
    title: 'VIP等級回饋 -優惠',
    promotionType: 4
  },
  {
    id: 3683,
    title: 'CNY金(回饋VIP) 勿刪勿關',
    promotionType: 4
  },
  {
    id: 3684,
    title: 'CNY券(寶箱VIP) 勿刪勿關',
    promotionType: 4
  },
  {
    id: 3210,
    title: '抵用金10%',
    promotionType: 4
  },
]

let timer: ReturnType<typeof setTimeout>
let timeout: ReturnType<typeof setTimeout>
let count: number = 5000
let timeoutCount: number = 500

const useCarousel = () => {
  const list = fakeList //useSelector((state: any) => state.user.promotionList) as PromotionLs
  const [current, setCurrent] = useState<number>(0)
  const prevRef = useRef<number>(0)
  const timeoutRef = useRef<boolean>(false)

  const totalCount = list.length ?? 0

  useEffect(() => {
    return () => {
      setCurrent(0)
      prevRef.current = 0
    }
  }, [list])

  useEffect(() => {
    prevRef.current = current
    timeoutRef.current = true
    timeout = setTimeout(() => {
      timeoutRef.current = false
    }, timeoutCount)
    return () => {
      clearTimeout(timeout)
    }
  }, [current])

  useEffect(() => {
    const trigerHandler = () => {
      if (totalCount > 1) {
        setCurrent(prev => {
          return ++prev > (totalCount - 1)
            ? 0
            : prev
        })
        timer = setTimeout(trigerHandler, count)
      }
    }
    timer = setTimeout(trigerHandler, count)
    return () => {
      clearTimeout(timer)
    }
  }, [totalCount])


  return {
    current,
    prevRef,
    timeoutRef,
    list
  }
}

export {
  useCarousel
}
