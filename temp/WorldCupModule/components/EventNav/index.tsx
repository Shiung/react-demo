import { useMemo } from 'react'
import { NavLink } from 'react-router-dom'
import cx from 'classnames'
import styles from './EventNav.module.scss'

import FormatMessage from '@/sports/components/FormatMessage'

type PropsMain = {
  routes: Array<{ i18n: string, path: string }>,
  lang: string
}

const MainNav: React.FC<PropsMain> = ({
  routes,
  lang
}) => {
  return (
    <div className={styles.main}>
      {useMemo(() => {
        return routes.map(({ i18n, path }) => (
          <NavLink
            key={path}
            to={path}
            className={cx(styles.nav, [lang])}
            activeClassName={styles.active}>
            <FormatMessage msgCode={i18n} />
            </NavLink>
        ))
      }, [routes, lang])}
    </div>
  )
}

type PropsInfo = {
  routes:  Array<{ i18n: string, path: string }>,
}

const InfoNav: React.FC<PropsInfo> = ({ routes }) => {
  return (
    <div className={styles.info}>
      {useMemo(() => {
        return routes.map(({ i18n, path }) => (
          <NavLink
            key={path}
            to={path}
            className={cx(styles.nav)}
            activeClassName={styles.active}>
            <FormatMessage msgCode={i18n} />
            </NavLink>
        ))
      }, [routes])}
    </div>
  )
}

type PropsInfoSub = {
  routes:  Array<{ i18n: string, path: string }>,
}

const InfoSubNav: React.FC<PropsInfoSub> = ({
  routes
}) => {
  return (
    <div className={styles.infoSub}>
      {useMemo(() => {
        return routes.map(({ i18n, path }) => (
          <NavLink
            key={path}
            to={path}
            className={cx(styles.nav)}
            activeClassName={styles.active}>
            <FormatMessage msgCode={i18n} />
            </NavLink>
        ))
      }, [routes])}
    </div>
  )
}

export {
  MainNav,
  InfoNav,
  InfoSubNav
}