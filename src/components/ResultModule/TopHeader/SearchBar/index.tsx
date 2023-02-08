import React, { useCallback, useRef, useState, useEffect } from 'react'
import { useLeagueContext } from '../../store/league-context'
import { Search, SearchClearDark } from './svgSrc'
import styles from './SearchBar.module.scss'

let debounce: ReturnType<typeof setTimeout>
const timer: number = 300

type Props = {
  clickCallback?: () => void
}

const SearchBar: React.FC<Props> = ({ clickCallback }) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [isOnComposition, setIsOnComposition] = useState<boolean>(false)
  const { searchText, updateSearch } = useLeagueContext()

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
    typeof clickCallback === 'function' && clickCallback()
  }, [clickCallback, updateSearch])

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
          ref={inputRef}
          onCompositionStart={handleComposition}
          onCompositionUpdate={handleComposition}
          onCompositionEnd={handleComposition}
          onChange={handleChange}
          onKeyDown={handleKeyDown} />
        <div className={styles.icon} onClick={resetHandler}>
          <SearchClearDark width='21px' height='21px' />
        </div>
      </div>
    </div>
  )
}

export default SearchBar
