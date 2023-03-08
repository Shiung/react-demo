import { memo } from "react"
// import { SPORTS } from '@/constants/common'
// import { isShowTime } from '@/utils'
import Interrupted from './Interrupted'
import { useParseGameTime } from '../../../hooks/useHeader'
// import FormatMessage from '@/components/FormatMessage'


type Props = {
  inplay: boolean,
  period: string,
  out: string,
  kickoffTime?: string
}

const Inplay = memo(({
  period,
  out
}: Pick<Props, 'out' | 'period'>) => {
  const isShowOut = false //isShowTime({ period: period, sportType: SPORTS.BASEBALL, ignore: false })
  return (
    <>
      {/* <FormatMessage msgCode={`sport.baseball.${period}`} /> */}
      {period}
      {isShowOut && (
        <span style={{ marginLeft: '5px' }}>
          {out}
          出局
          {/* <FormatMessage msgCode='sport.baseball.out' /> */}
        </span>
      )}
    </>
  )
})

Inplay.displayName = 'ShowTimeBaseballInplay'

const Normal = memo(({
  kickoffTime = ''
}: Pick<Props, 'kickoffTime'>) => {
  const { showTime } = useParseGameTime(kickoffTime)
  return <>{showTime}</>
})

Normal.displayName = 'ShowTimeBaseBallNormal'

const Baseball = memo<Props>(({
  inplay,
  period,
  out,
  kickoffTime
}) => {
  if (['interrupted', 'not_started'].includes(period)) return <Interrupted period={period} />
  if (inplay) return period ? <Inplay {...{ out, period }} /> : <></>
  return <Normal kickoffTime={kickoffTime}/>
})

Baseball.displayName = 'ShowTimeBaseball'

export default Baseball
