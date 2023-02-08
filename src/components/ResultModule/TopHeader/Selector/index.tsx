import React, { useMemo } from 'react'
// import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { SelectorConf, MatchArr } from '../../constants'
import { BallType, MathType } from '../../types'
// import { dateTransformMethod } from '@utils/dateTransform'
// import { getDate } from '@/utils'
import SelectOption from './SelectOption'
import CheckOption from './CheckOption'
// import FormatMessage from '@/components/FormatMessage'
import { CATEGORIES } from '@/constants'
import Unit from './unit'
import styles from './Selector.module.scss'

const Year = '2023'
const MM = '01'
const DD = 17
const fakeDateLs = Array.from(({ length: 7}), (_, key) => ({
  YYYYMMDD: `${Year}-${MM}-${DD - key}`,
  DDMM: `${DD - key}-${MM}`
}))

const Selector: React.FC = () => {
  // const timezone = useSelector((state: any) => state.common.timezone)
  const { ballType, match, date } = useParams<{ ballType: BallType, match: MathType, date: string }>()

  const matchLs = useMemo(() => {
    return MatchArr.map(({ id, keyCode }) => ({
      id,
      text: keyCode, // <FormatMessage msgCode={keyCode} />,
      url: `/${CATEGORIES.GAMERESULT}/${ballType}/${id}/${date}`
    }))
  }, [ballType, date])

  const dateLs = useMemo(() => {
    return Array.from(({ length: 7}), (_, key) => {
      // const { YYYYMMDD, DDMM, ddd } = dateTransformMethod(getDate(key * -1, timezone)) as any
      const { YYYYMMDD, DDMM } = fakeDateLs[key]
      return {
        id: YYYYMMDD,
        url: `/${CATEGORIES.GAMERESULT}/${ballType}/${match}/${key === 0 ? 'today' : YYYYMMDD}`,
        text: key === 0
          ? `${DDMM} 今日` //`${DDMM} ${FormatMessage({ msgCode: 'dates.today2' })}`
          : `${DDMM}`
      }
    })
  }, [ballType, match])

  const matchLsActive = useMemo(() => {
    const hasMatch = MatchArr.find(({ id }) => id === match)
    return {
      id: hasMatch ? match : '',
      text: hasMatch ? hasMatch.keyCode : '' // hasMatch ? <FormatMessage msgCode={hasMatch.keyCode} /> : ''
    }
  }, [match])

  const dateActive = useMemo(() => {
    const isToday = date === 'today'
    // const { YYYYMMDD, DDMM } = dateTransformMethod(isToday ? getDate(0, timezone) : date) as any
    const { YYYYMMDD, DDMM } = fakeDateLs[0]
    return {
      id: YYYYMMDD,
      text: isToday
        ? '今日' // `${FormatMessage({ msgCode: 'dates.today2' })}`
        : `${DDMM}`
    }
  }, [date])

  return (
    <div className={styles.container} >
      <div>
        <Unit type={SelectorConf.date} selectName={dateActive.text ?? ''}>
          <SelectOption list={dateLs} selectedId={dateActive?.id} />
        </Unit>
      </div>
      <div>
        <Unit type={SelectorConf.match} selectName={matchLsActive.text ?? ''}>
          <SelectOption list={matchLs} selectedId={matchLsActive?.id} />
        </Unit>
      </div>
      <div>
        <Unit type={SelectorConf.league} >
          <CheckOption />
        </Unit>
      </div>
    </div>
  )
}

export default Selector
