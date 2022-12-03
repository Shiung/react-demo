import React, { useState, useCallback, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { SID, CATEGORIES, SPORTS } from '@sport/constants/common'
import useInternationCate from '@sportHooks/useInternationCate'
import SimpleHeader from '@sportComponents/Header/SimpleHeader'
import SimpleTable from '../common/simpleTable'

import WCButton from '@sport/components/WorldCupModule/components/WCButton'

const WorldCupSimpleInplay = () => {
  const [collapse, setCollapse] = useState(true)
  const [ftHtType, setFtHtType] = useState('ft')
  const timezone = useSelector(state => state.common.timezone)
  const language = useSelector(state => state.common.language)

  const { interCate, interCateArr, interCateHandler, isInter } = useInternationCate({ sid: SID.football, category: CATEGORIES.INPLAY })

  const ftHtTypeHandler = useCallback(() => setFtHtType(prev => (prev === 'ft' ? 'ht' : 'ft')), [])

  return (
    <React.Fragment key={`worldCup-inplay-${timezone}-${language}`}>
      <SimpleHeader
        category={CATEGORIES.INPLAY}
        ballType={SPORTS.FOOTBALL}
        disableSort
        isInter={isInter}
        interOption={{ interCate, interCateArr, interCateHandler }}
        ftHtOption={{ isLocal: true, ftHtVal: ftHtType, ftHtTypeHandler }}
        disableStoreCollapse
        wcButton={<WCButton />}
        localCollapse={{ get: collapse, set: setCollapse }}
      />
      <SimpleTable
        category={CATEGORIES.INPLAY}
        interOption={{ interCate }}
        ftHtOption={{ isLocal: true, ftHtVal: ftHtType }}
        isInter={isInter}
        hideHiger
        disableStoreCollapse
        localCollapse={collapse}
      />
    </React.Fragment>
  )
}

export default WorldCupSimpleInplay
