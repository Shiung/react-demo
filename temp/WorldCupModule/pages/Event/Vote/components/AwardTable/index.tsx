import { useMemo } from 'react'
import * as NumberSvg from '@sport/components/WorldCupModule/components/Banner/CountDownSlider/icons'
import styles from './AwardTable.module.scss'

import BadgeIcon from '@sport/components/WorldCupModule/components/BadgeIcon'
import { badgeUrlParse, BadgeType } from '@sport/components/WorldCupModule/utils'

import FormatMessage from '@sport/components/FormatMessage'

const UnitTeam = ({ id }: { id: number }) => {
  const imgUrl = useMemo(() => {
    return !!id
      ? badgeUrlParse({ id, type: BadgeType.flagRect })
      : require('@sport/components/WorldCupModule/image/flag_rect_none.png').default
  }, [id])
  return (
    <>
      <BadgeIcon imgSrc={imgUrl} />
      <div className={styles.name}>
        {!!id ? <FormatMessage msgCode={`wcteam_${id}`}/> : '— —'}
      </div>
    </>
  )
}

type Props = {
  ls?: number[]
}

const AwardTable: React.FC<Props> = ({
  ls = [0, 0, 0]
}) => {
  return (
    <div className={styles.wrapper}>
      <div>
        <NumberSvg.Number1 />
        <UnitTeam id={ls[0]}/>
      </div>
      <div>
        <NumberSvg.Number2 />
        <UnitTeam id={ls[1]}/>
      </div>
      <div>
        <NumberSvg.Number3 />
        <UnitTeam id={ls[2]}/>
      </div>
    </div>
  )
}

export default AwardTable
