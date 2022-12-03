import { useRef, useEffect } from 'react'
import styles from './GameCard.module.scss'
import cx from 'classnames'
import * as Header from './Header'
import * as Content from './Content'
import Vote from './Vote'
import GameContextProvider from './store/GameContext'

import { PageNameThird } from '../../constants'
import type {
  GameInfo
} from '../../types'

const ModalType = PageNameThird

type Props = {
  modal: PageNameThird | 'treeMap' | 'champion' | '3rdPlace',
  info: GameInfo,
  isReverse?: boolean,
  isShiftPos?: boolean,
  /** event shift position */
  isEventPage?: boolean,
  /** 使用投票功能 */
  useVote?: boolean
}

const GameCard: React.FC<Props> = ({ info, modal, isReverse, isShiftPos = false, isEventPage = false, useVote = false }) => {
  const domRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>
    const domEl = domRef.current
    if (isEventPage) {
      if (isShiftPos && domEl) {
        timer = setTimeout(() => {
          const offsetTpo = domEl.offsetTop
          window.scroll({ top: offsetTpo - 100 })
        }, 0)
      }
    } else {
      if (isShiftPos && domEl) {
        timer = setTimeout(() => {
          const offsetTpo = domEl.offsetTop
          window.scroll({ top: offsetTpo - 208 })
        }, 0)
      }
    }
    return () => {
      clearTimeout(timer)
    }
  }, [isShiftPos, isEventPage])

  return (
    <GameContextProvider apiData={info} isReverse={isReverse}>
      <div ref={domRef} className={cx(styles.wrapper, {
        [styles.modalOne]: modal === PageNameThird.scheduleName,
        [styles.modalTwo]: modal === PageNameThird.grouppingName,
        [styles.modalThree]: modal === PageNameThird.chartName,
        [styles.modalFour]: modal === 'treeMap' || modal === 'champion' ||  modal === '3rdPlace',
        [styles.hasVote]: useVote
      })}>
        {modal === PageNameThird.scheduleName && ( /** 賽程表 */
          <>
            <Header.ModalOne />
            <Content.ModalOne />
          </>
        )}
        {modal === PageNameThird.grouppingName && ( /** 小組表 */
          <>
            <Header.ModalTwo />
            <Content.ModalOne />
            {/* /** 投票功能 */ }
            {useVote && <Vote />}
          </>
        )}
        {modal === PageNameThird.chartName && ( /** 樹狀圖 */
          <>
            <Header.ModalThree />
            <Content.ModalTwo />
            {/* /** 投票功能 */ }
            {useVote && <Vote />}
          </>
        )}
        {modal === 'treeMap' && ( /** 樹狀圖 淘汰賽 */
          <>
            <Header.ModalTwo disableFav disableState />
            <Content.ModalThree />
            {/* /** 投票功能 */ }
            {useVote && <Vote />}
          </>
        )}
        {modal === 'champion' && ( /** 樹狀圖 淘汰賽 冠軍 */
          <>
            <Header.ModalFour isChampion />
            <Content.ModalThree isChampion />
            {useVote && <Vote isLast isChampion />}
            <div className={styles.footer}>
              <img src={require('../../image/champion.png').default} alt="footer" />
            </div>
          </>
        )}
        {modal === '3rdPlace' && ( /** 樹狀圖 淘汰賽 季軍 */
          <>
            <Header.ModalFour />
            <Content.ModalThree />
            {useVote ? <Vote isLast /> : (
              <div style={{ height: '20px' }}/>
            )}
          </>
        )}
      </div>
    </GameContextProvider>
  )
}

export { ModalType }
export default GameCard