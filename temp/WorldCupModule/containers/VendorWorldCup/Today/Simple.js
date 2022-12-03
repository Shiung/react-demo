import React, { useContext, useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { SID, CATEGORIES } from '@sport/constants/common'
import SimpleHeader from '@sportComponents/Header/SimpleHeader'
import SimpleTable from '../common/simpleTable'
import useInternationCate from '@sportHooks/useInternationCate'
import { SelectorContext } from '../common/League/store/selector-context'

import WCButton from '@sport/components/WorldCupModule/components/WCButton'

const WorldCupSimpleToday = () => {
  const { items, addItem } = useContext(SelectorContext)
  const { group } = useParams()
  const [collapse, setCollapse] = useState(true)
  const [ftHtType, setFtHtType] = useState('ft')
  const timezone = useSelector(state => state.common.timezone)
  const language = useSelector(state => state.common.language)

  const { interCate, interCateArr, interCateHandler, isInter } = useInternationCate({ sid: SID.football, category: CATEGORIES.TODAY })

  const ftHtTypeHandler = useCallback(() => setFtHtType(prev => (prev === 'ft' ? 'ht' : 'ft')), [])

  useEffect(() => {
    if (items.length === 0) {
      group.split(',').forEach(g => addItem(g))
    }
  }, [items, group, addItem])

  return (
    <React.Fragment key={`worldCup-today-${timezone}-${language}`}>
      <SimpleHeader
        showGoback
        category={CATEGORIES.TODAY}
        ballType={SID[1]}
        disableSort
        isInter={isInter}
        interOption={{ interCate, interCateArr, interCateHandler }}
        ftHtOption={{ isLocal: true, ftHtVal: ftHtType, ftHtTypeHandler }}
        disableStoreCollapse
        wcButton={<WCButton />}
        localCollapse={{ get: collapse, set: setCollapse }}
      />
      <SimpleTable
        category={CATEGORIES.TODAY}
        interval={CATEGORIES.TODAY}
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

export default WorldCupSimpleToday
