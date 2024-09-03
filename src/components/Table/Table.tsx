import { useEffect } from 'react'

import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { fetchUsers } from '@/redux/slices/usersSlice'

import styles from './Table.module.scss'

const Table = () => {
  const dispatch = useAppDispatch()
  const users = useAppSelector((state) => state.users.entities)
  const loading = useAppSelector((state) => state.users.loading)
  const error = useAppSelector((state) => state.users.error)

  useEffect(() => {
    dispatch(fetchUsers())
  }, [dispatch])

  return (
    <div className={styles.wrapper}>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {users && users.length > 0 ? (
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
            {users.map((el) => (
              <tr key={el.id}>
                <td>{el.name}</td>
                <td>{el.username}</td>
                <td>{el.email}</td>
                <td>{el.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No users available</p>
      )}
    </div>
  )
}

export default Table
