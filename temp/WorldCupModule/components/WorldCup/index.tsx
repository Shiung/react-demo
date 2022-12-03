import { memo } from 'react'
import { RoundConf } from '../../constants'
import { ReactComponent as FIFAGroupA } from '../../svg/FIFA_Group_A.svg'
import { ReactComponent as FIFAGroupB } from '../../svg/FIFA_Group_B.svg'
import { ReactComponent as FIFAGroupC } from '../../svg/FIFA_Group_C.svg'
import { ReactComponent as FIFAGroupD } from '../../svg/FIFA_Group_D.svg'
import { ReactComponent as FIFAGroupE } from '../../svg/FIFA_Group_E.svg'
import { ReactComponent as FIFAGroupF } from '../../svg/FIFA_Group_F.svg'
import { ReactComponent as FIFAGroupG } from '../../svg/FIFA_Group_G.svg'
import { ReactComponent as FIFAGroupH } from '../../svg/FIFA_Group_H.svg'
import * as Flag from '../Flag'

import FormatMessage from '@/sports/components/FormatMessage'

const RoundGroupName = memo<{ roundGroup?: RoundConf }>(({ roundGroup }) => {
  return (
    <>
      {roundGroup === RoundConf.A && <FormatMessage msgCode='worldCup.groupMatchesTeam' values={{ group: roundGroup }} />}
      {roundGroup === RoundConf.B && <FormatMessage msgCode='worldCup.groupMatchesTeam' values={{ group: roundGroup }} />}
      {roundGroup === RoundConf.C && <FormatMessage msgCode='worldCup.groupMatchesTeam' values={{ group: roundGroup }} />}
      {roundGroup === RoundConf.D && <FormatMessage msgCode='worldCup.groupMatchesTeam' values={{ group: roundGroup }} />}
      {roundGroup === RoundConf.E && <FormatMessage msgCode='worldCup.groupMatchesTeam' values={{ group: roundGroup }} />}
      {roundGroup === RoundConf.F && <FormatMessage msgCode='worldCup.groupMatchesTeam' values={{ group: roundGroup }} />}
      {roundGroup === RoundConf.G && <FormatMessage msgCode='worldCup.groupMatchesTeam' values={{ group: roundGroup }} />}
      {roundGroup === RoundConf.H && <FormatMessage msgCode='worldCup.groupMatchesTeam' values={{ group: roundGroup }} />}
      {roundGroup === RoundConf.round_of_16 && <FormatMessage msgCode='worldCup.theRoundOf16' />}
      {roundGroup === RoundConf.quarterfinal && <FormatMessage msgCode='worldCup.quarterfinal' />}
      {roundGroup === RoundConf.semifinal && <FormatMessage msgCode='worldCup.semifinal' />}
      {roundGroup === RoundConf['3rd_place_final'] && <FormatMessage msgCode='worldCup.3rdPlace' />}
      {roundGroup === RoundConf.final && <FormatMessage msgCode='worldCup.championship' />}
    </>
  )
})

const RoundGroupIcon = memo<{ roundGroup?: RoundConf }>(({ roundGroup }) => {
  return (
    <>
      {roundGroup === RoundConf.A && <FIFAGroupA />}
      {roundGroup === RoundConf.B && <FIFAGroupB />}
      {roundGroup === RoundConf.C && <FIFAGroupC />}
      {roundGroup === RoundConf.D && <FIFAGroupD />}
      {roundGroup === RoundConf.E && <FIFAGroupE />}
      {roundGroup === RoundConf.F && <FIFAGroupF />}
      {roundGroup === RoundConf.G && <FIFAGroupG />}
      {roundGroup === RoundConf.H && <FIFAGroupH />}
    </>
  )
})

export { RoundGroupName, RoundGroupIcon, Flag }
