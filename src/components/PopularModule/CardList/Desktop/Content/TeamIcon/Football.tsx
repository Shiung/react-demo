import { memo } from 'react'
// import { getConfig } from '@/config'
import Jersey from '@Popular/Jersey'
import type { IJersry } from '@Popular/Jersey/types'

type PropsDefault = {
  type: 'home' | 'away'
}

const FootbalDefault = memo<PropsDefault>(({ type }) => {
  // const defaultUrl = `${getConfig().FE_CDN_URL}/frontend/fe-images/${getConfig().VENDERID}/jersey/football/${type}.png`
  const defaultUrl = require(`@Popular/Jersey/img/Football/${type}.png`)
  return <img src={defaultUrl} alt="defaultBadge"  />
})

FootbalDefault.displayName = 'FootbalDefault'

const FootballJersey = memo<IJersry & { cusCss: string }>(({
  base, sleeve, sleeveDetails, style, styleColor, cusCss
}) => {
  return (
    <Jersey
      sid={1}
      className={cusCss}
      base={base}
      sleeve={sleeve}
      sleeveDetails={sleeveDetails}
      style={style}
      styleColor={styleColor}
    />
  )
})

FootballJersey.displayName = 'FootballJersey'

export {
  FootbalDefault,
  FootballJersey
}
