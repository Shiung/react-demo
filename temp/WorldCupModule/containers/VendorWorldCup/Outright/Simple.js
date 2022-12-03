import { useEffect, useCallback, useState } from 'react'
import { useDispatch } from 'react-redux'
import { SID, CATEGORIES } from '@sport/constants/common'
import SportsApi from '@sport/api/SportsApi'
import Empty from '@sportComponents/Empty'
import SimpleHeader from '@sportComponents/Header/SimpleHeader'
import Market from '@sportPages/mobile/Outright/Market'
import { getLocation } from '@sport/utils'
import types from '@sport/constants/actionTypes'
import PlaceHolder from '@sportPages/mobile/components/League/PlaceHolder'
import { useSubscribeOutright } from '@sport/hooks/useStomp'

import { worldCupOrcTid } from '@sport/components/WorldCupModule/constants'
import WCButton from '@sport/components/WorldCupModule/components/WCButton'

const emptyObj = {}

const WorldCupOutrightSimple = () => {
  const [data, setData] = useState(emptyObj)
  const [loading, setLoading] = useState(true)
  const category = CATEGORIES.OUTRIGHT
  const dispatch = useDispatch()

  const fetchData = useCallback(async () => {
    const params = {
      sid: SID.football,
      orcTid: worldCupOrcTid
    }

    const res = await new SportsApi().getSpecialOutright(params)
    setLoading(false)

    const errorHandler = e => {
      if (e.code === 0) return false
      else {
        dispatch({
          type: types.SET_ERROR_STATUS,
          payload: e
        })
        return true
      }
    }

    if (errorHandler(res)) return
    setData(res?.data?.tournament ?? emptyObj)
  }, [dispatch])

  const { data: dataUpdate } = useSubscribeOutright({ sid: SID.football, tid: worldCupOrcTid, oriData: data })

  const hasShow = Object.keys(dataUpdate).length > 0

  const path = getLocation().pathname

  useEffect(() => {
    fetchData()
    setLoading(true)
    return () => {
      setData(emptyObj)
    }
  }, [fetchData])

  useEffect(() => {
    dispatch({
      type: types.SET_PAGE_INFO,
      payload: {
        ballType: SID[1],
        category: CATEGORIES.OUTRIGHT
      }
    })
    return () => {
      dispatch({
        type: types.SET_PAGE_INFO,
        payload: {
          ballType: '',
          category: ''
        }
      })
    }
  }, [dispatch])

  useEffect(() => {
    dispatch({
      type: types.SET_PAGE_INFO,
      payload: { history: path }
    })
  }, [dispatch, path])

  return (
    <div>
      <SimpleHeader category={category} ballType={SID[1]} showOption={false} showCollapse={false} wcButton={<WCButton />} />
      {loading && <PlaceHolder />}
      {!loading && hasShow && <Market data={dataUpdate} />}
      {!loading && !hasShow && <Empty />}
    </div>
  )
}

export default WorldCupOutrightSimple
