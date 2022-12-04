import { useMemo } from 'react'
import styles from './Flag.module.scss'
import cx from 'classnames'

import { ReactComponent as Win } from '../../svg/win.svg'
import BadgeIcon from '../BadgeIcon'
import { badgeUrlParse, BadgeType } from '../../utils' //'@sport/components/WorldCupModule/utils'

type Props = {
  width: number
  isWin?: boolean
  isActive?: boolean
  id: number
  type: BadgeType
}

const Circle: React.FC<Props> = ({ width, isActive, isWin, id, type }) => {
  // const url = useMemo(() => badgeUrlParse({ id, type }), [id, type])

  return (
    <div className={cx(styles.circle, { [styles.win]: isWin || isActive })} style={{ width: `${width}px`, height: `${width}px` }}>
      {isWin && <Win width='16px' height='16px' />}
      <div className={styles.imgBox} style={{ width: `${width - 5}px`, height: `${width - 5}px` }}>
        {/* <BadgeIcon imgSrc={url} /> */}
        <img src={require(`@/components/WorldCupModule/image/flag/${id}_d.png`)} alt='demo' />
      </div>
    </div>
  )
}

const CircleEmpty: React.FC<Pick<Props, 'width'>> = ({ width }) => {
  return (
    <div className={cx(styles.circle)} style={{ width: `${width}px`, height: `${width}px` }}>
      <div className={styles.imgBox} style={{ width: `${width - 5}px`, height: `${width - 5}px` }}>
        <img src={require('../../image/flag_none.png')} alt='empty' />
      </div>
    </div>
  )
}

const Rect: React.FC<{
  width: number
  isWin?: boolean
  id: number
  type: BadgeType
}> = ({ width, isWin, id, type }) => {
  const url = useMemo(() => {
    badgeUrlParse({ id, type })
    return require(`@/components/WorldCupModule/image/flag/${id}_f.png`)
  }, [id, type])
  return (
    <div className={cx(styles.rect, { [styles.win]: isWin })} style={{ width: `${width + 10}px`, height: `${width}px` }}>
      {isWin && <Win width='16px' height='16px' />}
      <BadgeIcon imgSrc={url} />
    </div>
  )
}

const Jesey: React.FC<{ id?: number }> = ({ id = 0 }) => {
  const url = useMemo(() => badgeUrlParse({ id, type: BadgeType.Jersey }), [id])
  return <BadgeIcon imgSrc={url} />
}

export { Rect, Circle, CircleEmpty, Jesey }
