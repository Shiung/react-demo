import { useEffect, useMemo, useState } from 'react'
// import { useSelector } from 'react-redux'
import { AnimateConf } from './constants'

export const useAnimateConf = ({ ballType }: { ballType: 'football' | 'basketball' | 'tennis' | 'baseball' }) => {
  // const deviceWidth = useSelector<any, number>(store => store.device.size.width)
  const [deviceWidth, setDeviceWidth] = useState<number>(0)

  useEffect(() => {
    const resizeHandler = () => {
      const screenW = window.screen.width
      setDeviceWidth(screenW)
    }
    resizeHandler()
    window.addEventListener('resize', resizeHandler)
    return () => {
      window.removeEventListener('resize', resizeHandler)
    }
  }, [])

  const AniConf = useMemo(() => {
    const mapping = AnimateConf[ballType] ?? {}
    const rang = Object.keys(mapping).sort((a, b) => Number(b) - Number(a)).reduce<number[]>((arr, curr) => {
      let num = Number(curr)
      return !isNaN(num) ? arr.concat(num) : arr
    }, [])
    return {
      mapping,
      rang
    }
  }, [ballType])

  const AniMapping = useMemo(() => {
    let returnMapping = AniConf.mapping.default
    for (let r of AniConf.rang) {
      if (deviceWidth > r) {
        returnMapping = AniConf.mapping[r]
        break
      }
    }
    return returnMapping
  }, [AniConf, deviceWidth])

  return {
    ...AniMapping
  }
}
