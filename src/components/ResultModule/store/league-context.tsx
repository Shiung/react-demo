import React, { useState, useEffect, useCallback, useContext, useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import { CategoriesObj, TournamentObj } from '../types'

type LeagueContextStore = {
  ls: CategoriesObj[],
  filterLs: CategoriesObj[],
  searchText: string,
  loading: boolean,
  updateSearch: (v: string) => void,
  updateLs: (l: CategoriesObj[]) => void,
  updateLoading: (s: boolean) => void
}

export const emptyLs: CategoriesObj[] = []

const isPairStringMethod = ({ str, searchStr }: { str: string, searchStr: string}) => {
  const multiPair = searchStr.split(' ').filter(s => !!s)
  return multiPair.some(s => str?.toLowerCase().includes(s.toLowerCase()))
}

const LeagueContext = React.createContext<LeagueContextStore>({
  ls: emptyLs,
  filterLs: emptyLs,
  searchText: '',
  loading: true,
  updateSearch: () => {},
  updateLs: () => {},
  updateLoading: () => {}
})

const LeagueContextProvider: React.FC = (props) => {
  const [data, setData] = useState<CategoriesObj[]>(emptyLs)
  const [searchText, setSearchText] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(true)
  const query = new URLSearchParams(useLocation().search).get('tids')

  const searchHandler = useCallback((v: string) => {
    setSearchText(v)
  }, [])

  const updateLsHandler = useCallback((ls: CategoriesObj[]) => {
    setData(ls)
  }, [])

  const updateLoadingHandler = useCallback((s: boolean) => {
    setLoading(s)
  }, [])

  const filterData = useMemo(() => {
    let returnLS
    const queryArr = query?.split(',') ?? []
    const hasSearchRequire = !!searchText
    if (queryArr.length) {
      const setQueryArr = new Set(queryArr.map(p => Number(p)))
      returnLS = data.reduce<CategoriesObj[]>((prev, current) => {
        const { tournaments } = current
        const newTournaments = tournaments.filter(({ tid }) => setQueryArr.has(tid))
        return newTournaments.length > 0
          ? prev.concat({ ...current, tournaments: newTournaments })
          : prev
      }, [])
    } else {
      returnLS = data
    }

    return !hasSearchRequire
      ? returnLS
      : returnLS.reduce<CategoriesObj[]>((prev, current) => {
        const { tournaments, catName } = current
        if (isPairStringMethod({ str: catName, searchStr: searchText })) return prev.concat(current)

        let newTournaments: TournamentObj[] = []

        for (const tournament of tournaments) {
          if (isPairStringMethod({ str: tournament.tnName, searchStr: searchText })) {
            newTournaments.push(tournament)
            continue
          }
          const { matches = [] } = tournament
          const filterCompetitor = matches.filter(({ homeName, awayName }) => {
            return isPairStringMethod({ str: homeName, searchStr: searchText }) ||
              isPairStringMethod({ str: awayName, searchStr: searchText })
          })

          if (filterCompetitor.length === 0) continue

          newTournaments.push({
            ...tournament,
            matches: filterCompetitor
          })
        }


        return newTournaments.length > 0
          ? prev.concat({ ...current, tournaments: newTournaments })
          : prev
      }, [])
  }, [data, query, searchText])

  useEffect(() => {
    setSearchText('')
  }, [data])

  const contextValue: LeagueContextStore = {
    ls: data,
    filterLs: filterData,
    searchText,
    loading,
    updateSearch: searchHandler,
    updateLs: updateLsHandler,
    updateLoading: updateLoadingHandler
  }

  return (
    <LeagueContext.Provider value={contextValue}>
      {props.children}
    </LeagueContext.Provider>
  )
}

export const useLeagueContext = () => {
  return useContext(LeagueContext)
}

export default LeagueContextProvider
