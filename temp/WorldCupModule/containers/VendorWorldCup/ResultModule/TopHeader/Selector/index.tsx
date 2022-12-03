import React, { useMemo } from 'react'
import moment from 'moment'
import { useParams } from 'react-router-dom'
import { SelectorConf, MatchArr } from '@sport/components/ResultModule/constants'
import type { MathType } from '@sport/components/ResultModule/types'
import { dateTransformMethod } from '@sport/utils/dateTransform'
import SelectOption from '@sport/components/ResultModule/TopHeader/Selector/SelectOption'
import CheckOption from './CheckOption'
import FormatMessage from '@sport/components/FormatMessage'
import { CATEGORIES } from '@sport/constants/common'
import Unit from '@sport/components/ResultModule/TopHeader/Selector/unit'
import styles from '@sport/components/ResultModule/TopHeader/Selector/Selector.module.scss'

import { worldCupBallName } from '@sport/components/WorldCupModule/constants'

const Selector: React.FC = () => {
  const { match, date } = useParams<{ match: MathType, date: string }>()

  const matchLs = useMemo(() => {
    return MatchArr.map(({ id, keyCode }) => ({
      id,
      text: <FormatMessage msgCode={keyCode} />,
      url: `/${CATEGORIES.GAMERESULT}/${worldCupBallName}/${id}/${date}`
    }))
  }, [date])

  const dateLs = useMemo(() => {
    return Array.from({ length: 7 }, (_, key) => {
      const { YYYYMMDD, DDMM, ddd } = dateTransformMethod(moment().add(key * -1, 'days'), true) as any
      return {
        id: YYYYMMDD,
        url: `/${CATEGORIES.GAMERESULT}/${worldCupBallName}/${match}/${key === 0 ? 'today' : YYYYMMDD}`,
        text: key === 0 ? `${DDMM} ${FormatMessage({ msgCode: 'dates.today2' })}` : `${DDMM} ${ddd}`
      }
    })
  }, [match])

  const matchLsActive = useMemo(() => {
    const hasMatch = MatchArr.find(({ id }) => id === match)
    return {
      id: hasMatch ? match : '',
      text: hasMatch ? <FormatMessage msgCode={hasMatch.keyCode} /> : ''
    }
  }, [match])

  const dateActive = useMemo(() => {
    const isToday = date === 'today'
    const { YYYYMMDD, DDMM } = isToday 
      ? dateTransformMethod(moment(), true) as any 
      : dateTransformMethod(date) as any
    return {
      id: YYYYMMDD,
      text: isToday ? `${FormatMessage({ msgCode: 'dates.today2' })}` : `${DDMM}`
    }
  }, [date])

  return (
    <div className={styles.container}>
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
        <Unit type={SelectorConf.league}>
          <CheckOption />
        </Unit>
      </div>
    </div>
  )
}

export default Selector
