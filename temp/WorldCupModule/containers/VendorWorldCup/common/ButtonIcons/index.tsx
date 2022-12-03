import { useState, useEffect, useCallback } from 'react'
import Lottie from '@sport/components/Lottie'
import { executePortalAction, history } from '@sport/utils'
import * as LottieData from './Lottie'
import { worldCupBallName } from '@sport/components/WorldCupModule/constants'

const LottieHome = ({ isUseDialog, callBack }: { isUseDialog?: boolean; callBack: () => void }) => {
  const [active, setAcitve] = useState<boolean>(false)

  const goMethod = useCallback(() => {
    const url = `/redirect/${worldCupBallName}`
    if (isUseDialog) {
      executePortalAction({ type: 'open-downloadApp-dialog', data: { redirect: url } })
    } else {
      history.push(url)
    }
  }, [isUseDialog])

  const clickHandler = useCallback(() => {
    setAcitve(prev => !prev)
    callBack()
    setTimeout(() => {
      setAcitve(prev => !prev)
      callBack()
      goMethod()
    }, 1000)
  }, [callBack, goMethod])

  return (
    <div onClick={clickHandler}>
      <Lottie
        isClickToPauseDisabled
        isStopped={!active}
        options={{
          autoplay: active,
          animationData: LottieData.HomeData
        }}
        width={65}
        height={65}
      />
    </div>
  )
}

const LottieSimple = ({ isActive = false }: { isActive: boolean }) => {
  const [active, setAcitve] = useState<boolean>(false)

  useEffect(() => {
    isActive && setAcitve(isActive)
  }, [isActive])

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>
    if (active) {
      timer = setTimeout(() => {
        setAcitve(false)
      }, 800)
    }
    return () => {
      clearTimeout(timer)
    }
  }, [active])

  return (
    <Lottie
      isClickToPauseDisabled
      isStopped={!active}
      options={{
        autoplay: active,
        animationData: LottieData.SimpleData
      }}
      width={50}
      height={50}
    />
  )
}

export { LottieSimple, LottieHome }
