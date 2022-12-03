import cx from 'classnames'
import styles from './GroupBox.module.scss'


const Header1 = ({ group }: { group: string }) => {
  return (
    <div className={cx(styles.header, styles.type1)}>
      <div className={styles.left}>
        {/* <FormatMessage msgCode='worldCup.group' values={{ group }} /> */}
        {group}
      </div>
      <div className={styles.right}>
        <div>group</div>
        <div>all</div>
      </div>
    </div>
  )
}

const Header2 = () => {
  return (
    <div className={cx(styles.header, styles.type2)}>
      {/* <FormatMessage msgCode='worldCup.group' values={{ group: 16 }}/> */}
      16 強
    </div>
  )
}

export { Header1, Header2 }
