import { memo, useMemo, useCallback } from 'react'
import cx from 'classnames'
import styles from './Chart.module.scss'

import * as Flag  from '@sport/components/WorldCupModule/components/Flag'
import { BadgeType } from '@sport/components/WorldCupModule/utils'
import { dateTransformMethod } from '@sport/utils/dateTransform'

import { useChartContext } from './store/ChartContext'
import { SquareType } from './constants'
import { StatesConst } from '@sport/components/WorldCupModule/constants'
import type { GameInfo } from '@sport/components/WorldCupModule/types'
import { useParseScore } from '@sport/components/WorldCupModule/components/GameCard/Content/hooks'

import FormatMessage from '@/sports/components/FormatMessage'

enum SquareLineType {
  AtoB = 'AtoB',
  AtoC = 'AtoC',
  AtoD = 'AtoD',
  BtoC = 'BtoC',
  BtoD = 'BtoD',
  CtoD = 'CtoD'
}

const States = memo<{
  data: GameInfo,
  isReverse: boolean
  type: SquareLineType
}>(({ data, type, isReverse }) => {
  const { statePhase, kickOffTime, scoreList } = data
  const { cusDDMM, HHmm } = useMemo(() => dateTransformMethod(kickOffTime, true) as any, [kickOffTime])
  const { total } = useParseScore({ isShowScore: statePhase === StatesConst.CLOSED, scoreList }) || { total: [] }
  const [hScore = '-', aScore = '-'] = total
  return (
    <>
      {statePhase === StatesConst.INPLAY && <div className={styles.live}>LIVE</div>}
      {statePhase === StatesConst.CLOSED && (
        <div className={cx(styles.ended, {
          [styles.horizontal]: [SquareLineType.AtoB, SquareLineType.CtoD].some(t => t === type),
          [styles['horizontal__top']]: SquareLineType.AtoB === type,
          [styles['horizontal__bottom']]: SquareLineType.CtoD === type,

          [styles.vertical]: [SquareLineType.AtoC, SquareLineType.BtoD].some(t => t === type),
          [styles['vertical__left']]: SquareLineType.AtoC === type,
          [styles['vertical__right']]: SquareLineType.BtoD === type,

          [styles.diagonal]: [SquareLineType.AtoD, SquareLineType.BtoC].some(t => t === type)
        })}>
          <div>{!isReverse ? hScore: aScore}</div>
          <div>:</div>
          <div>{!isReverse ? aScore: hScore}</div>
        </div>
      )}
      {statePhase === StatesConst.NON_START && (
        <div className={cx(styles.notStart, {
          [styles.horizontal]: [SquareLineType.AtoB, SquareLineType.CtoD].some(t => t === type),
          [styles['horizontal__top']]: SquareLineType.AtoB === type,
          [styles['horizontal__bottom']]: SquareLineType.CtoD === type,

          [styles.vertical]: [SquareLineType.AtoC, SquareLineType.BtoD].some(t => t === type),
          [styles['vertical__left']]: SquareLineType.AtoC === type,
          [styles['vertical__right']]: SquareLineType.BtoD === type,

          [styles.diagonal]: [SquareLineType.AtoD, SquareLineType.BtoC].some(t => t === type)
        })}>
          <div>{cusDDMM}</div>
          <div>{HHmm}</div>
        </div>
      )}
    </>
  )
})

