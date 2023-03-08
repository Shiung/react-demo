import { memo } from "react"
import Interrupted from './Interrupted'
import { useParseGameTime } from '../../../hooks/useHeader'
// import FormatMessage from '@/components/FormatMessage'


type Props = {
  inplay: boolean,
  period: string,
  setScore: string[],
  kickoffTime?: string
}

const Inplay = memo(({
  setScore,
  period
}: Pick<Props, 'period' | 'setScore'>) => {
  const currentGame = setScore.length ? setScore[setScore.length - 1].split('-') : []
  const currentGameSum = currentGame.reduce((sum, cur) => sum + Number(cur), 1)
  return (
    <>
      {/* <FormatMessage msgCode={`sport.tennis.${period}`}/> */}
      {period}
      <span>
        {/* <FormatMessage msgCode='sport.tennis.ml_g' values={{ x: currentGameSum }} /> */}
        {currentGameSum}
      </span>
    </>
  )
})

Inplay.displayName = 'ShowTimeTennisInplay'

const Normal = memo(({
  kickoffTime = ''
}: Pick<Props, 'kickoffTime'>) => {
  const { showTime } = useParseGameTime(kickoffTime)
  return <>{showTime}</>
})

Normal.displayName = 'ShowTimeTennisNormal'

const Tennis = memo<Props>(({
  inplay,
  period,
  setScore,
  kickoffTime
}) => {
  if (['interrupted', 'not_started'].includes(period)) return <Interrupted period={period} />
  if (inplay) return period ? <Inplay {...{ setScore, period }} /> : <></>
  return <Normal kickoffTime={kickoffTime}/>
})

Tennis.displayName = 'ShowTimeTennis'

export default Tennis
