import { memo } from 'react'
// import { getConfig } from '@/config'
import Jersey from '@Popular/Jersey'
import type { IJersry } from '@Popular/Jersey/types'

type PropsDefault = {
  type: 'home' | 'away'
}

const BasketballDefault = memo<PropsDefault>(({ type }) => {
  // const defaultUrl = `${getConfig().FE_CDN_URL}/frontend/fe-images/${getConfig().VENDERID}/jersey/basketball/${type}.png`
  const defaultUrl = require(`@Popular/Jersey/img/Basketball/${type}.png`)
  return <img src={defaultUrl} alt="defaultBadge"  />
})

BasketballDefault.displayName = 'BasketballDefault'



const BasketballJersey = memo<IJersry & { cusCss: string }>(({
  base, sleeve, sleeveDetails, style, styleColor, cusCss
}) => {
  return (
    <Jersey
      sid={2}
      className={cusCss}
      base={base}
      sleeve={sleeve}
      sleeveDetails={sleeveDetails}
      style={style}
      styleColor={styleColor}
    />
  )
})

BasketballJersey.displayName = 'BasketballJersey'

export {
  BasketballDefault,
  BasketballJersey
}
