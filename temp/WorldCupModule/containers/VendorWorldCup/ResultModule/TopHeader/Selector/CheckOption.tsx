import React, { useMemo, useState, useEffect, useCallback } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import cx from 'classnames'
import { useWorldCupLeagueContext } from '../../store/league-context'
import { Checkbox2A, CheckboxPersonalN } from '@sportPages/mobile/components/League/icons'
import { history } from '@sport/utils'
import FormatMessage from '@sport/components/FormatMessage'
import { CATEGORIES } from '@sport/constants/common'
import styles from '@sport/components/ResultModule/TopHeader/Selector/Selector.module.scss'
import type { MathType } from '@sport/components/ResultModule/types'

import * as WorldCup from '@sport/components/WorldCupModule/components/WorldCup'
import { worldCupBallName, RoundConf } from '@sport/components/WorldCupModule/constants'

type CheckRowProps = {
  active?: boolean,
  title?: React.ReactNode,
  clickCallBack?: () => void
}

const CheckRow:React.FC<CheckRowProps> = ({ active = false, title, clickCallBack, children }) => {
  const clickHandler = useCallback((e: React.MouseEvent) => {
    e.stopPropagation()
    typeof clickCallBack === 'function' && clickCallBack()
  }, [clickCallBack])
  return (
    <div className={styles.row} onClick={e => clickHandler(e)}>
      <div className={cx(styles.checkBox, { [styles.active]: active })}>
        {active
          ? <Checkbox2A width='24px' height='24px' />
          : <CheckboxPersonalN width='24px' height='24px' />
        }
      </div>
      {
        children && React.isValidElement(children)
          ? children
          : <div className={styles.title}>{title}</div>
      }
    </div>
  )
}

const CheckOption = ({ clickCallBack }: { clickCallBack?: () => void }) => {
  const [selectTid, setSelectTid] = useState<string[]>([])
  const { match, date } = useParams<{ match: MathType, date: string }>()
  const query = new URLSearchParams(useLocation().search).get('group')
  const { ls } = useWorldCupLeagueContext()

  const isBtnActive = useMemo(() => {
    return selectTid.length > 0
  }, [selectTid])

  const optionList = useMemo(() => {
    return Object.keys(ls.matches ?? {}).map((key) => key) 
  }, [ls])

  const selectAll = useMemo(() => {
    const alreadySelected = new Set(selectTid)
    return optionList.every((key) => alreadySelected.has(key))
  }, [selectTid, optionList])

  const addSelectedHandler = useCallback((round: string, selected: string[]) => {
    const alreadySelected = new Set(selected).has(round)
    if (alreadySelected) return setSelectTid(prev => prev.filter(i => i !== round))
    setSelectTid(prev => prev.concat(round))
  }, [])

  const clickHandler = useCallback(() => {
    typeof clickCallBack === 'function' && clickCallBack()
    if (selectAll) return history.replace(`/${CATEGORIES.GAMERESULT}/${worldCupBallName}/${match}/${date}`)
    history.replace(`/${CATEGORIES.GAMERESULT}/${worldCupBallName}/${match}/${date}?group=${selectTid.join(',')}`)
  }, [clickCallBack, match, selectAll, date, selectTid])

  const selectAllHandler = useCallback((status: boolean, e?: React.MouseEvent) => {
    e?.stopPropagation()
    if (status) {
      setSelectTid(optionList.map((round) => round))
    } else {
      setSelectTid([])
    }
  }, [optionList])


  // init selected all
  useEffect(() => {
    const queryArr = query?.split(',') ?? []
    if (queryArr.length > 0) {
      setSelectTid(queryArr.map(v => v))
    } else {
      selectAllHandler(true)
    }
  }, [selectAllHandler, query])

  return (
    <div className={styles.checkList}>
      <div className={styles.header}>
        <CheckRow active={selectAll} clickCallBack={selectAllHandler.bind(null, !selectAll)}>
          <div className={styles.checkHeader}>
            <div className={styles.checkAllBox}>
              <div onClick={selectAllHandler.bind(null, true)}><FormatMessage msgCode='common.selectAll' /></div>
              <div className={styles.divider} />
              <div onClick={selectAllHandler.bind(null, false)}><FormatMessage msgCode='common.notSelectAll' /></div>
            </div>
            <div className={styles.close} onClick={clickCallBack}/>
          </div>
        </CheckRow>
      </div>
      <div className={styles.content}>
        {optionList.map((o) => {
          return (
            <CheckRow
              key={`options-${o}`}
              title={<WorldCup.RoundGroupName roundGroup={o as RoundConf} />}
              active={new Set(selectTid).has(o)}
              clickCallBack={addSelectedHandler.bind(null, o, selectTid)}
              />
          )
        })}
      </div>
      <div className={styles.footer}>
        <button
          className={cx(styles.confirm, { [styles.disable]: !isBtnActive })}
          disabled={!isBtnActive}
          onClick={clickHandler}>
          <FormatMessage msgCode='common.confirm' />
        </button>
      </div>
    </div>
  )
}

export default CheckOption
