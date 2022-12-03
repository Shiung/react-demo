import { useCallback, useMemo } from 'react'
// import { useSelector } from 'react-redux'
import cx from 'classnames'
import {
  wouldCupEventName,
  PageNameEventSecond,
  PageVoteResultName,
  eliminateStartTime
} from '../../constants'// '@sport/components/WorldCupModule/constants'
import styles from './CheckVote.module.scss'
// import FormatMessage from '@/sports/components/FormatMessage'
import { createBrowserHistory } from 'history'
// import { executePortalAction } from '@sport/utils'
import { useWorldCupContext } from '../../store/WorldCupContext'

type Props = {
  type?: PageVoteResultName
}

const CheckVote: React.FC<Props> = ({
  type = PageVoteResultName.roundOf32
}) => {
  const history = createBrowserHistory()
  const goMethod = useCallback(() => {
    history.push(`/${wouldCupEventName}/${PageNameEventSecond.voteResult}/${type}`)
  }, [type, history])

  const { servertimeDiff } = useWorldCupContext()
  const isCloseSticky = useMemo(() => {
    if (type === PageVoteResultName.roundOf32) return false
    const currentTime = new Date().getTime() + servertimeDiff
    return currentTime < eliminateStartTime
  }, [servertimeDiff, type])

  return (
    <div className={cx(styles.wrapper, { [styles.close]: isCloseSticky })}>
      <div className={styles.btn} onClick={goMethod}>
        {/* <FormatMessage msgCode='worldCup.viewAllVotes'/> */}
        投票
      </div>
    </div>
  )
}

export default CheckVote
