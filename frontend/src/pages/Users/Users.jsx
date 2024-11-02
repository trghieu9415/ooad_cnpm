import { useNavigate, useParams } from 'react-router-dom'
import Saves from './Saves'
import AllUsers from './All'
import Profile from './Profile'
import ListQuestion from './ListQuestion'
import UserLayout from '../../layouts/UserLayout'
import EditProfile from './Edit'

const Users = () => {
  const { slug } = useParams()
  const navigate = useNavigate()

  const handleUserPage = () => {
    switch (slug) {
      case 'all':
        return <AllUsers />
      case 'saves':
        return <Saves />
      case 'questions':
        return <ListQuestion />
      case 'profile':
        return <Profile />
      case 'edit-profile':
        return <EditProfile />
      default:
        navigate('/not-found')
    }
  }

  return <div>{slug !== 'all' ? <UserLayout>{handleUserPage()}</UserLayout> : handleUserPage()}</div>
}

export default Users
