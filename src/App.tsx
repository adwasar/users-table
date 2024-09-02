import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from './redux/hooks'
import { fetchUsers } from './redux/slices/usersSlice'

const App = () => {
  const dispatch = useAppDispatch()
  const users = useAppSelector((state) => state.users.entities)
  const loading = useAppSelector((state) => state.users.loading)
  const error = useAppSelector((state) => state.users.error)

  useEffect(() => {
    dispatch(fetchUsers())
  }, [dispatch])

  return (
    <>
      <h1>Init project</h1>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {users && users.length > 0 ? (
        <ul>
          {users.map((user) => (
            <li key={user.username}>{user.name}</li>
          ))}
        </ul>
      ) : (
        <p>No users available</p>
      )}
    </>
  )
}

export default App
