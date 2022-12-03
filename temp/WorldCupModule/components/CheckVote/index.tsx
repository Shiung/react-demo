import { useCallback, useMemo } from 'react'
import { useSelector } from 'react-redux'
import cx from 'classnames'
import {
  wouldCupEventName,
  PageNameEventSecond,
  PageVoteResultName,
  eliminateStartTime
} from '@sport/components/WorldCupModule/constants'
import styles from './CheckVote.module.scss'
import FormatMessage from '@/sports/components/FormatMessage'
import { history } from '@sport/utils'
import { executePortalAction } from '@sport/utils'
import { useWorldCupContext } from '@sport/components/WorldCupModule/store/WorldCupContext'

type Props = {
  type?: PageVoteResultName
}

const CheckVote: React.FC<Props> = ({
  type = PageVoteResultName.roundOf32
}) => {
  const token = useSelector<any, string>(store => store.user.info.token)
  const platToken = useSelector<any, string>(state => state.user.platformToken)
  const goMethod = useCallback(() => {
    if (!!token && !!platToken) {
      history.push(`/${wouldCupEventName}/${PageNameEventSecond.voteResult}/${type}`)
    } else {
      executePortalAction({ type: 'go-login' })
    }
  }, [type, token, platToken])

  const { servertimeDiff } = useWorldCupContext()
  const isCloseSticky = useMemo(() => {
    if (type === PageVoteResultName.roundOf32) return false
    const currentTime = new Date().getTime() + servertimeDiff
    return currentTime < eliminateStartTime
  }, [servertimeDiff, type])

  return (
    <div className={cx(styles.wrapper, { [styles.close]: isCloseSticky })}>
      <div className={styles.btn} onClick={goMethod}>
        <FormatMessage msgCode='worldCup.viewAllVotes'/>
      </div>
    </div>
  )
}

export default CheckVote
