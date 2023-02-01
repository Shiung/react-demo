import React, { useMemo, memo } from 'react'
import { useAnimateConf } from './hooks'
import { SportID } from './constants'

import { twMerge } from 'tailwind-merge'

const BallImg = memo<{ ballSrc: string }>(({ ballSrc }) => <img className='!w-full !h-auto' src={ballSrc} alt='ball' />)
const BallShadowImg = memo<{ shadowSrc: string; isReverse: boolean }>(({ shadowSrc, isReverse }) => (
  <img
    className={twMerge(
      '!w-full !h-auto absolute translate-y-full translate-x-full bottom-[8px] z-[-1]',
      isReverse ? `scale-x-[-1] right-[150%]` : 'right-2/4'
    )}
    src={shadowSrc}
    alt='shadow'
  />
))

const GameBoard = memo<{ boardSrc: string }>(({ boardSrc }) =>
  <img
    className='!h-auto !w-full'
    src={boardSrc}
    alt='background'/>)

interface Props {
  ballType: keyof typeof SportID // 'football' | 'basketball' | 'tennis' | 'baseball'
  isReverse?: boolean
  win: 'home' | 'away'
}

const BallAnimate: React.FC<Props> = ({ ballType, isReverse = false, win = 'home' }) => {
  const { distance, ballWidth, boardWidth, boradHeight, ballTop } = useAnimateConf({ ballType })
  const circleLen = useMemo(() => 2 * Math.PI * (ballWidth / 2), [ballWidth])
  const circleLenDeg = useMemo(() => {
    const dis = win === 'away' ? distance : 0
    return dis / circleLen
  }, [circleLen, win, distance])

  return (
    <div className='flex justify-center relative m-auto' style={{ width: boardWidth, minWidth: boardWidth, height: boradHeight }}>
      <div className={twMerge('flex origin-center absolute', isReverse && `scale-x-[-1]`)}
        style={{
          width: `${distance}px`,
          height: `${ballWidth}px`,
          top: `${ballTop}px`
        }}
        >
        <div
          className={`transition-transform duration-[1500ms] relative translate-x-0`}
          style={{ transform: `translateX(${win === 'away' ? distance - ballWidth : 0}px)` }}
        >
          <div
            className={twMerge('transition-transform duration-[1500ms] rotate-0')}
            style={{ transform: `rotate(${circleLenDeg}turn)`, width: `${ballWidth}px`, height: `${ballWidth}px` }}
          >
            {ballType === 'football' && (
              <BallImg ballSrc={require('./img/football/img_0.png')} />
            )}
            {ballType === 'basketball' && (
              <BallImg ballSrc={require('./img/basketball/img_0.png')} />
            )}
            {ballType === 'tennis' && (
              <BallImg ballSrc={require('./img/tennis/img_0.png')} />
            )}
            {ballType === 'baseball' && (
              <BallImg ballSrc={require('./img/baseball/img_0.png')} />
            )}
          </div>

          {ballType === 'football' && (
            <BallShadowImg
              shadowSrc={require('./img/football/img_1.png')}
              isReverse={isReverse}
            />
          )}
          {ballType === 'basketball' && (
            <BallShadowImg
              shadowSrc={require('./img/basketball/img_1.png')}
              isReverse={isReverse}
            />
          )}
          {ballType === 'tennis' && (
            <BallShadowImg
              shadowSrc={require('./img/tennis/img_1.png')}
              isReverse={isReverse}
            />
          )}
          {ballType === 'baseball' && (
            <BallShadowImg
              shadowSrc={require('./img/baseball/img_1.png')}
              isReverse={isReverse}
            />
          )}
        </div>
      </div>
      {ballType === 'football' && <GameBoard boardSrc={require('./img/background/football.png')} />}
      {ballType === 'basketball' && <GameBoard boardSrc={require('./img/background/basketball.png')} />}
      {ballType === 'tennis' && <GameBoard boardSrc={require('./img/background/tennis.png')} />}
      {ballType === 'baseball' && <GameBoard boardSrc={require('./img/background/baseball.png')} />}
    </div>
  )
}

export default React.memo(BallAnimate)
