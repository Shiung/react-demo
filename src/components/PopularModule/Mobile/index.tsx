import { usePopularList } from '../hooks'
import CardListMoblie from '../CardList/Mobile'
import styles from './PopularMobile.module.scss'

const Mobile = () => {
  const { hasList, list, language, timezone } = usePopularList()
  return (
    <>
      {!hasList && <></>}
      {hasList && (
        <div className={styles.wrapper} >
          <CardListMoblie key={`${language}-${timezone}`} list={list} />
        </div>
      )}
    </>
  )
}

export default Mobile
