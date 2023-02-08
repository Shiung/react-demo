import React, { useCallback } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import cx from 'classnames'
import { CATEGORIES } from '@/constants'
// import { history } from '@/utils'
import { Sid } from '../../constants'
import { BallType } from '../../types'
import styles from './BallMenu.module.scss'

import { Football, Basketball, Baseball, Tennis } from './svgSrc'

const BALL_TYPE_MAP = {
  [Sid[Sid.football]]: {
    active: <Football width='16px' height='16px'/>,
    origin: <img alt='Football' src={require('./imgSrc/football_gray_2D.png')} /> },
  [Sid[Sid.basketball]]: {
    active: <Basketball width='16px' height='16px'/>,
    origin: <img alt='Basketball' src={require('./imgSrc/basketball_gray_2D.png')} /> },
  [Sid[Sid.tennis]]: {
    active: <Tennis width='16px' height='16px'/>,
    origin: <img alt='Tennis' src={require('./imgSrc/tennis_gray_2D.png')} /> },
  [Sid[Sid.baseball]]: {
    active: <Baseball width='16px' height='16px'/>,
    origin: <img alt='Baseball' src={require('./imgSrc/baseball_gray_2D.png')} /> },
}

const BallMenu: React.FC = () => {
  const { ballType } = useParams<{ ballType: BallType }>()
  const history = useHistory()

  const clickHandler = useCallback((ball: string) => {
    history.replace(`/${CATEGORIES.GAMERESULT}/${ball}/regular/today`)
  }, [history])

  return (
    <div className={styles.container}>
      {Object.entries(BALL_TYPE_MAP).map(([key, val]) => {
        return (
          <div
            key={`ballMenu-${key}`}
            className={cx(styles.ballType, { [styles.active]: ballType === key })}
            onClick={() => clickHandler(key)}>
            {ballType === key ? val.active : val.origin}
            <span>
              {/* <FormatMessage msgCode={`label.${key}`}/> */}
              {key}
            </span>
          </div>
        )
      })}
    </div>
  )
}

export default BallMenu
