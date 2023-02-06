import styles from './PlaceHolder.module.scss'

const Market = () => {
  return (
    <div className={styles.market}>
      <div className={styles.unit} >
        <div className={styles.left} />
        <div className={styles.right} />
      </div>
      <div className={styles.unit} >
        <div className={styles.left} />
        <div className={styles.right} />
      </div>
    </div>
  )
}

const Title = () => {
  return <div className={styles.title} />
}

const PlaceHolder = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.placeholder__collapse}></div>
        <div className={styles.placeholder__leagueName}></div>
      </div>
      <div className={styles.content}>
        <div className={styles.left}>
          <div className={styles.placeholder__leagueFlag}></div>
          <div className={styles.placeholder__gameTitle}></div>
        </div>
        <div className={styles.right}>
          <div className={styles.placeholder__forward}></div>
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.left}>
          <div className={styles.placeholder__leagueFlag}></div>
          <div className={styles.placeholder__gameTitle}></div>
        </div>
        <div className={styles.right}>
          <div className={styles.placeholder__forward}></div>
        </div>
      </div>
    </div>
  )
}

PlaceHolder.Market = Market
PlaceHolder.Title = Title
export default PlaceHolder
