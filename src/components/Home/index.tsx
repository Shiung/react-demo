import { NavLink } from 'react-router-dom'
import { wouldCupName, wouldCupEventName } from '../WorldCupModule/constants'
import styles from './Home.module.scss'
import { CATEGORIES } from '@/constants'

const Home = () => {
  return (
    <div className={styles.home}>
      home
      <div className={styles.nav}>
        <NavLink to={`/${wouldCupName}`}>世界杯紅皮</NavLink>
        <NavLink to={`/${wouldCupEventName}`}>世界杯藍皮</NavLink>
        <NavLink to='/ballAnimate'>球滾動動畫</NavLink>
        <NavLink to={`/${CATEGORIES.GAMERESULT}`}>賽果</NavLink>
        <NavLink to={`/popular`}>推薦卡片</NavLink>
      </div>
    </div>
  )
}

export default Home
