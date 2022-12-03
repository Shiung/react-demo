import React, { useCallback } from 'react'
import styles from './GroupBox.module.scss'
import cx from 'classnames'

// import FormatMessage from '@sport/components/FormatMessage'

type Props = {
  headerComp: React.ReactNode
  contentComp: React.ReactNode
  hasBlock?: boolean
  is16Win?: boolean
}

const GroupBox: React.FC<Props> = ({
  headerComp,
  contentComp,
  hasBlock = false,
  is16Win = false
}) => {
  const clickHandler = useCallback(() => {
    // executePortalAction({ type: 'go-finishInfo' })
  }, [])
  return (
    <div className={styles.wrapper}>
      {React.isValidElement(headerComp) && headerComp}
      {React.isValidElement(contentComp) && contentComp}
      {hasBlock && (
        <div className={cx(styles.block, { [styles.win16]: is16Win })} onClick={clickHandler}>
          <div className={styles.btn}>查看投票</div>
        </div>
      )}
    </div>
  )
}

export * from './Header'
export * from './Content'
export default GroupBox
