import { useMemo, useCallback } from 'react'
import { useSelector } from 'react-redux'
import cx from 'classnames'
import FormatMessage from '@/sports/components/FormatMessage'
import * as EventLayout from '@sport/components/WorldCupModule/Layout/Event'

import { getConfig } from '@/config'

import BadgeIcon from '@sport/components/WorldCupModule/components/BadgeIcon'
import { badgeUrlParse, BadgeType } from '@sport/components/WorldCupModule/utils'

import { ArrowRight } from '@sportIcons/index'

import { LocalTransferSportradarKey } from './utils'
import { useFetchHistory } from './hooks'
import styles from './Stream.module.scss'
import StreamBox from './StreamBox'

const UnitTeam: React.FC<{ id: string }> = ({ id }) => {
  const url = useMemo(() => {
    return !!id
      ? badgeUrlParse({ id: parseInt(id), type: BadgeType.flagRect })
      : require('@sport/components/WorldCupModule/image/flag_rect_none.png').default
  }, [id])
  return (
    <div className={styles.unitTeam}>
      <div className={styles.flag}><BadgeIcon imgSrc={url} /></div>
      <div className={styles.name}>
        {!!id ? <FormatMessage msgCode={`wcteam_${id}`} /> : '— —'}
      </div>
    </div>
  )
}

const DataRow: React.FC<{ type: 'header' | 'data', goToUrl?: string }> = ({ type, goToUrl, children }) => {
  const goToHandler = useCallback(() => {
    !!goToUrl && window.open(goToUrl, '_blank')
  }, [goToUrl])
  return (
    <div className={cx(styles.dataRow, type === 'header' ? styles.dHeader : styles.dContent )} onClick={goToHandler}>
      {children}
    </div>
  )
}

const History: React.FC<{ lang: string }> = ({ lang }) => {
  const { data } = useFetchHistory()
  return (
    <>
      <div className={cx(styles['history__title'], [lang])}>
        <FormatMessage msgCode='worldCup.bottomStreamTitle.wap' />
      </div>
      <div className={styles['history__content']}>
        <DataRow type='header'>
          <div><FormatMessage msgCode='worldCup.stream.dataAnalysis.season'/></div>
          <div><FormatMessage msgCode='worldCup.stream.dataAnalysis.1st'/></div>
          <div><FormatMessage msgCode='worldCup.stream.dataAnalysis.2nd'/></div>
          <div><FormatMessage msgCode='worldCup.stream.dataAnalysis.3rd'/></div>
          <div className={styles.option} />
        </DataRow>
        {useMemo(() => {
          const langTransferKy = LocalTransferSportradarKey(lang)
          return data.map(({ year, teams, url }) => {
            const parseGotoUrl = url?.[langTransferKy]
            return (
              <DataRow type='data' key={`history-${year}`} goToUrl={parseGotoUrl}>
                <div>{year}</div>
                <UnitTeam id={teams[0]} />
                <UnitTeam id={teams[1]} />
                <UnitTeam id={teams[2]} />
                <div className={styles.option}>
                  <ArrowRight width='10px' height='10px' />
                </div>
              </DataRow>
            )
          })
        }, [data, lang])}
      </div>
    </>
  )
}

const Stream = () => {
  const language = useSelector((state: any) => state.common.language)
  return (
    <EventLayout.Second titleI18n='worldCup.topStreamTitle.wap' lang={language}>
      <StreamBox />
      <History lang={language} />
      <div className={styles.promote}>
        <div className={styles['promote__box']}>
          <div className={styles['promote__title']}>
            <FormatMessage msgCode='worldCup.bottomBanner.stream.title' />
          </div>
          <div className={styles['promote__content']}>
            <div><FormatMessage msgCode='worldCup.bottomBanner.stream.message1' /></div>
            <div><FormatMessage msgCode='worldCup.bottomBanner.stream.message2' /></div>
          </div>
        </div>
        <img
          src={`${getConfig().FE_CDN_URL}/frontend/${getConfig().DEPLOY_ENV}/WorldCup/common/app/banner_bottom-stream.png`}
          alt='banner' />
      </div>
    </EventLayout.Second>
  )
}

export default Stream
