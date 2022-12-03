import cx from 'classnames'
import styles from './GroupBox.module.scss'

import FormatMessage from '@sport/components/FormatMessage'

const Header1 = ({ group }: { group: string }) => {
  return (
    <div className={cx(styles.header, styles.type1)}>
      <div className={styles.left}><FormatMessage msgCode='worldCup.group' values={{ group }} /></div>
      <div className={styles.right}>
        <div><FormatMessage msgCode='worldCup.vote.group.group'/></div>
        <div><FormatMessage msgCode='worldCup.vote.group.all'/></div>
      </div>
    </div>
  )
}

const Header2 = () => {
  return (
    <div className={cx(styles.header, styles.type2)}>
      <FormatMessage msgCode='worldCup.group' values={{ group: 16 }}/>
    </div>
  )
}

export { Header1, Header2 }
