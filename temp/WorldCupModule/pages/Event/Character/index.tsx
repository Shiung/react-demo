import { useMemo, useCallback } from 'react'
import { useSelector } from 'react-redux'
import cx from 'classnames'
import { getConfig } from '@/config'
import { badgeUrlParse, BadgeType, executePortalAction } from '@sport/utils'
import FormatMessage from '@sport/components/FormatMessage'
import * as EventLayout from '@sport/components/WorldCupModule/Layout/Event'

import CharacterSlider from '@sport/components/WorldCupModule/components/CharacterSlider'

import styles from './Chracter.module.scss'

const defaultImgBase = `${getConfig().FE_CDN_URL}/frontend/${getConfig().DEPLOY_ENV}/WorldCup/${getConfig().VENDERID}`

const Banner = ({ lang }: { lang: string }) => {
  return (
    <div className={styles.banner}>
      <img src={`${defaultImgBase}/wap/common/banner_bottom-platform.png`} alt='banner' />
      <div className={cx(styles.title, [lang])}><FormatMessage msgCode='worldCup.bottomBanner.platform.title'/></div>
      <div className={styles.icon}>
        <img src={`${defaultImgBase}/common/primary_logo.png`} alt='banner' />
      </div>
    </div>
  )
}

const DownloadApp = () => {
  const brandName = useSelector((state: any) => state.common.brandName)
  const logoUrl = useMemo(() => badgeUrlParse({ type: BadgeType.competitors }), [])
  const clickHandler = useCallback(() => executePortalAction({ type: 'go-appDownload' }),[])
  return (
    <div className={styles.downloadApp}>
      <div className={styles.btn} onClick={clickHandler}>
        <FormatMessage msgCode='worldCup.qrcode.download' values={{ vendor: brandName }} />
        <div className={styles.icon}>
          <img src={logoUrl} alt='logo-banner' />
        </div>
      </div>
    </div>
  )
}

const Character = () => {
  const language = useSelector((state: any) => state.common.language)
  return (
    <EventLayout.Second titleI18n='worldCup.platformTitle.wap' lang={language}>
      <CharacterSlider />
      <Banner lang={language}/>
      <DownloadApp />
    </EventLayout.Second>
  )
}

export default Character
