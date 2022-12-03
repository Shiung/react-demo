import { useMemo } from 'react'
import { getConfig } from '@/config'
import styles from './Footer.module.scss'

const Footer = () => {
  const backGroundUrl = useMemo(() => {
    const baseUrl = `${getConfig().FE_CDN_URL}/frontend/${getConfig().DEPLOY_ENV}/WorldCup/${getConfig().VENDERID}/wap/common`
    return `${baseUrl}/footer.png`
  }, [])

  return (
    <div className={styles.wrapper}>
      <img src={backGroundUrl} alt="footer" />
    </div>
  )
}

export default Footer
