import React, { useRef, useEffect, useCallback, useMemo } from 'react'
import { useSelector } from 'react-redux'
import cx from 'classnames'
import { STREAM } from '@sport/constants/common'
import { langMap, sLangMap } from '@sportComponents/Live/common/LiveH5/LangMap'
import style from './LiveH5.module.scss'
import device, { DEVICE } from '@sport/utils/device'
import { Console } from '@sport/utils/Console'
import { getConfig } from '@/config'

const VENDOR = {
  b: 'b',
  c: 'c',
  s: 's'
}

const H5_MODEL = {
  PITCH: 'pitch',
  TAB: 'tab'
}

/** 動態圖 */
const H5_PITCH = {
  [VENDOR.b]: 'radarPitch',
  [VENDOR.c]: 'geniusStream',
  [VENDOR.s]: ''
}
/** 動態圖 - 分頁選單 */
const H5_TABS = {
  [VENDOR.b]: 'radarTab',
  [VENDOR.c]: 'geniusTab',
  [VENDOR.s]: ''
}


const hasQueryParams = path => (path.includes('?') ? '&' : '?')

const LiveH5 = ({ videoType, model, onLoad, onError }) => {
  const lang = useSelector(state => state.common.language)
  const { gifMid, sid, gifVd } = useSelector(state => state.sports.live)
  const liveH5Ref = useRef(null)
  const handleReceiveMessageRef = useRef()
  const isMobile = device === DEVICE.MOBILE

  const selectModel = model === H5_MODEL.PITCH ? H5_PITCH : H5_TABS
  const type = selectModel[gifVd]

  const src = useMemo(
    () =>
      gifVd === VENDOR.s
        ? `${gifMid}${hasQueryParams(gifMid)}lang=${sLangMap(lang)}`
        : `${getConfig().SPORT_STREAM_URL}/` +
          `?mid=${gifMid}&type=${type}&sid=${sid}&lang=${langMap(lang)}` +
          `${!isMobile && type === H5_TABS[VENDOR.b] ? '&isPc=true' : ''}`,
    [gifVd, gifMid, type, sid, lang, isMobile]
  )

  handleReceiveMessageRef.current = res => {
    if (!liveH5Ref.current) return
    switch (res.type) {
      case 'h5-on-buffer':
        console.log('buffer ***')
        onLoad && onLoad(true)
        break
      case 'h5-on-buffer-end':
        console.log('buffer *** end')
        onLoad && onLoad(false)
        break
      case 'h5-status':
        Console.info(`[Sport][LiveH5][OnError] ${res.data}`)
        onError && onError()
        break
      default:
        break
    }
  }

  const onVendorSLoaded = useCallback(() => {
    gifVd === VENDOR.s && onLoad && onLoad(false)
  }, [gifVd, onLoad])

  useEffect(() => {
    const receiveMessage = event => {
      if (!event || !event.data.type) return
      handleReceiveMessageRef.current?.(event.data)
    }
    window.addEventListener('message', receiveMessage, false)
    return () => {
      window.removeEventListener('message', receiveMessage)
    }
  }, [])

  return (
    <div
      className={cx(style['live-stream'], style.live, style.h5)}
      style={{ display: videoType === STREAM.TYPE_H5 || type === H5_TABS[VENDOR.b] ? '' : 'none' }}
    >
      <iframe
        data-src={src}
        title='LiveH5Iframe'
        ref={liveH5Ref}
        className={cx(style['live-stream-iframe'], isMobile ? style['live-stream-mobile'] : '', style[`${gifVd}-height`])}
        src={src}
        onLoad={onVendorSLoaded}
        frameBorder='0'
        scrolling='No'
        width='100%'
      />{' '}
      {/**debounceHeight */}
    </div>
  )
}

LiveH5.displayName = 'LiveH5'

export default React.memo(LiveH5)

export { VENDOR, H5_TABS, H5_MODEL }
