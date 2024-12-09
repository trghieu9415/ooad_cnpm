import { useSelector } from 'react-redux'
import Content from '../../../Components/Admin/components/Content'
import { FaTimes } from 'react-icons/fa'
import { QueryClient, useMutation, useQuery } from '@tanstack/react-query'
import { getAllFlagContent } from '../../../apis/Admin/adminFlag.api'
import { getMemberById, toggleAccountStateMember } from '../../../apis/Admin/adminMember.api'
import { useEffect, useState } from 'react'
import Pagination from '../../../Components/Pagination'
import { memberFlagQuestion, memberFlagComment, memberFlagAnswer } from '../../../apis/Admin/adminMember.api'
import { CiLock, CiUnlock } from 'react-icons/ci'
const Flag = () => {
  const darkMode = useSelector((state) => state.theme.darkMode)
  const columns = ['Type', 'Content', 'Member', 'Accused member', 'Action']

  const { data } = useQuery({
    queryKey: ['flags'],
    queryFn: getAllFlagContent
  })

  const [flagData, setFlagData] = useState([])
  const fetchFlagDataWithMembers = async (flags) => {
    const updatedFlags = await Promise.all(
      flags.map(async (flag) => {
        if (!flag.member_id) {
          flag.member_name = 'Unknown'
          flag.accountStatus = 'Active'
          return flag
        }

        try {
          const memberResponse = await getMemberById(flag.member_id)
          flag.member_name = memberResponse.data?.name || 'Unknown'
          let status
          if (flag.related_type === 'Question') {
            status = await getMemberById(flag.question.member_id)
          } else if (flag.related_type === 'Answer') {
            status = await getMemberById(flag.answer.member_id)
          } else if (flag.related_type === 'Comment') {
            status = await getMemberById(flag.comment.member_id)
          }
          flag.accountStatus = status?.data?.Account?.Status || 'Active'
        } catch (err) {
          flag.member_name = 'Unknown'
          flag.accountStatus = 'Active'
        }

        return flag
      })
    )

    return updatedFlags
  }

  useEffect(() => {
    if (data && data.data) {
      const loadFlagData = async () => {
        const updatedFlags = await fetchFlagDataWithMembers(data.data.data)
        setFlagData(updatedFlags)
      }
      loadFlagData()
    }
  }, [data])

  const [currentPage, setCurrentPage] = useState(1)
  const FlagsPerPage = 5
  const indexOfLastFlags = currentPage * FlagsPerPage
  const indexOfFirstFlags = indexOfLastFlags - FlagsPerPage
  const totalFlags = flagData.length
  const currentFlag = flagData.slice(indexOfFirstFlags, indexOfLastFlags)
  const toggleStatusMember = useMutation({
    mutationFn: (account_id) => toggleAccountStateMember(account_id),
    onSuccess: (data, account_id) => {
      setFlagData((prevFlags) =>
        prevFlags.map((flag) =>
          flag.comment?.member.account_id === account_id ||
          flag.question?.member.account_id === account_id ||
          flag.answer?.member.account_id === account_id
            ? { ...flag, accountStatus: flag.accountStatus === 'Banned' ? 'Active' : 'Banned' }
            : flag
        )
      )
    },
    onError: (error) => {
      console.log(error)
    }
  })
  const handleStatus = (account_id, currentStatus) => {
    const confirmMessage =
      currentStatus === 'Banned' ? 'Bạn có muốn mở khóa người dùng này?' : 'Bạn có muốn khóa người dùng này?'
    const isConfirmed = window.confirm(confirmMessage)
    if (isConfirmed) {
      toggleStatusMember.mutate(account_id)
    }
  }

  const handleFlag = async (flag) => {
    try {
      const confirmed = window.confirm('Bạn có chắc chắn muốn bỏ tố cáo này?')
      if (!confirmed) return
      let response
      const body = { flag_type: false }

      if (flag.related_type === 'Question') {
        response = await memberFlagQuestion(flag.question.id, body, flag.member_id)
      } else if (flag.related_type === 'Answer') {
        response = await memberFlagAnswer(flag.answer.id, body, flag.member_id)
      } else if (flag.related_type === 'Comment') {
        response = await memberFlagComment(flag.comment.id, body, flag.member_id)
      }

      if (response && response.status === 200) {
        setFlagData((prevFlags) => prevFlags.filter((item) => item.id !== flag.id))
        alert('Unflag thành công!')
      } else {
        alert('Unflag thất bại, vui lòng thử lại.')
      }
    } catch (error) {
      console.error('Lỗi khi unflag:', error)
      alert('Đã xảy ra lỗi, vui lòng thử lại.')
    }
  }
  console.log(currentFlag)
  return (
    <div className={`${darkMode ? 'dark' : ''}`}>
      <div className='text-gray-500 bg-gray-100 p-4 sm:ml-64 flex gap-2 flex-col lg:flex-row translate-all duration-300 mt-14 dark:bg-gray-800'>
        <Content>
          <h4 className='mt-1 mb-1 text-lg font-semibold text-gray-600 dark:text-gray-300'>Quản lý Cấm Cờ</h4>
          <div className='w-full overflow-hidden rounded-lg shadow-xs'>
            <div className='w-full overflow-x-auto'>
              <table className='w-full whitespace-no-wrap'>
                <thead>
                  <tr className='text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800'>
                    {columns?.map((column, index) => (
                      <th key={index} className='px-4 py-3'>
                        {column}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className='bg-white divide-y dark:divide-gray-700 dark:bg-gray-800'>
                  {currentFlag.map((flag) => (
                    <tr className='text-gray-700 dark:text-gray-400' key={flag.id}>
                      <td className='px-4 py-3'>
                        <div className='flex items-center text-sm'>
                          <div>
                            <p className='font-semibold'>{flag.related_type}</p>
                          </div>
                        </div>
                      </td>
                      <td className='px-4 py-3 text-xs'>
                        {flag.related_type === 'Comment' && flag.comment.comment_text}
                        {flag.related_type === 'Answer' && flag.answer.answer_text}
                        {flag.related_type === 'Question' && flag.question.question_text}
                      </td>
                      <td className='px-4 py-3'>
                        <div className='flex items-center text-sm'>
                          <p className='font-semibold'>{flag.member_name}</p>
                        </div>
                      </td>
                      <td className='px-4 py-3'>
                        <div className='flex items-center text-sm'>
                          <p className='font-semibold'>
                            {flag.related_type === 'Comment' && flag.comment.member.name}
                            {flag.related_type === 'Answer' && flag.answer.member.name}
                            {flag.related_type === 'Question' && flag.question.member.name}
                          </p>
                        </div>
                      </td>
                      <td className='px-4 py-3'>
                        <div className='flex items-center space-x-4 text-sm'>
                          <button
                            className='flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-purple-600 rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray'
                            aria-label='Ignore'
                            onClick={() => handleFlag(flag)} // Gọi hàm handleFlag
                          >
                            <FaTimes className='text-xl' />
                          </button>
                          <button
                            onClick={() => {
                              let account_id
                              if (flag.related_type === 'Question') {
                                account_id = flag.question.member.account_id
                              } else if (flag.related_type === 'Answer') {
                                account_id = flag.answer.member.account_id
                              } else if (flag.related_type === 'Comment') {
                                account_id = flag.comment.member.account_id
                              }

                              if (account_id) {
                                handleStatus(account_id, flag.accountStatus)
                              } else {
                                console.error('Không tìm thấy đối tượng hợp lệ trong flag.')
                              }
                            }}
                            className='flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-purple-600 rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray'
                            aria-label='Delete'
                          >
                            {flag.accountStatus === 'Banned' ? (
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
              indexOfFirst={indexOfFirstFlags}
              indexOfLast={indexOfLastFlags}
              totalPost={totalFlags}
              currentPage={currentPage}
              postPerPage={FlagsPerPage}
              setCurrentPage={setCurrentPage}
            />
          </div>
        </Content>
      </div>
    </div>
  )
}

export default Flag