const Square = ({ groupActive }: { groupActive: boolean }) => {
  const { AID, BID, CID, DID, dataList, selectSquare, promotion, selectHandler } = useChartContext()

  const clickHandler = useCallback((v: SquareType) => {
    // if (!groupActive) return
    selectHandler(v)
  }, [selectHandler])

  // useEffect(() => {
  //   groupActive && selectHandler(SquareType.A)
  // }, [groupActive, selectHandler])

  return (
    <div className={styles.square}>
      <div className={cx(styles.A)} onClick={clickHandler.bind(null, SquareType.A)}>
        <Flag.Circle
          width={48}
          id={AID}
          type={BadgeType.flag}
          isActive={selectSquare === SquareType.A && groupActive} />
        <div className={styles.name}>
          <FormatMessage msgCode={`wcteam_${AID}`} />
        </div>
        {!!promotion.A && <div className={styles.promotion}>{promotion.A}</div>}
      </div>
      <div className={cx(styles.B)} onClick={clickHandler.bind(null, SquareType.B)}>
        <Flag.Circle
          width={48}
          id={BID}
          type={BadgeType.flag}
          isActive={selectSquare === SquareType.B && groupActive} />
        <div className={styles.name}>
          <FormatMessage msgCode={`wcteam_${BID}`} />
        </div>
        {!!promotion.B && <div className={styles.promotion}>{promotion.B}</div>}
      </div>
      <div className={cx(styles.C)} onClick={clickHandler.bind(null, SquareType.C)}>
        <Flag.Circle
          width={48}
          id={CID}
          type={BadgeType.flag}
          isActive={selectSquare === SquareType.C && groupActive} />
        <div className={styles.name}>
          <FormatMessage msgCode={`wcteam_${CID}`} />
        </div>
        {!!promotion.C && <div className={styles.promotion}>{promotion.C}</div>}
      </div>
      <div className={cx(styles.D)} onClick={clickHandler.bind(null, SquareType.D)}>
        <Flag.Circle
          width={48}
          id={DID}
          type={BadgeType.flag}
          isActive={selectSquare === SquareType.D && groupActive} />
        <div className={styles.name}>
          <FormatMessage msgCode={`wcteam_${DID}`} />
        </div>
        {!!promotion.D && <div className={styles.promotion}>{promotion.D}</div>}
      </div>

      <div className={cx(styles.line, styles.AtoB, {
          [styles.active]: groupActive
            ? [SquareType.A, SquareType.B].some(v => v === selectSquare)
            : dataList?.AtoB?.data?.statePhase === StatesConst.INPLAY
        })}>
        {dataList?.AtoB?.data && 
          <States
            data={dataList.AtoB.data}
            type={SquareLineType.AtoB}
            isReverse={dataList.AtoB.isReverse} />}
      </div>
      <div className={cx(styles.line, styles.AtoC, {
          [styles.active]: groupActive
            ? [SquareType.A, SquareType.C].some(v => v === selectSquare)
            : dataList?.AtoC?.data?.statePhase === StatesConst.INPLAY
        })}>
        {dataList?.AtoC?.data && 
          <States
            data={dataList.AtoC.data}
            type={SquareLineType.AtoC}
            isReverse={dataList.AtoC.isReverse} />}
      </div>
      <div className={cx(styles.line, styles.AtoD, {
          [styles.active]: groupActive
            ? [SquareType.A, SquareType.D].some(v => v === selectSquare)
            : dataList?.AtoD?.data?.statePhase === StatesConst.INPLAY
        })}>
        {dataList?.AtoD?.data && 
          <States
            data={dataList.AtoD.data}
            type={SquareLineType.AtoD}
            isReverse={dataList.AtoD.isReverse} />}
      </div>
      <div className={cx(styles.line, styles.BtoC, {
          [styles.active]: groupActive
            ? [SquareType.B, SquareType.C].some(v => v === selectSquare)
            : dataList?.BtoC?.data?.statePhase === StatesConst.INPLAY
        })}>
        {dataList?.BtoC?.data && 
          <States
            data={dataList.BtoC.data}
            type={SquareLineType.BtoC}
            isReverse={dataList.BtoC.isReverse} />}
      </div>
      <div className={cx(styles.line, styles.BtoD, {
          [styles.active]: groupActive
            ? [SquareType.B, SquareType.D].some(v => v === selectSquare)
            : dataList?.BtoD?.data?.statePhase === StatesConst.INPLAY
        })}>
        {dataList?.BtoD?.data && 
          <States
            data={dataList.BtoD.data}
            type={SquareLineType.BtoD}
            isReverse={dataList.BtoD.isReverse} />}
      </div>
      <div className={cx(styles.line, styles.CtoD, {
          [styles.active]: groupActive
            ? [SquareType.C, SquareType.D].some(v => v === selectSquare)
            : dataList?.CtoD?.data?.statePhase === StatesConst.INPLAY
        })}>
        {dataList?.CtoD?.data && 
          <States
            data={dataList.CtoD.data}
            type={SquareLineType.CtoD}
            isReverse={dataList.CtoD.isReverse} />}
      </div>
    </div>
  )
}

export default Square
