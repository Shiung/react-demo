import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import cx from 'classnames'
import { STREAM, STREAM_STATUS } from '@sport/constants/common'
import LiveH5, { H5_MODEL } from './LiveH5'
import LiveReal from '@sportComponents/Live/common/LiveReal'
import ErroPage from './ErrorPage'
import { reactPlayerEnable } from '@sport/utils'
import Loading from '@sport/components/Loading'
import useRect from '@sportPages/mobile/components/DetailMarket/DetailHeader/hook/useRect'
import { Live3D2, LiveLine } from '@sportIcons/index'
import style from './Stream.module.scss'

const StreamContainer = React.memo(() => {
  const liveSport = useSelector(state => state.common.liveSport)
  const { liveUrl, streaming } = useSelector(state => state.sports.live)
  const [videoType, setVideoType] = useState(STREAM.CODE_NONE)
  const [isLoading, setIsLoading] = useState(true)
  const [isTimeout, setIsTimeout] = useState(false)
  const [isOptionShow, setIsOptionShow] = useState(true)
  const [liveRealStatus, setLiveRealStatus] = useState(STREAM_STATUS.NONE)
  const [liveH5Status, setLiveH5Status] = useState(STREAM_STATUS.NONE)
  const [showError, setShowError] = useState(false)
  const [isHiddenClass, setIsHiddenClass] = useState('')
  const online = window.navigator.onLine
  const containerRef = useRef(null)
  const timer = useRef(null)
  const { height } = useRect(containerRef)

  const handleVideoType = type => setVideoType(type)
  const handleShowIcon = () => setIsOptionShow(true)
  const setIsLoadingFunc = useCallback(status => {
    setIsLoading(status)
  }, [])

  const reload = () => {
    if (liveRealStatus) setLiveRealStatus(STREAM_STATUS.NONE)
    if (liveH5Status) setLiveH5Status(STREAM_STATUS.NONE)
    setIsTimeout(false)
    setShowError(false)
  }

  const handleStreamStatus = useCallback(({ type, status }) => {
    setIsLoading(false)
    setIsTimeout(false)
    return type === STREAM.TYPE_LIVE ? setLiveRealStatus(status) : setLiveH5Status(status)
  }, [])

  useEffect(() => {
    if (!online) {
      handleStreamStatus({ type: videoType, status: STREAM_STATUS.ERROR })
    }
  }, [online, handleStreamStatus, videoType])

  useEffect(() => {
    setShowError((videoType === STREAM.TYPE_LIVE && liveRealStatus) || (videoType === STREAM.TYPE_H5 && liveH5Status) || isTimeout)
  }, [liveRealStatus, liveH5Status, videoType, isTimeout])

  useEffect(() => {
    setIsHiddenClass(isOptionShow ? style['fade-in'] : style['fade-out'])
  }, [isOptionShow])

  useEffect(() => {
    if (isLoading) {
      timer.current = setTimeout(() => {
        setIsTimeout(true)
        setIsLoading(false)
      }, STREAM.DEFAULT_TIMEOUT)
    } else clearTimeout(timer.current)
  }, [isLoading])

  useEffect(() => {
    if (liveRealStatus && liveH5Status) setIsOptionShow(false)
  }, [liveRealStatus, liveH5Status])

  useEffect(() => {
    let timerId
    if (isOptionShow) {
      timerId = setTimeout(() => {
        setIsOptionShow(false)
      }, STREAM.FADE_EFFECT)
    }

    return () => {
      // if unmounted component but timer not done
      clearTimeout(timerId)
    }
  }, [isOptionShow])

  useEffect(() => {
    setIsTimeout(false)
  }, [videoType])

  useEffect(() => {
    if (liveSport) setVideoType(STREAM.TYPE_LIVE)
    else setVideoType(STREAM.TYPE_H5)
  }, [liveSport])

  if (showError) {
    return (
      <ErroPage
        hasOtherStream={streaming === STREAM.CODE_BOTH && liveSport}
        onSwitch={handleVideoType}
        otherType={videoType === STREAM.TYPE_H5 ? STREAM.TYPE_LIVE : STREAM.TYPE_H5}
        isLiveH5={videoType === STREAM.TYPE_H5}
        onReload={reload} />
    )
  }

  return (
    <div
      ref={containerRef}
      className={cx(style['live-stream'], style.live, style.real)}>
      {videoType === STREAM.TYPE_LIVE && (
        <LiveReal
          liveUrl={liveUrl}
          streaming={streaming}
          videoType={videoType}
          isOptionShow={isOptionShow}
          isLoading={isLoading}
          streamContainerHeight={`${height}px`}
          reactPlayerEnable={reactPlayerEnable}
          onLoad={setIsLoadingFunc}
          onError={() => handleStreamStatus({ type: STREAM.TYPE_LIVE, status: STREAM_STATUS.ERROR })}
        />
      )}

      {videoType === STREAM.TYPE_H5 && (
        <LiveH5
          videoType={videoType}
          model={H5_MODEL.PITCH}
          onLoad={setIsLoadingFunc}
          onError={() => handleStreamStatus({ type: STREAM.TYPE_H5, status: STREAM_STATUS.ERROR })}
        />
      )}

      {streaming === STREAM.CODE_BOTH &&
        !isLoading &&
        liveSport &&
        (videoType === STREAM.TYPE_LIVE ? (
          <Live3D2 className={cx(style['h5-icon'], isHiddenClass)} onClick={() => handleVideoType(STREAM.TYPE_H5)} />
        ) : (
          <LiveLine className={cx(style['h5-icon'], isHiddenClass)} onClick={() => handleVideoType(STREAM.TYPE_LIVE)} />
        ))}
      {!isLoading && <div className={cx(style.mask, { [style.remove]: isOptionShow })} onClick={handleShowIcon} />}
      <Loading
        open={isLoading}
        local
        small
        style={{ backgroundColor: 'var(--bg-primary)' }}
      />
    </div>
  )
})

export default StreamContainer
