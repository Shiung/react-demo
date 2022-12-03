import React, { useCallback, useRef, useState, useEffect } from 'react'
import { useWorldCupLeagueContext } from '../../store/league-context'
import { Search, SearchClearDark } from '@sportIcons/index'
import styles from '@sport/components/ResultModule/TopHeader/SearchBar/SearchBar.module.scss'

import FormatMessage from '@sport/components/FormatMessage'

let debounce: ReturnType<typeof setTimeout>
const timer: number = 300

type Props = {
  clickCallback?: () => void
}

const SearchBar: React.FC<Props> = ({ clickCallback }) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [isOnComposition, setIsOnComposition] = useState<boolean>(false)
  const { searchText, updateSearch } = useWorldCupLeagueContext()

  const handleComposition = useCallback((e: React.CompositionEvent<HTMLInputElement>) => {
    e.persist()
    if (e.type === 'compositionend') {

      const searchVal = (inputRef.current?.value ?? '').trim()
      updateSearch(searchVal)
      setIsOnComposition(false)
    } else {
      setIsOnComposition(true)
    }
  }, [updateSearch])

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    e.persist()

    clearTimeout(debounce)
    debounce = setTimeout(() => {
      if (!isOnComposition) {
        const searchVal = (inputRef.current?.value ?? '').trim()
        updateSearch(searchVal)
      }
    }, timer)
  }, [isOnComposition, updateSearch])

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    const searchVal = (inputRef.current?.value ?? '').trim()
    if (e.key === 'Enter' && !isOnComposition) {
      searchVal && updateSearch(searchVal)
    }
  }, [isOnComposition, updateSearch])

  const resetHandler = useCallback(() => {
    updateSearch('')
    // typeof clickCallback === 'function' && clickCallback() // 關閉尋狀態
  }, [updateSearch])

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.value = searchText
    }
  }, [searchText])

  return (
    <div className={styles.container}>
      <div className={styles.search}>
        <div className={styles.icon}>
          <Search width='18px' height='18px' />
        </div>
        <input
          type='text'
          inputMode='search'
          placeholder={FormatMessage({ msgCode: 'search.global.placeholder' })}
          ref={inputRef}
          onCompositionStart={handleComposition}
          onCompositionUpdate={handleComposition}
          onCompositionEnd={handleComposition}
          onChange={handleChange}
          onKeyDown={handleKeyDown} />
        {!!searchText && (
          <div className={styles.icon} onClick={resetHandler}>
            <SearchClearDark width='21px' height='21px' />
          </div>
        )}
      </div>
    </div>
  )
}

export default SearchBar
