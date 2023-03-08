// import FormatMessage from '@/components/FormatMessage'

const Interrupted = ({ period }: { period: string }) => {
  return (
    <>
      {/* {period === 'interrupted' && <FormatMessage msgCode='sport.tennis.interrupted' />}
      {period === 'not_started' && <FormatMessage msgCode='sport.tennis.not_started' />} */}
      {period === 'interrupted' && period}
      {period === 'not_started' && period}
    </>
  )
}

export default Interrupted
