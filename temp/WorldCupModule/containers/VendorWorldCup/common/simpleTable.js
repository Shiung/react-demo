import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useGetDefaultWorldCup } from '../hooks/useStomp'
import Empty from '@sportComponents/Empty'
import { SID, CATEGORIES } from '@sport/constants/common'
import { history, getSessionStorage, setSessionStorage } from '@sport/utils'
import HeaderContent from '@sportComponents/Header/HeaderContent'
import SimpleMarketList from '@sportComponents/SimpleMarketList/wap'
import { getMatchKickoff } from '@sportPages/hooks/common'
import { getCategory } from '@sportPages/mobile/components/common/gameInfo'
import MarketPlaceholder, { rowTypeHandler } from '@sportComponents/SimpleMarketList/MarketPlaceholder'

import * as WorldCup from '@sport/components/WorldCupModule/components/WorldCup'

const collapseInitOpen = 30

const handleDetail = ({ category, iid, tid, vd, interval, handleClickGame, quickStatus, goReplace, interCate }) => {
  const location = {
    pathname: `/${category}/${SID[1]}/match/${iid}/${vd || null}`,
    state: { interval }
  }

  if (document.documentElement && document.documentElement.scrollTop) document.documentElement.scrollTop = 0
  else document.body.scrollTop = 0

  if (handleClickGame) handleClickGame()

  if (quickStatus.isQuick || goReplace) {
    history.replace(location)
  } else {
    history.push(location)
  }

  if (
    !quickStatus.isQuick &&
    [CATEGORIES.INPLAY, CATEGORIES.TODAY, CATEGORIES.EARLY, CATEGORIES.INCOMING, CATEGORIES.PARLAY].some(key => key === category)
  ) {
    setTimeout(() => {
      setSessionStorage('simpleHistory', {
        sid: SID.FOOTBALL,
        category,
        iid,
        tid,
        interCate
      })
    }, 0)
  }
}

const Table = ({
  category,
  interval,
  quickStatus,
  handleClickGame,
  localCollapseStatus,
  hideHiger,
  isInter,
  interOption,
  ftHtOption,
  goReplace,
  disableCollapse,
  renderData,
  detailTid,
  roundGroup
}) => {
  const { group } = useParams()
  const [data, setData] = useState()

  const backHistory = getSessionStorage('simpleHistory')
  const hasBackViewSideRequest =
    backHistory && backHistory.sid === SID.FOOTBALL && (backHistory.category === category || category === CATEGORIES.HOME)

  const scrollToIID = !!hasBackViewSideRequest && backHistory.iid

  const { loading } = useGetDefaultWorldCup({ category, interval, setData, isDetail: quickStatus.isQuick, group, roundGroup })

  useEffect(() => {
    if (renderData) setData(renderData)
  }, [renderData])

  useEffect(() => {
    return () => {
      setData()
    }
  }, [category, interval])

  if (loading) return <MarketPlaceholder rowType={rowTypeHandler({ sid: SID.FOOTBALL, isInter, isQuick: quickStatus?.isQuick })} />
  if (!data || data.length <= 0) return <Empty />

  let count = 0

  return data.map((league, index) => {
    const countCollapse = count < collapseInitOpen
    const defaultCollapse = hasBackViewSideRequest && backHistory.tid === league.tid ? true : countCollapse
    count += league.count
    return (
      <HeaderContent
        key={`header-content-${league.tid}-${getMatchKickoff(league)}`}
        title={league.type ? <WorldCup.RoundGroupName roundGroup={league.type} /> : league.name}
        index={index}
        gameNum={league.count}
        sportType={league.sid}
        isInplay={category === CATEGORIES.INPLAY ?? false}
        isMarketTitle
        expand={defaultCollapse}
        fixInitExpand
        disableCollapse={disableCollapse}
        quickStatus={quickStatus}
        localCollapseStatus={localCollapseStatus}
        isInter={isInter}
        interCate={interOption.interCate ?? 0}
        ftHtOption={ftHtOption}
        category={category}
      >
        {league.matches.map(item => {
          const useNewCat =
            category === CATEGORIES.FAVORITE || category === CATEGORIES.HOME || quickStatus?.isQuick || category === CATEGORIES.PARLAY

          const cat = useNewCat ? getCategory(item) : category
          return (
            <SimpleMarketList
              key={`simple-header-${league.tnCn}-${item.iid}`}
              data={{ ...item, tnName: league.name }}
              click={() =>
                handleDetail({
                  category: cat,
                  tid: league.tid,
                  iid: item.iid,
                  vd: item.vd,
                  handleClickGame,
                  quickStatus,
                  goReplace,
                  interCate: interOption?.interCate ?? 0
                })
              }
              quickStatus={quickStatus}
              isInter={isInter}
              category={cat}
              interCate={interOption.interCate ?? 0}
              interval={interval}
              ftHtOption={ftHtOption}
              {...(hasBackViewSideRequest && { scrollToIID })}
              {...(hideHiger && { hideHiger: true })}
            />
          )
        })}
      </HeaderContent>
    )
  })
}

const SimpleTable = React.memo(props => {
  const {
    renderData,
    category,
    ballType,
    current,
    handleClickGame,
    isQuick = false, // 快選賽事(wap 總盤)
    quickMarket = 'ah', // 快選賽事(wap 總盤) 盤口
    disableCollapse = false, // 關閉收合功能
    goReplace = false, // replace history to go detail
    // loacal collapse use -----
    disableStoreCollapse = false,
    localCollapse = true,
    // loacal collapse use -----
    isInter = false, // 亞洲版 / 國際版
    interOption = {},
    ftHtOption = {},
    hideHiger = false,
    interval,
    detailTid,
    roundGroup
  } = props

  return (
    <Table
      renderData={renderData}
      category={category}
      interval={interval}
      current={current}
      quickStatus={{ isQuick, quickMarket }} // 快選賽事
      handleClickGame={handleClickGame}
      isInter={isInter} // 國際版
      interOption={interOption} // 國際版
      ftHtOption={ftHtOption} // 亞洲版全場半場切換
      localCollapseStatus={{ disableStoreCollapse, localCollapse }} // local 收合功能
      disableCollapse={disableCollapse}
      goReplace={goReplace}
      hideHiger={hideHiger}
      {...(roundGroup && { roundGroup })}
      {...(detailTid && { detailTid })}
    />
  )
})

SimpleTable.displayName = 'SimpleTable'

export default SimpleTable
