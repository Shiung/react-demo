import { useMemo } from 'react'
import { NavLink } from 'react-router-dom'
import styles from './Menu.module.scss'

import FormatMessage from '@/sports/components/FormatMessage'

type Props = {
  routeChildren: Array<{ i18n: string, path: string }>
}

const Menu: React.FC<Props> = ({ routeChildren }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.navBox}>
        {useMemo(() => {
          return routeChildren.map(({ i18n, path }) => (
            <NavLink
              key={path}
              to={path}
              className={styles.nav}
              activeClassName={styles.active}
              replace>
              <FormatMessage msgCode={i18n} />
              </NavLink>
          ))
        }, [routeChildren])}
      </div>
    </div>
  )
}

export default Menu
