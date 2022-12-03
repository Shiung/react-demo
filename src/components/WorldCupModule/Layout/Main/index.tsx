import React from 'react'
import cx from 'classnames'
import { useRouteMatch } from 'react-router-dom'
import styles from './Layout.module.scss'

import { PageNameSecond, PageNameThird, wouldCupName } from '../../constants'

type Props = {
  header: React.ReactNode,
  subHeader: React.ReactNode
} 

const Layout: React.FC<Props> = ({
  header,
  subHeader,
  children
}) => {
  const isRouteTree = useRouteMatch(`/${wouldCupName}/${PageNameSecond.eliminateName}/${PageNameThird.chartName}`)
  const isRouteScore = useRouteMatch(`/${wouldCupName}/${PageNameSecond.groupRoundName}/${PageNameThird.scoreName}`)

  return (
    <>
      <div className={cx(styles.header, { [styles.type2]: !!isRouteTree || !!isRouteScore })}>
        {React.isValidElement(header) && header}
        {React.isValidElement(subHeader) && subHeader}
      </div>
      <div className={cx(styles.content,  { [styles.type2]: !!isRouteTree || !!isRouteScore })}>
        {children}
      </div>
    </>
  )
}

export default Layout
