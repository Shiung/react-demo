import React, { useRef, useState, useCallback, useEffect } from 'react'
import styles from './Layout.module.scss'

import { history } from '@sport/utils'
import FormatMessage from "@sport/components/FormatMessage"
import { ArrowLeft } from '@sportIcons/index'
import LoginHeader from '@sport/components/LoginHeader'
import Banner, * as BannerParts from '@sport/components/WorldCupModule/components/Banner'
import Footer from '@sport/components/WorldCupModule/components/Footer'

import { useWorldCupContext } from '@sport/components/WorldCupModule/store/WorldCupContext'
import { groupGameStartTime } from '@sport/components/WorldCupModule/constants'

import { ReactComponent as GoTop } from '@sport/components/WorldCupModule/svg/go_top.svg'

import { useScrollGoTop } from './hooks'

const HeaderNormal = () => {
  const { servertimeDiff } = useWorldCupContext()
  const [isCountDown, setIsCountDown] = useState<boolean>(true)
  const closeCountDownCallBack = useCallback(() => setIsCountDown(false),[])

  useEffect(() => {
    if (groupGameStartTime < (new Date().getTime() + servertimeDiff)) {
      closeCountDownCallBack()
    }
  }, [servertimeDiff, closeCountDownCallBack])
  return (
    <>
      <LoginHeader />
      <Banner>
        {isCountDown ? <BannerParts.CountDown callBack={closeCountDownCallBack} /> : <BannerParts.ShowGame />}
      </Banner>
    </>
  )
}

const HeaderBack = () => {
  return (
    <div className={styles.voteHeader}>
      <div className={styles.back} onClick={history.goBack}>
        <ArrowLeft width='20px' height='20px'/>
      </div>
      <FormatMessage msgCode='worldCup.vote.title' />
    </div>
  )
}

type Props = {
  MainNav?: React.ReactNode
  isVotePage: boolean
}

const Main: React.FC<Props> = ({
  MainNav,
  isVotePage,
  children
}) => {
  const BoxRef = useRef<HTMLDivElement>(null)
  const { show, clickHandler } = useScrollGoTop(BoxRef)

  return (
    <div className={styles.main}>
      {!isVotePage && <HeaderNormal />}
      {isVotePage && <HeaderBack />}
      <div className={styles.box} ref={BoxRef}>
        {!isVotePage && React.isValidElement(MainNav) && MainNav}
        {children}
      </div>
      {show && (<div className={styles.goTop} onClick={clickHandler}><GoTop /></div>)}
      <Footer />
    </div>
  )
}

export default Main
