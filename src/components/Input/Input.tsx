import { FC } from 'react'

import searchIcon from '@/assets/search.svg'

import styles from './Input.module.scss'

type filterType = 'name' | 'username' | 'email' | 'phone'

interface InputProps {
  filterBy: filterType
}

const Input: FC<InputProps> = () => {
  return (
    <div className={styles.container}>
      <input className={styles.input} type="text" placeholder='Search...' />
      <img className={styles.search_icon} src={searchIcon} alt="#" />
    </div>
  )
}

export default Input
