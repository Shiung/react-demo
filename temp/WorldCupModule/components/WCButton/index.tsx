import { useCallback } from 'react'
import styles from './WCbutton.module.scss'
import FormatMessage from '@/sports/components/FormatMessage'
import { ReactComponent as FifaSoccer } from '@sport/components/WorldCupModule/svg/fifa_soccer.svg'
import { wouldCupName } from '@sport/components/WorldCupModule/constants'

import { history } from '@/sports/utils'

const WCButton = () => {
  const clickHandler = useCallback(() => history.push(`/${wouldCupName}`), [])
  return (
    <div className={styles.wrapper} onClick={clickHandler}>
      <FormatMessage msgCode='worldCup.scheduleInformation' />
      <FifaSoccer />
    </div>
  )
}

export default WCButton
