import { ChangeEvent, FC, useState } from 'react'

import searchIcon from '@/assets/search.svg'

import { useAppDispatch } from '@/redux/hooks'
import { setFilter } from '@/redux/slices/usersSlice'

import styles from './Input.module.scss'

type filterType = 'name' | 'username' | 'email' | 'phone'

interface InputProps {
  filterBy: filterType
}

const Input: FC<InputProps> = ({ filterBy }) => {
  const [inputValue, setInputValue] = useState('')

  const dispatch = useAppDispatch()

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const targetValue = e.target.value
    setInputValue(targetValue)
    dispatch(setFilter({ filter: filterBy, value: targetValue }))
  }

  return (
    <div className={styles.container}>
      <input
        className={styles.input}
        type="text"
        placeholder="Search..."
        value={inputValue}
        onChange={handleChange}
      />
      <img className={styles.search_icon} src={searchIcon} alt="#" />
    </div>
  )
}

export default Input
