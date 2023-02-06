import React, { useCallback } from 'react'
import { useParams } from 'react-router-dom'
import cx from 'classnames'
import FormatMessage from '@/components/FormatMessage'
import { CATEGORIES } from '@/constants/common'
import { history } from '@/utils'
import { Sid } from '../../constants'
import { BallType } from '../../types'
import styles from './BallMenu.module.scss'

import { Football, Basketball, Baseball, Tennis } from '@containers/Menu/MobileMenu/icons'

const BALL_TYPE_MAP = {
  [Sid[Sid.football]]: {
    active: <Football width='16px' height='16px'/>,
    origin: <img alt='Football' src={require('@containers/Menu/MobileMenu/img/football_gray_2D.png').default} /> },
  [Sid[Sid.basketball]]: {
    active: <Basketball width='16px' height='16px'/>,
    origin: <img alt='Basketball' src={require('@containers/Menu/MobileMenu/img/basketball_gray_2D.png').default} /> },
  [Sid[Sid.tennis]]: {
    active: <Tennis width='16px' height='16px'/>,
    origin: <img alt='Tennis' src={require('@containers/Menu/MobileMenu/img/tennis_gray_2D.png').default} /> },
  [Sid[Sid.baseball]]: {
    active: <Baseball width='16px' height='16px'/>,
    origin: <img alt='Baseball' src={require('@containers/Menu/MobileMenu/img/baseball_gray_2D.png').default} /> },
}

const BallMenu: React.FC = () => {
  const { ballType } = useParams<{ ballType: BallType }>()

  const clickHandler = useCallback((ball: string) => {
    history.replace(`/${CATEGORIES.GAMERESULT}/${ball}/regular/today`)
  }, [])

  return (
    <div className={styles.container}>
      {Object.entries(BALL_TYPE_MAP).map(([key, val]) => {
        return (
          <div
            key={`ballMenu-${key}`}
            className={cx(styles.ballType, { [styles.active]: ballType === key })}
            onClick={() => clickHandler(key)}>
            {ballType === key ? val.active : val.origin}
            <span><FormatMessage msgCode={`label.${key}`}/></span>
          </div>
        )
      })}
    </div>
  )
}

export default BallMenu
