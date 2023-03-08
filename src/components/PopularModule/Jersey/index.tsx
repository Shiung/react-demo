import {useMemo} from 'react'
import Soccer from './Soccer'
import Basketball from './Basketball'
import type { IJersrySid } from './types'

const Jersey = (props: IJersrySid) => {
  const { sid, ...restProps } = props

  const Component = useMemo(() => {
    switch (sid) {
      case 1: return Soccer
      case 2: return Basketball
    }
  }, [sid])

  return (
    <Component {...restProps} />
  )
}

export default Jersey
