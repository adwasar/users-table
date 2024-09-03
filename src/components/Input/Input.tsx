import { ChangeEvent, FC, useEffect, useState } from 'react'

import searchIcon from '@/assets/search.svg'

import { useAppDispatch } from '@/redux/hooks'
import {
  filterByName,
  filterByUsername,
  filterByEmail,
  filterByPhone,
} from '@/redux/slices/usersSlice'

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
  }

  useEffect(() => {
    switch (filterBy) {
      case 'name':
        dispatch(filterByName(inputValue))
        break
      case 'username':
        dispatch(filterByUsername(inputValue))
        break
      case 'email':
        dispatch(filterByEmail(inputValue))
        break
      case 'phone':
        dispatch(filterByPhone(inputValue))
        break
    }
  }, [dispatch, filterBy, inputValue])

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
