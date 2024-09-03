import { useEffect } from 'react'

import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { fetchUsers } from '@/redux/slices/usersSlice'

import Input from '@/components/Input/Input'

import styles from './Table.module.scss'

const LoadingState = () => (
  <tr>
    <td colSpan={4}>Loading...</td>
  </tr>
)

const ErrorState = ({ error }: { error: string }) => (
  <tr>
    <td colSpan={4}>Error: {error}</td>
  </tr>
)

const NoUsersState = () => (
  <tr>
    <td colSpan={4}>No users available</td>
  </tr>
)

const Table = () => {
  const dispatch = useAppDispatch()
  const users = useAppSelector((state) => state.users.entities)
  const loading = useAppSelector((state) => state.users.loading)
  const error = useAppSelector((state) => state.users.error)

  useEffect(() => {
    dispatch(fetchUsers())
  }, [dispatch])

  const renderTableBody = () => {
    if (loading) return <LoadingState />
    if (error) return <ErrorState error={error} />
    if (users && users.length > 0) {
      return users.map((user) => (
        <tr key={user.id}>
          <td>{user.name}</td>
          <td>{user.username}</td>
          <td>{user.email}</td>
          <td>{user.phone}</td>
        </tr>
      ))
    }
    return <NoUsersState />
  }

  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <Input filterBy="name" />
            </td>
            <td>
              <Input filterBy="username" />
            </td>
            <td>
              <Input filterBy="email" />
            </td>
            <td>
              <Input filterBy="phone" />
            </td>
          </tr>
          {renderTableBody()}
        </tbody>
      </table>
    </div>
  )
}

export default Table
