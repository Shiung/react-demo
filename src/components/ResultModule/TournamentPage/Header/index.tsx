import React, { useMemo } from 'react'
import cx from 'classnames'
import { useParams } from 'react-router-dom'
import { BallType } from '../../types'
import { Sid, ScoreBoxInSimpleConf } from '../../constants'
import Row from '../Row'
// import FormatMessage from '@/components/FormatMessage'
import styles from './Header.module.scss'

type Props = {
  title: string,
  TopHeaderRef: React.RefObject<HTMLDivElement>
}

const NameComp = ({ title }: { title: string }) => {
  return <div className={styles.name}>{title}</div>
}

const Gametitle = ({ ls }: { ls: { id: string, i18n: string }[] }) => {
  return (
    <>
      {useMemo(() => {
        return ls.map(({ id , i18n }) => {
          return id !== 'kickof'
            ? <div key={`${id}-${i18n}`} className={cx(styles.gameTitle, styles.normal)}>{i18n}{/* <FormatMessage msgCode={i18n} />*/}</div>
            : (
              <div key={`${id}-${i18n}`} className={cx(styles.gameTitle, styles.timeline)}>
                <div>
                  {/* <FormatMessage msgCode={i18n} /> */}
                  {i18n}
                </div>
              </div>
            )
        })
      }, [ls])}
    </>
  )
}

const Header: React.FC<Props> = ({ title, TopHeaderRef }) => {
  const { ballType } = useParams<{ ballType: BallType }>()
  const gameTitleList = ScoreBoxInSimpleConf[Sid[ballType]]
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
