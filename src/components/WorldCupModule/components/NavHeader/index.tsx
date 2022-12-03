import { useMemo } from 'react'
import { NavLink } from 'react-router-dom'

import { createBrowserHistory } from 'history'
import { ReactComponent as ArrowLeft } from '../../svg/arrow-left.svg'

import styles from './NavHeader.module.scss'
import { routes } from '../../pages/Game/router'

import Menu from './Menu'

const NavHeader = () => {
  const history = createBrowserHistory()
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div className={styles.topHeader}>
          <div className={styles.goBack} onClick={history.goBack.bind(null)}>
            <ArrowLeft width='20px' height='20px' />  
          </div> 
          <div className={styles.navBox}>
            {useMemo(() => routes.map(({ path, name, i18n }) => (
              <NavLink
                key={path}
                to={path}
                className={styles.nav}
                activeClassName={styles.active}
                replace>
                  {/* <FormatMessage msgCode={i18n} /> */}
                  {i18n}
                </NavLink>
            )), [])}
          </div>
        </div>
        <div className={styles.banner}>
          <img
            className={styles.left}
            src={require('../../image/banner/game/left.png').default} alt='left-banner' />
          <img
            className={styles.main}
            src={require('../../image/banner/game/main.png').default} alt='main-banner' />
          <img
            className={styles.right}
            src={require('../../image/banner/game/right.png').default} alt='right-banner' />
        </div>
      </div>
    </div>
  )
}

NavHeader.Menu = Menu
export default NavHeader
