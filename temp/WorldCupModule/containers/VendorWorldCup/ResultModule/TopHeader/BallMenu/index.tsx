import React, { useCallback } from 'react'
import { useSelector } from 'react-redux'
import cx from 'classnames'
import FormatMessage from '@sport/components/FormatMessage'
import { CATEGORIES } from '@sport/constants/common'
import { history } from '@sport/utils'
import { Sid } from '@sport/components/ResultModule/constants'
import styles from '@sport/components/ResultModule/TopHeader/BallMenu/BallMenu.module.scss'

import { Football, Basketball, Baseball, Tennis } from '@sportContainers/Menu/MobileMenu/icons'
import { ReactComponent as WorldCupBall } from '@sport/components/WorldCupModule/svg/worldCup_Ball.svg'
import { worldCupBallName } from '@sport/components/WorldCupModule/constants'

const BALL_TYPE_MAP = {
  [Sid[Sid.football]]: {
    active: <Football width='16px' height='16px'/>,
    origin: <img alt='Football' src={require('@sportContainers/Menu/MobileMenu/img/football_gray_2D.png').default} /> },
  [Sid[Sid.basketball]]: {
    active: <Basketball width='16px' height='16px'/>,
    origin: <img alt='Basketball' src={require('@sportContainers/Menu/MobileMenu/img/basketball_gray_2D.png').default} /> },
  [Sid[Sid.tennis]]: {
    active: <Tennis width='16px' height='16px'/>,
    origin: <img alt='Tennis' src={require('@sportContainers/Menu/MobileMenu/img/tennis_gray_2D.png').default} /> },
  [Sid[Sid.baseball]]: {
    active: <Baseball width='16px' height='16px'/>,
    origin: <img alt='Baseball' src={require('@sportContainers/Menu/MobileMenu/img/baseball_gray_2D.png').default} /> },
}

const BallMenu: React.FC = () => {
  const worldCupStatus = useSelector<any, boolean>(state => state.sports.worldCupStickyStatus)

  const clickHandler = useCallback((ball: string) => {
    history.replace(`/${CATEGORIES.GAMERESULT}/${ball}/regular/today`)
  }, [])

  return (
    <div className={styles.container}>
      {worldCupStatus && (
        <div
          className={cx(styles.ballType, styles.worlcup, styles.active)}
          onClick={() => history.replace(`/${CATEGORIES.GAMERESULT}/${worldCupBallName}/regular/today`)}>
          <WorldCupBall width='16px' height='16px'/>
          <span><FormatMessage msgCode='worldCup' /></span>
        </div>
      )}
      {Object.entries(BALL_TYPE_MAP).map(([key, val]) => {
        return (
          <div
            key={`ballMenu-${key}`}
            className={cx(styles.ballType)}
            onClick={() => clickHandler(key)}>
            {val.origin}
            <span><FormatMessage msgCode={`label.${key}`}/></span>
          </div>
        )
      })}
    </div>
  )
}

export default BallMenu
