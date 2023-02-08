import React, { useMemo, useState, useEffect, useCallback } from 'react'
import { useParams, useLocation, useHistory } from 'react-router-dom'
// import { history } from '@/utils'
import cx from 'classnames'
import { useLeagueContext } from '../../store/league-context'
import { Checkbox2A, CheckboxPersonalN } from './svgSrc'
import { BallType, MathType } from '../../types'
import { CATEGORIES } from '@/constants'
import styles from './Selector.module.scss'

type OptionList = { tid: number, tnName: string }[]

type CheckRowProps = {
  active?: boolean,
  title?: string,
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
  const [selectTid, setSelectTid] = useState<number[]>([])
  const { ballType, match, date } = useParams<{ ballType: BallType, match: MathType, date: string }>()
  const query = new URLSearchParams(useLocation().search).get('tids')
  const { ls } = useLeagueContext()
  const history = useHistory()

  const isBtnActive = useMemo(() => {
    return selectTid.length > 0
  }, [selectTid])

  const optionList = useMemo(() => {
    return ls.reduce<OptionList>((prev, current) => {
      const arr = current.tournaments.map(({ tid, tnName }) => ({ tid, tnName }))
      return prev.concat(arr)
    }, [])
  }, [ls])

  const selectAll = useMemo(() => {
    const alreadySelected = new Set(selectTid)
    return optionList.every(({ tid }) => alreadySelected.has(tid))
  }, [selectTid, optionList])

  const addSelectedHandler = useCallback((tid: number, selected: number[]) => {
    const alreadySelected = new Set(selected).has(tid)
    if (alreadySelected) return setSelectTid(prev => prev.filter(i => i !== tid))
    setSelectTid(prev => prev.concat(tid))
  }, [])

  const clickHandler = useCallback(() => {
    typeof clickCallBack === 'function' && clickCallBack()
    if (selectAll) return history.replace(`/${CATEGORIES.GAMERESULT}/${ballType}/${match}/${date}`)
    history.replace(`/${CATEGORIES.GAMERESULT}/${ballType}/${match}/${date}?tids=${selectTid.join(',')}`)
  }, [clickCallBack, selectAll, ballType, match, date, selectTid, history])

  const selectAllHandler = useCallback((status: boolean, e?: React.MouseEvent) => {
    e?.stopPropagation()
    if (status) {
      setSelectTid(optionList.map(({ tid }) => tid))
    } else {
      setSelectTid([])
    }
  }, [optionList])


  // init selected all
  useEffect(() => {
    const queryArr = query?.split(',') ?? []
    if (queryArr.length > 0) {
      setSelectTid(queryArr.map(v => Number(v)))
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
              <div onClick={selectAllHandler.bind(null, true)}>
                {/* <FormatMessage msgCode='common.selectAll' /> */}
                全選
              </div>
              <div className={styles.divider} />
              <div onClick={selectAllHandler.bind(null, false)}>
                {/* <FormatMessage msgCode='common.notSelectAll' /> */}
                反選
              </div>
            </div>
            <div className={styles.close} onClick={clickCallBack}/>
          </div>
        </CheckRow>
      </div>
      <div className={styles.content}>
        {optionList.map((o) => {
          return (
            <CheckRow
              key={`options-${o.tid}`}
              title={o.tnName}
              active={new Set(selectTid).has(o.tid)}
              clickCallBack={addSelectedHandler.bind(null, o.tid, selectTid)}
              />
          )
        })}
      </div>
      <div className={styles.footer}>
        <button
          className={cx(styles.confirm, { [styles.disable]: !isBtnActive })}
          disabled={!isBtnActive}
          onClick={clickHandler}>
          {/* <FormatMessage msgCode='common.confirm' /> */}
          確認
        </button>
      </div>
    </div>
  )
}

export default CheckOption
