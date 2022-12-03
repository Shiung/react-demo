import { memo, useRef, useEffect } from 'react'
import cx from "classnames"
import styles from './CountDownSlider.module.scss'
import * as NumberSvg from './icons'

const NumPart: React.FC<{ val: number }> = ({ val }) => {
  return (
    <>
      {val === 0 && <NumberSvg.Number0 />}
      {val === 1 && <NumberSvg.Number1 />}
      {val === 2 && <NumberSvg.Number2 />}
      {val === 3 && <NumberSvg.Number3 />}
      {val === 4 && <NumberSvg.Number4 />}
      {val === 5 && <NumberSvg.Number5 />}
      {val === 6 && <NumberSvg.Number6 />}
      {val === 7 && <NumberSvg.Number7 />}
      {val === 8 && <NumberSvg.Number8 />}
      {val === 9 && <NumberSvg.Number9 />}
    </>
  )
}

const NumParts = memo<{
  list: number[],
  currentVal: number,
  id: 'dayTens' | 'dayUnits' | 'hourTens' | 'hourUnits' | 'minuteTens' | 'minuteUnits' | 'secondTens' | 'secondUnits'
}>(({ list, currentVal, id }) => {
  const prevValue = useRef<number>(currentVal)

  useEffect(() => {
    prevValue.current = currentVal
  }, [currentVal])

  return (
    <>
      {list.map((val) => {
        return (
          <div
            key={`${id}-${val}`}
            className={cx(styles.numberContainer,{
              [styles['--slideIn']]: currentVal === val,
              [styles['--slideOut']]: currentVal !== val && prevValue.current === val,
            }
            )}>
            <NumPart val={val} />
          </div>
        )
      })}
    </>
  )
})

type Props = {
  TensComp: React.ReactNode
  UnitsComp: React.ReactNode
  UnitTitle: React.ReactNode
}

const UnitSlider: React.FC<Props> = ({
  TensComp, UnitsComp, UnitTitle
}) => {
  return (
    <div className={styles.unit}>
      <div className={styles.rwdBox}>
        <div className={styles.sliderBox}>
          {TensComp}
        </div>
      </div>
      <div className={styles.rwdBox}>
        <div className={styles.sliderBox}>
          {UnitsComp}
        </div>
      </div>
      {UnitTitle}
    </div>
  )
}

export {
  NumParts
}
export default UnitSlider
