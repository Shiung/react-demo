import React from 'react'
import cx from 'classnames'
import styles from './Layout.module.scss'
import FormatMessage from "@/sports/components/FormatMessage"

type Props = {
  titleI18n: string,
  lang: string
}

const Second: React.FC<Props> = ({ titleI18n, lang, children }) => {
  return (
    <>
      <div className={cx(styles['second__title'], [lang])}>
        <FormatMessage msgCode={titleI18n}/>
      </div>
      {children}
    </>
  )
}

export default Second
