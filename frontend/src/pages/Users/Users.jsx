import { useNavigate, useParams } from 'react-router-dom'
import Saves from './Saves'
import AllUsers from './All'
import Profile from './Profile'
import ListQuestion from './ListQuestion'
import UserLayout from '../../layouts/UserLayout'

const Users = () => {
  const { slug, feature } = useParams()
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
        if (feature === 'edit') {
          return <div>Edit Profile</div>
        }
        // else if (feature === 'reports') {
        //   return <div>Dashboard Reports Feature</div>
        // }
        return <Profile />
      default:
        navigate('/unauthorized')
    }
  }

  return <div>{slug !== 'all' ? <UserLayout>{handleUserPage()}</UserLayout> : handleUserPage()}</div>
}

export default Users
