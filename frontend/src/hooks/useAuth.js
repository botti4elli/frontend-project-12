import { useSelector } from 'react-redux'
const useAuth = () => {
  const { username } = useSelector(state => state.auth)
  return { username }
}
export default useAuth
