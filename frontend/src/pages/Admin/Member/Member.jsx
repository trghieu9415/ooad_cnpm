import { useSelector } from 'react-redux'
import Content from '../../../Components/Admin/components/Content'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { formatRegistrationTime } from '../../../helpers/formatRegistrationTime'
import { useEffect, useState } from 'react'
import Toast from '../../../Components/Toast'
import Pagination from '../../../Components/Pagination'
import { MdEdit } from 'react-icons/md'
import { AiOutlineExclamationCircle } from 'react-icons/ai'
import { CiLock } from 'react-icons/ci'
import { CiUnlock } from 'react-icons/ci'
import ActionMember from '../../../Components/Admin/components/ActionMember'
import { getAllMember, toggleAccountStateMember } from '../../../apis/Admin/adminMember.api'

export default function Member() {
  const darkMode = useSelector((state) => state.theme.darkMode)
  const queryClient = useQueryClient()
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState('')
  const [disabled, setDisabled] = useState()
  const [memberEditing, setMemberEditing] = useState(null)
  const [action, setAction] = useState('')
  //Card xem chi tiết
  const [isClose, setIsClose] = useState(false)

  const [currentPage, setCurrentPage] = useState(1)
  const memberPerPage = 5

  const { data, isLoading } = useQuery({
    queryKey: ['members', currentPage],
    queryFn: getAllMember,
    keepPreviousData: true,
    staleTime: 5 * 1000
  })

  // Phân trang
  const totalMember = data?.data.length || 0
  const indexOfLastMember = currentPage * memberPerPage
  const indexOfFirstMember = indexOfLastMember - memberPerPage
  const currentMember = data?.data.slice(indexOfFirstMember, indexOfLastMember)

  //cột của bảng
  const columns = ['Member', 'Username', 'Email', 'Phone', 'Reputation', 'Status', 'Register date', 'Actions']

  const toggleStatusMember = useMutation({
    mutationFn: (account_id) => toggleAccountStateMember(account_id),
    onSuccess: (data) => {
      queryClient.invalidateQueries(['members', currentPage])
      setStatus('success')
      setMessage(data.data.message)
    },
    onError: (error) => {
      setStatus('error')
      setMessage(error.message)
    }
  })

  const handleStatus = (account_id) => {
    toggleStatusMember.mutate(account_id)
  }

  const handleDetail = (member) => {
    setAction('detail')
    setDisabled(true)
    if (member) {
      setMemberEditing(member)
    }
    setIsClose(!isClose)
  }

  const handleEdit = (member) => {
    setAction('edit')
    setDisabled(false)
    if (member) {
      setMemberEditing(member)
    }
    setIsClose(!isClose)
    queryClient.invalidateQueries(['members', currentPage])
  }
  useEffect(() => {
    if (isClose) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [isClose])

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className={`${darkMode ? 'dark' : ''} `}>
      <div className='text-gray-500 bg-gray-100 p-4 sm:ml-64 flex gap-2 flex-col lg:flex-row translate-all duration-300 mt-14 dark:bg-gray-800'>
        <Content>
          <h4 className='mb-1 text-lg font-semibold text-gray-600 dark:text-gray-300'>Quản lí người dùng</h4>
          <div className='w-full overflow-hidden rounded-lg shadow-xs'>
            <div className='w-full overflow-x-auto'>
              <table className='w-full whitespace-no-wrap'>
                <thead>
                  <tr className='text-xs font-semibold tracking-wide text-left text-gray-500  uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800'>
                    {columns?.map((column, index) => (
                      <th key={index} className='px-4 py-3'>
                        {column}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className='bg-white divide-y dark:divide-gray-700 dark:bg-gray-800'>
                  {currentMember &&
                    currentMember.map((member) => (
                      <tr key={member.id} className='text-gray-700 dark:text-gray-400'>
                        <td className='px-4 py-3'>
                          <div className='flex items-center text-sm'>
                            <div className='relative hidden w-8 h-8 mr-3 rounded-full md:block'>
                              <img
                                className='object-cover w-full h-full rounded-full'
                                src='https://www.gravatar.com/avatar/999068a6dbcc836522fd6eb79bb9ad2b?s=48&d=identicon&r=PG&f=y&so-version=2'
                                alt=''
                                loading='lazy'
                              />
                              <div className='absolute inset-0 rounded-full shadow-inner' aria-hidden='true'></div>
                            </div>
                            <div>
                              <p className='font-semibold'>{member.name}</p>
                              <p className='text-xs text-gray-600 dark:text-gray-400'>Unemployed</p>
                            </div>
                          </div>
                        </td>
                        <td className='px-4 py-3 text-sm'>{member.Account.username}</td>

                        <td className='px-4 py-3 text-sm'>{member.email}</td>
                        <td className='px-4 py-3 text-sm'>{member.phone}</td>

                        <td className='px-4 py-3 text-sm'>{member.reputation}</td>
                        <td className='px-4 py-3 text-xs'>
                          {member.Account.status === 'Active' ? (
                            <span className='px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-full dark:text-white dark:bg-green-600'>
                              {member.Account.status}
                            </span>
                          ) : (
                            <span className='px-2 py-1 font-semibold leading-tight text-orange-700 bg-orange-100 rounded-full dark:text-white dark:bg-orange-600'>
                              {member.Account.status}
                            </span>
                          )}
                        </td>
                        <td className='px-4 py-3 text-sm'>
                          {formatRegistrationTime(member.Account.registration_time)}
                        </td>
                        <td className='px-4 py-3'>
                          <div className='flex items-center space-x-4 text-sm'>
                            <button
                              className='flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-purple-600 rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray'
                              aria-label='View Detail'
                              onClick={() => {
                                handleDetail(member)
                              }}
                            >
                              <AiOutlineExclamationCircle className='size-6' />
                            </button>
                            <button
                              className='flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-purple-600 rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray'
                              aria-label='Edit'
                              onClick={() => {
                                handleEdit(member)
                              }}
                            >
                              <MdEdit className='size-6' />
                            </button>
                            <button
                              onClick={() => handleStatus(member.account_id)}
                              className='flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-purple-600 rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray'
                              aria-label='Delete'
                            >
                              {member.Account.status === 'Banned' ? (
                                <CiUnlock className='size-6' />
                              ) : (
                                <CiLock className='size-6' />
                              )}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
            <Pagination
              indexOfFirst={indexOfFirstMember}
              indexOfLast={indexOfLastMember}
              totalPost={totalMember}
              currentPage={currentPage}
              postPerPage={memberPerPage}
              setCurrentPage={setCurrentPage}
            />
          </div>
          <div className='overflow-hidden'>
            {isClose && (
              <ActionMember
                handleDetail={action === 'detail' ? handleDetail : handleEdit}
                member={memberEditing}
                action={action}
                disabled={disabled}
              />
            )}
          </div>
        </Content>
      </div>
      {message && <Toast status={status} message={message} />}
    </div>
  )
}
