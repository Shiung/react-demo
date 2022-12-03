import { useSelector } from 'react-redux'
import cx from 'classnames'
import styles from './CountDownSlider.module.scss'

import FormatMessage from '@sport/components/FormatMessage'
import UnitSlider, * as SliderParts from './UnitSlider'
import { numberConf } from './constants'
import { useTimeMachine } from './hooks'

const CountDownSlider: React.FC<{ callBack: () => void }> = ({ callBack }) => {
  const language = useSelector<any, string>((state) => state.common.language)
  const { day, hour, min, sec } = useTimeMachine(callBack)
  return (
    <div className={styles.wrapper}>
      <div className={styles.timeBox}>
        <UnitSlider
          TensComp={<SliderParts.NumParts id='dayTens' list={numberConf.day.tens} currentVal={day[0]}/>}
          UnitsComp={<SliderParts.NumParts id='dayUnits' list={numberConf.day.units} currentVal={day[1]}/>}
          UnitTitle={<div className={cx(styles.periodText, [language] )}><FormatMessage msgCode='worldCup.countdown.day' /></div>}/>
        <UnitSlider
          TensComp={<SliderParts.NumParts id='hourTens' list={numberConf.hour.tens} currentVal={hour[0]}/>}
          UnitsComp={<SliderParts.NumParts id='hourUnits' list={numberConf.hour.units} currentVal={hour[1]}/>}
          UnitTitle={<div className={cx(styles.periodText, [language] )}><FormatMessage msgCode='worldCup.countdown.hour' /></div>}/>
        <UnitSlider
          TensComp={<SliderParts.NumParts id='minuteTens' list={numberConf.minute.tens} currentVal={min[0]}/>}
          UnitsComp={<SliderParts.NumParts id='minuteUnits' list={numberConf.minute.units} currentVal={min[1]}/>}
          UnitTitle={<div className={cx(styles.periodText, [language] )}><FormatMessage msgCode='worldCup.countdown.min' /></div>}/>
        <UnitSlider
          TensComp={<SliderParts.NumParts id='secondTens' list={numberConf.second.tens} currentVal={sec[0]}/>}
          UnitsComp={<SliderParts.NumParts id='secondUnits' list={numberConf.second.units} currentVal={sec[1]}/>}
          UnitTitle={<div className={cx(styles.periodText, [language] )}><FormatMessage msgCode='worldCup.countdown.sec' /></div>}/>
      </div>
    </div>
  )
}

export default CountDownSlider
