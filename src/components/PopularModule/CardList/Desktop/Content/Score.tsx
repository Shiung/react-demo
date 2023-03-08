import { useCardContext } from '../../store/cardContext'
import { useParseGameScore } from '../../hooks/useContent'
import MarketName from './MarketName'
import { Sid } from '../../../constants'
import styles from './Content.module.scss'

const ScoreNormal = () => {
  return <div className={styles.normal}>VS</div>
}

const ScoreInplay = () => {
  const { l_score, r_score } = useParseGameScore()

  return (
    <div className={styles.inplay}>
      <div className={styles.left}>{l_score}</div>
      <div className={styles.versus}>:</div>
      <div className={styles.right}>{r_score}</div>
    </div>
  )
}

const ScoreComp = () => {
  const { data: { inplay, sid = Sid.football }, isInter } = useCardContext()

  return (
    <div className={styles.score} >
      {inplay ? <ScoreInplay /> : <ScoreNormal />}
      <div className={styles.marketName}>
        <MarketName sid={sid} isInter={isInter} />
      </div>
    </div>
  )
}

export default ScoreComp
