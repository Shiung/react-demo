import { useMemo } from 'react'
import * as NumberSvg from '../../../../../components/Banner/CountDownSlider/icons' //'@sport/components/WorldCupModule/components/Banner/CountDownSlider/icons'
import styles from './AwardTable.module.scss'

import BadgeIcon from '../../../../../components/BadgeIcon' //'@sport/components/WorldCupModule/components/BadgeIcon'
import { badgeUrlParse, BadgeType } from '../../../../../utils'//'@sport/components/WorldCupModule/utils'

// import FormatMessage from '@sport/components/FormatMessage'

const UnitTeam = ({ id }: { id: number }) => {
  const imgUrl = useMemo(() => {
    return !!id
      ? badgeUrlParse({ id, type: BadgeType.flagRect })
      : require('../../../../../image/flag_rect_none.png')
  }, [id])
  return (
    <>
      <BadgeIcon imgSrc={imgUrl} />
      <div className={styles.name}>
        {/* {!!id ? <FormatMessage msgCode={`wcteam_${id}`}/> : '— —'} */}
        {!!id ? `wcteam_${id}` : '— —'}
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
