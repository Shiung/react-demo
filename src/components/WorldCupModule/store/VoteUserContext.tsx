import { useContext, createContext, useState, useRef, useCallback, useEffect } from 'react'
// import { useSelector } from 'react-redux'
import { RoundConf } from '../constants' //'@sport/components/WorldCupModule/constants'

// import SportsApi from '@sport/api/SportsApi'

type VoteUserLs = Array<{
  sortId: number,
  match: Array<{
    teamId: number
    type: string
    group: RoundConf
    voted: boolean
    count: number
  }>
}>

type VoteUserContextStore = {
  voteLs: VoteUserLs
}

const EmptyVoteUserLs: VoteUserLs = []

const VoteUserContext = createContext<VoteUserContextStore>({
  voteLs: EmptyVoteUserLs
}) 

type Props = {
  type: number
}

const VoteUserContextProvider: React.FC<Props> = ({ type, children }) => {
  // const token = useSelector<any, string>(store => store.user.info.token)
  const token = null
  const [voteLs, setVoteLs] = useState<VoteUserLs>(EmptyVoteUserLs)
  const isDestory = useRef<boolean>(false)

  const fetchData = useCallback(async () => {
    if (!token) return
    // const res = await new SportsApi(token).getWorldCupVoteUser({ type })
    // if (isDestory.current) return
    // if (res.code === 0) {
    //   setVoteLs(res.data?.vote ?? EmptyVoteUserLs)
    // }
    console.log('type', type)
  }, [token, type])

  useEffect(() => {
    isDestory.current = false
    fetchData()
    return () => {
      isDestory.current = true
    }
  }, [fetchData])

  const contextVal = {
    voteLs
  }

  return (
    <VoteUserContext.Provider value={contextVal}>
      {children}
    </VoteUserContext.Provider>
  )
}

export const useVoteUserContext = () => {
  return useContext(VoteUserContext)
}

export default VoteUserContextProvider
