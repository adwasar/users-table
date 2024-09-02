/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from './redux/hooks'

import { initUsers } from './redux/slices/usersSlice'

const App = () => {
  const dispatch = useAppDispatch()
  const users = useAppSelector((state) => state.users.value)

  useEffect(() => {
    const fetchUsersData = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users')
        const data = await response.json()
        const filteredData = data.map((user: any) => ({
          name: user.name,
          username: user.username,
          email: user.email,
          phone: user.phone,
        }))
        dispatch(initUsers(filteredData))
      } catch (error) {
        console.error('Error loading data:', error)
      }
    }
    fetchUsersData()
  }, [dispatch])

  return (
    <>
      <h1>Init project</h1>
      {users && users.map((el: any) => el.name)}
    </>
  )
}

export default App
