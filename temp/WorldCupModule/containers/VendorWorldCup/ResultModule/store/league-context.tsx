import React, { useState, useEffect, useCallback, useContext, useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import { TournamentObj } from '../types'

import { worldCupTid } from '@sport/components/WorldCupModule/constants'

type WorldCupLeagueContextStore = {
  ls: TournamentObj,
  filterLs: TournamentObj,
  searchText: string,
  loading: boolean,
  updateSearch: (v: string) => void,
  updateLs: (l: TournamentObj) => void,
  updateLoading: (s: boolean) => void
}

export const emptyLs: TournamentObj = {
  tid: worldCupTid,
  tnName: '',
  matches: {}
}

const isPairStringMethod = ({ str, searchStr }: { str: string, searchStr: string}) => {
  const multiPair = searchStr.split(' ').filter(s => !!s)
  return multiPair.some(s => str?.toLowerCase().includes(s.toLowerCase()))
}

const WorldCupLeagueContext = React.createContext<WorldCupLeagueContextStore>({
  ls: emptyLs,
  filterLs: emptyLs,
  searchText: '',
  loading: true,
  updateSearch: () => {},
  updateLs: () => {},
  updateLoading: () => {}
})

const WorldCupLeagueContextProvider: React.FC = (props) => {
  const [data, setData] = useState<TournamentObj>(emptyLs)
  const [searchText, setSearchText] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(true)
  const query = new URLSearchParams(useLocation().search).get('group')

  const searchHandler = useCallback((v: string) => {
    setSearchText(v)
  }, [])

  const updateLsHandler = useCallback((ls: TournamentObj) => {
    setData(ls)
  }, [])

  const updateLoadingHandler = useCallback((s: boolean) => {
    setLoading(s)
  }, [])

  const filterData = useMemo(() => {
    let returnObj
    const queryArr = query?.split(',') ?? []
    const hasSearchRequire = !!searchText
    if (queryArr.length) {
      const setQueryArr = new Set(queryArr.map(p => p))
      const hasLs = 'matches' in data
      if (hasLs) {
        const newMatches = Object.entries(data.matches ?? {}).reduce((prev, [curKey, curVal]) => {
          const isMatch = setQueryArr.has(curKey)
          return {
            ...prev,
            ...(isMatch ? { [curKey]: curVal } : {})
          }
        }, {})

        returnObj = {
          ...data,
          matches: newMatches
        }
      } else {
        returnObj = data
      }
    } else {
      returnObj = data
    }

    const returnObjHasLs = Object.keys(returnObj.matches ?? {}).length > 0

    if (returnObjHasLs && hasSearchRequire) {
      const newMatches = Object.entries(returnObj.matches).reduce((prev, [curKey, curls]) => {
        let filterMathes = curls.filter(({ homeName, awayName }) => {
          return isPairStringMethod({ str: homeName, searchStr: searchText })
            || isPairStringMethod({ str: awayName, searchStr: searchText })
        })
        return {
          ...prev,
          ...(filterMathes.length > 0 ? { [curKey]: filterMathes } : {})
        }
      }, {})

      return {
        ...returnObj,
        matches: newMatches
      }
    } else {
      return returnObj
    }
  }, [data, query, searchText])

  useEffect(() => {
    setSearchText('')
  }, [data])

  const contextValue: WorldCupLeagueContextStore = {
    ls: data,
    filterLs: filterData,
    searchText,
    loading,
    updateSearch: searchHandler,
    updateLs: updateLsHandler,
    updateLoading: updateLoadingHandler
  }

  return (
    <WorldCupLeagueContext.Provider value={contextValue}>
      {props.children}
    </WorldCupLeagueContext.Provider>
  )
}

export const useWorldCupLeagueContext = () => {
  return useContext(WorldCupLeagueContext)
}

export default WorldCupLeagueContextProvider
