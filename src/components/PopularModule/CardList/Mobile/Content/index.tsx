import cx from 'classnames'
import Score from './Score'
import { Sid } from '../../../constants'
import { useParseTeam, useParseIcons } from '../../hooks/useContent'

import * as TeamIcon from './TeamIcon'
import styles from './Content.module.scss'

const TeamComp = ({ team, isTennis, type }: { team: string, isTennis: boolean, type: 'home' | 'away' }) => {
  const { sid, AId, HId, Acid, Hcid, AJerseConf, HJerseConf } = useParseIcons()

  const currentSidJersey = type === 'home' ? HJerseConf : AJerseConf
  return (
    <div className={styles.team}>
      <div className={cx(styles.icon, { [styles.tennis]: isTennis })}>
        {sid === Sid.football && ( currentSidJersey
          ? <TeamIcon.Football.FootballJersey { ...currentSidJersey } cusCss={styles.jerseySvg} />
          : <TeamIcon.Football.FootbalDefault type={type} />
        )}

        {sid === Sid.basketball && ( currentSidJersey
          ? <TeamIcon.Basketball.BasketballJersey { ...currentSidJersey } cusCss={styles.jerseySvg} />
          : <TeamIcon.Basketball.BasketballDefault type={type} />
        )}

        {sid === Sid.tennis &&
          <TeamIcon.BadgeComp.CountryID cid={type === 'home' ? Hcid : Acid} />}
        {sid === Sid.baseball &&
          <TeamIcon.BadgeComp.TeamID teamId={type === 'home' ? HId : AId} />}
      </div>
      <div className={cx(styles.name, { [styles.tennis]: isTennis })}>{team}</div>
    </div>
  )
}

const Content = () => {
  const { nameConf, isTennis, isReverse } = useParseTeam()

  return (
    <div className={styles.content}>
      <TeamComp team={nameConf.left} isTennis={isTennis} type={isReverse ? 'away' : 'home'} />
      <Score />
      <TeamComp team={nameConf.right} isTennis={isTennis} type={isReverse ? 'home' : 'away'} />
    </div>
  )
}

export default Content
