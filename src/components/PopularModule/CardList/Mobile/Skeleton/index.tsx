import styles from './Skeleton.module.scss'

const Skeleton = () => {
  return (
    <div className={styles.box}>
      <div className={styles.header} />
      <div className={styles.team} />
      <div className={styles.score} />
      <div className={styles.market} >
        <div />
        <div />
      </div>
    </div>
  )
}

export default Skeleton
