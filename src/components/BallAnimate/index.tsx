import { useEffect, useState } from 'react'
import BallAnimate from './BallAnimate'

const BallTestPage = () => {
  const [footWin, setFootWin] = useState<'home' | 'away'>('home')
  const [basketWin, setBasketWin] = useState<'home' | 'away'>('home')
  const [tennisWin, setTennisWin] = useState<'home' | 'away'>('home')
  const [baseWin, setBaseWin] = useState<'home' | 'away'>('home')

  useEffect(() => {
    const timer = setInterval(() => {
      setFootWin(prev => prev === 'away' ? 'home': 'away')
      setBasketWin(prev => prev === 'away' ? 'home': 'away')
      setTennisWin(prev => prev === 'away' ? 'home': 'away')
      setBaseWin(prev => prev === 'away' ? 'home': 'away')
    }, 5000)

    return () => {
      clearInterval(timer)
    }
  }, [])

  return (
    <>
      <BallAnimate ballType='football' win={footWin} />
      <div className='mb-[20px]'/>
      <BallAnimate ballType='basketball' win={basketWin} />
      <div className='mb-[20px]'/>
      <BallAnimate ballType='tennis' win={tennisWin} />
      <div className='mb-[20px]'/>
      <BallAnimate ballType='baseball' win={baseWin} isReverse />
    </>
  )
}

export default BallTestPage
