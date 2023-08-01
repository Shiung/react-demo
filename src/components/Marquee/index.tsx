import { useState, useRef, useEffect } from 'react'
import { twMerge } from 'tailwind-merge'

const Marquee: React.FC<{ infos: Array<string>, speed?: number, cusCss?: string }> = ({
  infos = [],
  speed = 1,
  cusCss = ''
}) => {
  const [move, setMove] = useState<number>(0)
  const boxDom = useRef<HTMLDivElement>(null)
  const contentDom = useRef<HTMLDivElement>(null)
  const moveRef = useRef<number>(move)
  const [boxWidth, setBoxWidth] = useState<number>(0)
  moveRef.current = move

  useEffect(() => {
    setBoxWidth(boxDom?.current?.getBoundingClientRect().width ?? 0)
  }, [boxDom])

  useEffect(() => {
    const ticker = () => {
      const scrollWidth =  contentDom?.current?.scrollWidth ?? 0
      if (Math.abs(moveRef.current) <= scrollWidth + 15) {
        // move -= 1 * speed
        setMove(prev => prev -= 1 * speed)
      } else {
        // move = 0
        setMove(0)
      }

      requestAnimationFrame(ticker)
    }
    ticker()
  }, [contentDom, speed])

  return (
    <div ref={boxDom} className={twMerge('w-full overflow-hidden', cusCss)}>
      <div
        ref={contentDom}
        className={twMerge('relative flex space-x-3 whitespace-nowrap')}
        style={{
          paddingLeft: `${boxWidth}px`,
          left: `${move}px`
        }}>
        {infos.map((info, idx) => <span key={idx}>{info}</span>)}
      </div>
    </div>
  )
}

export default Marquee
