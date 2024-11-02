import { useLocation, useNavigate, useParams } from 'react-router-dom'
import Saves from './Saves'
import AllUsers from './All'
import Profile from './Profile'
import ListQuestion from './ListQuestion'
import UserLayout from '../../layouts/UserLayout'
import EditProfile from './Edit'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { memberById } from '../../apis/member.api'

const Users = () => {
  const { slug } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const currentUser = useSelector((state) => state.user)
  const [data, setData] = useState(currentUser)
  const [isOtherMember, setIsOtherMember] = useState(true)
  const queryParams = new URLSearchParams(location.search)
  const id = queryParams.get('id')
  useEffect(() => {
    const fetchMemberById = async () => {
      try {
        const response = await memberById(id)
        setData(response.data)
        setIsOtherMember(false)
      } catch (error) {
        console.error('Error fetching the member data:', error)
      }
    }
    if (id) {
      fetchMemberById()
    } else {
      setData(currentUser)
      setIsOtherMember(true)
    }
  }, [id, currentUser])

  const handleUserPage = () => {
    switch (slug) {
      case 'all':
        return <AllUsers />
      case 'saves':
        return <Saves />
      case 'questions':
        return <ListQuestion />
      case 'profile':
        return <Profile user={data} />
      case 'edit-profile':
        return <EditProfile />
      default:
        navigate('/not-found')
    }
  }

  return (
    <div>
      {slug !== 'all' ? (
        <UserLayout user={data} isOtherMember={isOtherMember} idMember={id}>
          {handleUserPage()}
        </UserLayout>
      ) : (
        handleUserPage()
      )}
    </div>
  )
}

export default Users
