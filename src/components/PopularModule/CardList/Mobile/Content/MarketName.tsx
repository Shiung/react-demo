import { memo } from 'react'
import { Sid } from '../../../constants'

// import FormatMessage from '@/components/FormatMessage'

const FootballAsiaTitle = () => <>讓球</> //<FormatMessage msgCode='sport.simpleTitle.ah' />
const FootballInterTitle = () => <>獨贏</> //<FormatMessage msgCode='sport.simpleTitle.1x2' />

const BasketballAsiaTitle = () => <>讓分</>//<FormatMessage msgCode='sport.simpleTitle.ah_score' />
const BasketballInterTitle = () => <>獨贏</> //<FormatMessage msgCode='sport.simpleTitle.1x2' />

const TennisAsiaTitle = () => <>讓局</> // <FormatMessage msgCode='sport.simpleTitle.ah_game' />
const TennisInterTitle = () => <>獨贏</> // <FormatMessage msgCode='sport.simpleTitle.1x2' />

const BaseballAsiaTitle = () => <>讓分</> //<FormatMessage msgCode='sport.simpleTitle.ah_score' />
const BaseBallInterTitle = () => <>獨贏</> //<FormatMessage msgCode='sport.simpleTitle.1x2' />



const MarketName = memo(({ sid, isInter }: { sid: Sid, isInter: boolean }) => {
  return (
    <>
      {isInter && sid === Sid.football && <FootballInterTitle />}
      {isInter && sid === Sid.basketball && <BasketballInterTitle />}
      {isInter && sid === Sid.tennis && <TennisInterTitle />}
      {isInter && sid === Sid.baseball && <BaseBallInterTitle />}

      {!isInter && sid === Sid.football && <FootballAsiaTitle />}
      {!isInter && sid === Sid.basketball && <BasketballAsiaTitle />}
      {!isInter && sid === Sid.tennis && <TennisAsiaTitle />}
      {!isInter && sid === Sid.baseball && <BaseballAsiaTitle />}
    </>
  )
})

MarketName.displayName = 'MarketName'

export default MarketName
