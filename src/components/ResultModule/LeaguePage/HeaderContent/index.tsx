import { useState } from 'react'
import cx from 'classnames'
import styles from './HeaderContent.module.scss'

interface Props {
  title: string,
  gameNum: number,
  expand: boolean,
  children: React.ReactNode,
  showGameNum: boolean,
  isAllwaysShowCount: boolean,
  fixInitExpand: boolean,
  disableCollapse: boolean,
  showBadge: boolean,
  titleBold: boolean,
  badge: React.ReactNode,
  ContentBoxClassName: string
}

const HeaderContent: React.FC<Partial<Props>> = (props) => {
  const {
    title,
    gameNum = 0,
    expand,
    children,
    showGameNum = true,
    isAllwaysShowCount = false,
    disableCollapse = false,
    showBadge = false,
    titleBold = false,
    ContentBoxClassName = ''
  } = props
  const [isExpand, setIsExpand] = useState(expand)
  const childrenIsShow = isExpand || disableCollapse

  const onExpand = () => {
    if (disableCollapse) return
    setIsExpand(!isExpand)
  }

  return (
    <div className={cx(styles.box, { [styles.childrenIsShow]: childrenIsShow })}>
      <div
        className={cx(styles.headerContentBox, { [styles.showBadge]: showBadge }, ContentBoxClassName)}
        onClick={onExpand}
        data-e2e='headerContentTitle'
      >
        <div className={cx(styles.headerContentTitle, { [styles.bold]: titleBold })}>{title}</div>
        {!disableCollapse && !showBadge && (
          <div className={cx(styles.countBox, { [styles.none]: isExpand && !isAllwaysShowCount })}>
            {showGameNum && gameNum >= 0 && <div className={styles.count}>{gameNum}</div>}
          </div>
        )}
        {showBadge && props.badge}
      </div>
      <div style={childrenIsShow ? {} : { display: 'none' }}>{children}</div>
    </div>
  )
}

export default HeaderContent
