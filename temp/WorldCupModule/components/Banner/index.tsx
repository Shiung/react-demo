import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { getConfig } from '@/config'
import styles from './Banner.module.scss'

import CountDownSlider from './CountDownSlider'
import ShowGameEvent from './ShowGameEvent'

const CountDown: React.FC<{ callBack: () => void }> = ({ callBack }) => {
  const language = useSelector((state: any) => state.common.language)

  const backGroundUrl = useMemo(() => {
    const baseUrl = `${getConfig().FE_CDN_URL}/frontend/${getConfig().DEPLOY_ENV}/WorldCup/${getConfig().VENDERID}/wap`
    return `${baseUrl}/${language}/banner_non-start.png`
  }, [language])

  return (
    <>
      <CountDownSlider callBack={callBack} />
      <img src={backGroundUrl} alt='banner' />
    </>
  )
}

const ShowGame = () => {
  const language = useSelector((state: any) => state.common.language)

  const backGroundUrl = useMemo(() => {
    const baseUrl = `${getConfig().FE_CDN_URL}/frontend/${getConfig().DEPLOY_ENV}/WorldCup/${getConfig().VENDERID}/wap`
    return `${baseUrl}/${language}/banner_start.png`
  }, [language])

  return (
    <>
      <ShowGameEvent />
      <img src={backGroundUrl} alt='banner' />
    </>
  )
}

export {
  CountDown,
  ShowGame
}

const Banner: React.FC = (props) => {
  return (
    <div className={styles.box}>
      <div className={styles.wrapper}>
        {props.children}
      </div>
    </div>
  )
}

export default Banner
