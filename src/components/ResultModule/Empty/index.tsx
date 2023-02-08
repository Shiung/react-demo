// import FormatMessage from "@/components/FormatMessage"
import styles from './Empty.module.scss'

const Empty = () => {
  return (
    <div className={styles.empty}>
      <img width='98px' height='100px' src={require('@/assets/img/empty.png')} alt='empty'/>
      <div className={styles.emptyContainer}>
        {/* <FormatMessage msgCode='gameResult.empty' /> */}
        empty
      </div>
    </div>
  )
}

export default Empty
