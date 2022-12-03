// @ts-nocheck
import styles from './Score.module.scss'
import cx from 'classnames'
import { ArrowUpDouble, ArrowDownDouble, ArrowUp, ArrowDown } from '@/sports/assets/vd004/icons'
import { ReactComponent as Label } from '@sport/components/WorldCupModule/svg/label.svg'
import React, { useEffect, useState, useContext, useCallback } from 'react'
import { BadgeType } from '@sport/components/WorldCupModule/utils'
import * as Flag from '@sport/components/WorldCupModule/components/Flag'
import FormatMessage from '@/sports/components/FormatMessage'

const showContext = React.createContext({
  show: true,
  toggleShow: () => {}
})

const RankAndTeamName = React.memo(props => {
  const { data } = props

  return (
    <div className={styles.rankAndTeamWrap}>
      <div className={styles.rankAndTeam}>
        <span className={styles.rankTitle}>
          <span style={{ marginLeft: '5px' }}>#</span>
        </span>
        <span className={styles.teamName}><FormatMessage msgCode='worldCup.teamName'/></span>
      </div>
      {Object.keys(data).map(item => {
        return (
          <div className={styles.rankAndTeamContent} key={item} style={{ width: '100%' }}>
            <div className={styles.groupNameWrap}>
              <div className={styles.groupIcon}>
                <Label />
              </div>
              <div className={styles.groupName}>
                <FormatMessage msgCode='worldCup.group' values={{ group: item }} />
              </div>
            </div>
            {data[item].map(team => {
              const id = team.team
              return (
                data[item].subShow.show && (
                  <div className={styles.rankAndCountryWrap} key={team.team}>
                    <div className={styles.rank}>
                      {team.lift === 'up' && <div className={styles.rankUp}></div>}
                      {team.lift === 'down' && <div className={styles.rankDown}></div>}
                      {team.lift === '' && <div className={styles.rankNormal}></div>}
                      <span className={styles.ranking}>{team.ranking}</span>
                    </div>
                    <div className={styles.countryWrap}>
                      <div className={styles.countryImg}>
                        <Flag.Rect id={id} width={14} type={BadgeType.flagRect}/>
                      </div>
                      <span className={styles.countryName}>
                        <FormatMessage msgCode={`wcteam_${team.team}`} />
                      </span>
                    </div>
                  </div>
                )
              )
            })}
          </div>
        )
      })}
    </div>
  )
})

const DetailInfo = props => {
  const { data } = props
  const detailTitle = {
    P: 'P',
    W: 'W',
    D: 'D',
    L: 'L',
    GA: 'GA',
    PTS: 'PTS'
  }
  return (
    <div className={styles.detailInfo}>
      <div className={cx(styles.infoTitle, styles.top)}>
        {Object.keys(detailTitle).map((title, idx) => {
          return (
            <div className={styles.title} key={title + idx}>
              {title}
            </div>
          )
        })}
      </div>
      {Object.keys(data).map(item => {
        return (
          <div key={item} style={{ width: '100%' }}>
            <div className={styles.groupEmpty}></div>
            {data[item].map(team => {
              return (
                data[item].subShow.show && (
                  <div className={styles.infoTitle} key={team.team}>
                    {Object.keys(detailTitle).map(title => {
                      return (
                        <div key={title} className={styles.title}>
                          {team[title]}
                        </div>
                      )
                    })}
                  </div>
                )
              )
            })}
          </div>
        )
      })}
    </div>
  )
}

const ArrowIcon = React.memo(props => {
  const { show, activeHander } = useContext(showContext)
  const { data, onToggle } = props

  useEffect(() => {
    Object.keys(data).map(item => {
      return onToggle(item, true)
    })
  }, [show])

  return (
    <div className={styles.arrowIconWrap} onClick={() => activeHander(!show)}>
      <div className={styles.arrowIcon}>{show ? <ArrowUpDouble /> : <ArrowDownDouble />}</div>
      {Object.keys(data).map((item, idx) => {
        return (
          <SubArrowIcon key={idx} data={data} item={item} idx={idx} onToggle={onToggle} />
        )
      })}
    </div>
  )
})

const SubArrowIcon = ({ data, item, idx, onToggle }) => {
  const [customHeight, setCustomHeight] = useState(0)
  const show = data[item].subShow.show
  const target = document.querySelectorAll('div[class*="rankAndTeamContent"]')[idx]
  useEffect(() => {
    if (target) {
      setCustomHeight(target.clientHeight)
      const targetList = document.querySelectorAll('div[class*="rankAndCountryWrap"]')
      targetList.forEach((item, idx) => {
        if (item.clientHeight) {
          document.querySelectorAll('div[class*="infoTitle"]')[idx + 1].style.height = `${item.clientHeight}px`
        }
      })
    }
  }, [show, target])

  useEffect(() => {
    if (customHeight) {
      document.querySelectorAll('div[class*="subArrowWrap"]')[idx].style.height = `${customHeight}px`
    }
  }, [customHeight])

  return (
    <div className={styles.subArrowWrap} key={item + idx} style={{ width: '100%' }}>
      <div
        className={styles.subArrowIcon}
        onClick={e => {
          e.stopPropagation()
          onToggle(item)
        }}
      >
        {data[item].subShow.show ? <ArrowUp /> : <ArrowDown />}
      </div>
      {data[item].map(team => {
        return data[item].subShow.show && <div key={team.team} className={styles.arrowEmpty}></div>
      })}
    </div>
  )
}

const Score = ({ jsonData = {} }) => {
  const [show, setShow] = useState(true)
  const [copyData, setCopyData] = useState(jsonData)
  const activeHander = useCallback(v => setShow(v), [])
  const contextVal = {
    show,
    activeHander
  }

  function toggle(item, toggleAll = false) {
    const newFakeData = { ...copyData }
    if (toggleAll) {
      newFakeData[item].subShow.show = show
    } else {
      newFakeData[item].subShow.show = !newFakeData[item].subShow.show
    }
    setCopyData(newFakeData)
  }

  useEffect(() => {
    setCopyData(jsonData)
  }, [jsonData])

  return (
    <>
      <div className={styles.scoreWrap}>
        <showContext.Provider value={contextVal}>
          <RankAndTeamName data={copyData} />
          <DetailInfo data={copyData} />
          <ArrowIcon data={copyData} onToggle={toggle} />
        </showContext.Provider>
      </div>
    </>
  )
}

export default Score
