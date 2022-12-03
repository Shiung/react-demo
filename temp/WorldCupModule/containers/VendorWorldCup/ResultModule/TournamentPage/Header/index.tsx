import React, { useMemo } from 'react'
import cx from 'classnames'
import { Sid, ScoreBoxInSimpleConf } from '@sport/components/ResultModule/constants'
import Row from '@sport/components/ResultModule/TournamentPage/Row'
import FormatMessage from '@sport/components/FormatMessage'
import styles from '@sport/components/ResultModule/TournamentPage/Header/Header.module.scss'

type Props = {
  title: string | React.ReactNode,
  TopHeaderRef: React.RefObject<HTMLDivElement>
}

const NameComp = ({ title }: { title: string | React.ReactNode }) => {
  return <div className={styles.name}>{title}</div>
}

const Gametitle = ({ ls }: { ls: { id: string, i18n: string }[] }) => {
  return (
    <>
      {useMemo(() => {
        return ls.map(({ id , i18n }) => {
          return id !== 'kickof'
            ? <div key={`${id}-${i18n}`} className={cx(styles.gameTitle, styles.normal)}><FormatMessage msgCode={i18n} /></div>
            : (
              <div key={`${id}-${i18n}`} className={cx(styles.gameTitle, styles.timeline)}>
                <div><FormatMessage msgCode={i18n} /></div>
              </div>
            )
        })
      }, [ls])}
    </>
  )
}

const Header: React.FC<Props> = ({ title, TopHeaderRef }) => {
  const gameTitleList = ScoreBoxInSimpleConf[Sid.football]
  return (
    <div className={styles.header} style={{ top: TopHeaderRef?.current?.getBoundingClientRect()?.height ?? 0 }}>
      <Row
        slotFirst={<NameComp title={title} />}
        slotOthers={<Gametitle ls={gameTitleList} />}
        slotOthersLen={gameTitleList.length} />
    </div>
  )
}

export default Header
