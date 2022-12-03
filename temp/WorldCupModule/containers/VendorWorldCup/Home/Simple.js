import React, { useState, useCallback } from 'react'
import { history } from '@sport/utils'
import { useSelector } from 'react-redux'
import useInternationCate from '@sportHooks/useInternationCate'
import FormatMessage from '@sport/components/FormatMessage'

import { SID, CATEGORIES, SPORTS } from '@sport/constants/common'
import SimpleHeader from '@sportComponents/Header/SimpleHeader'
import SimpleTable from '../common/simpleTable'

import { worldCupBallName } from '@sport/components/WorldCupModule/constants'

import { ArrowRightSmall } from '@sportPages/mobile/Home/Simple/icons'
import styles from '@sportPages/mobile/Home/Simple/simpleHome.module.scss'

const HomeSimple = React.memo(({ sportType, data, idx = 0 }) => {
  const [collapse, setCollapse] = useState(true)
  const [ftHtType, setFtHtType] = useState('ft')
  const worldCupMenu = useSelector(store => store.sports.worldCupMenu)

  const { interCate, interCateArr, interCateHandler, isInter } = useInternationCate({ sid: SID.football, category: CATEGORIES.TODAY })
  const pushHandler = useCallback(() => {
    const {
      today: { total: tc = 0 },
      prematch: { total: pc = 0 }
    } = worldCupMenu || {}
    if (tc !== 0) return history.push(`/${CATEGORIES.TODAY}/${worldCupBallName}`)
    if (pc !== 0) return history.push(`/${CATEGORIES.EARLY}/${worldCupBallName}/interval/next`)
    return history.push(`/${CATEGORIES.OUTRIGHT}/${worldCupBallName}`)
  }, [sportType, worldCupMenu])

  const ftHtTypeHandler = useCallback(() => setFtHtType(prev => (prev === 'ft' ? 'ht' : 'ft')), [])

  return (
    <>
      <SimpleHeader
        ballType={SPORTS.FOOTBALL}
        disableSort
        isInter={isInter}
        interOption={{ interCate, interCateArr, interCateHandler }}
        ftHtOption={{ isLocal: true, ftHtVal: ftHtType, ftHtTypeHandler }}
        disableStoreCollapse
        localCollapse={{ get: collapse, set: setCollapse }}
        label={<FormatMessage msgCode='worldCup' />}
        disableTopRadius={idx !== 0}
      />
      <SimpleTable
        category={CATEGORIES.HOME}
        renderData={data}
        interOption={{ interCate }}
        ftHtOption={{ isLocal: true, ftHtVal: ftHtType }}
        isInter={isInter}
        hideHiger
        disableStoreCollapse
        localCollapse={collapse}
      />
      <div className={styles.more}>
        <div className={styles.btn} onClick={pushHandler}>
          <FormatMessage msgCode='moreSportsCategoryMatches' values={{ ballType: FormatMessage({ msgCode: `worldCup` }) }} />
          <ArrowRightSmall width='16px' height='16px' />
        </div>
      </div>
    </>
  )
})

export default HomeSimple
