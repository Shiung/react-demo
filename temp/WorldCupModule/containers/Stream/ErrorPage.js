import React from 'react'
import LiveErrorPageComponent from '@sport/components/LiveErrorPage'
import FormatMessage from '@sport/components/FormatMessage'
import style from './ErrorPage.module.scss'
import { LiveLine, Live3D2, ArrowRefreshCw } from '@sportIcons/index'

const LiveErrorPage = React.memo(props => {
  return (
    <div
      className={style.wrapper}>
      <LiveErrorPageComponent
        cssModule={style}
        errorContent={FormatMessage({ msgCode: 'liveStream.live.srcError' })}>
        {props.hasOtherStream &&
          <div className={style.col} onClick={() => props.onSwitch(props.otherType)}>
            {props.isLiveH5
              ? <div className={style.btn}><LiveLine width='33px' height='33px' /></div>
              : <div className={style.btn}><Live3D2 width='33px' height='33px' /></div>}
          </div>}
        <div className={style.col} onClick={props.onReload}>
          <div className={style.btn}><ArrowRefreshCw width='33px' height='33px' /></div>
        </div>
      </LiveErrorPageComponent>
    </div>
  )
})

LiveErrorPage.displayName = 'LiveErrorPage'
export default LiveErrorPage
