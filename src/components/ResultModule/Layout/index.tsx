import React, { useEffect } from 'react'
import cx from 'classnames'
import PlaceHolder  from '../PlaceHolder'
import Empty from '../Empty'
import styles from './Layout.module.scss'

type Props = {
  header: React.ReactNode,
  subHeader?: React.ReactNode,
  content: React.ReactNode,
  isLoading: boolean,
  noBackground?: boolean,
  isEmpty: boolean
}

const Layout: React.FC<Props> = ({ header, subHeader, content, isLoading, isEmpty, noBackground }) => {
  const withoutBackground = noBackground || isEmpty
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return (
    <>
      {React.isValidElement(header) && header}
      {React.isValidElement(subHeader) && subHeader}
      <div className={cx(styles.container, { [styles['bg-w']]: !withoutBackground })}>
        {isLoading && <PlaceHolder />}
        {!isLoading && isEmpty && <Empty />}
        {!isLoading && !isEmpty && React.isValidElement(content) && content}
      </div>
    </>
  )
}

export default Layout
