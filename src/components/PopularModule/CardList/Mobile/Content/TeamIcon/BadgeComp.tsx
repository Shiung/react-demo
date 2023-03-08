import { memo, useMemo } from 'react'
import { badgeUrlParse, BadgeType } from '@/utils'
import BadgeIcon from '@/components/ResultModule/BadgeIcon'

type PropsCountryID = {
  cid?: number
}

const CountryID = memo<PropsCountryID>(({ cid }) => {
  const showBadge = useMemo(() => cid && isNaN(cid) ? '' : badgeUrlParse({ type: BadgeType.countryflags, id: cid }), [cid])
  return <BadgeIcon defaultType={BadgeType.competitors} imgSrc={showBadge} />
})

CountryID.displayName = 'TeamIcon_CountryID'

type Props = {
  teamId?: number
}

const TeamID = memo<Props>(({ teamId }) => {
  const showBadge = useMemo(() => teamId && isNaN(teamId) ? '' : badgeUrlParse({ type: BadgeType.competitors, id: teamId }), [teamId])
  return <BadgeIcon defaultType={BadgeType.competitors} imgSrc={showBadge} />
})

TeamID.displayName = 'TeamIcon_TeamID'

export {
  TeamID,
  CountryID
}
