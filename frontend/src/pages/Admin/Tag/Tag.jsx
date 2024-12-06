import Content from '../../../Components/Admin/components/Content'
import { useSelector } from 'react-redux'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { deleteTag, getAllTags } from '../../../apis/Admin/adminTag.api'
import { useState } from 'react'
import ActionTag from './ActionTag'
import Pagination from '../../../Components/Pagination'
import { toast } from 'react-toastify'
import { getQuestionsByTag } from '../../../apis/Admin/adminQuestion.api'

const Tag = () => {
  const queryClient = useQueryClient()
  const [isClose, setIsClose] = useState(false)
  const [action, setAction] = useState('')
  const [tagEdit, setTagEdit] = useState(null)
  const darkMode = useSelector((state) => state.theme.darkMode)
  const columns = ['Tag name', 'Description', 'Actions']
  const [currentPage, setCurrentPage] = useState(1)

  const tagPerPage = 5

  const { data } = useQuery({
    queryKey: ['tags'],
    queryFn: getAllTags
  })

  const deleteTagMutation = useMutation({
    mutationFn: (id) => deleteTag(id)
  })

  const totalTag = data?.data.length || 0
  const indexOfLastTag = currentPage * tagPerPage
  const indexOfFirstTag = indexOfLastTag - tagPerPage
  const currentTag = data?.data.slice(indexOfFirstTag, indexOfLastTag)

  const handleAdd = () => {
    setAction('add')
    setTagEdit(null)
    setIsClose(!isClose)
    queryClient.invalidateQueries('tags') // Sử dụng invalidateQueries thay vì gọi queryClient trực tiếp
  }

  const handleEdit = (tag) => {
    setTagEdit(tag)
    setAction('edit')
    setIsClose(!isClose)
    queryClient.invalidateQueries('tags')
  }
  // Hàm kiểm tra xem tag có câu hỏi nào sử dụng không
  const checkTagHasQuestions = async (idTag) => {
    try {
      const { data: questions } = await getQuestionsByTag(idTag)
      return questions.length > 0
    } catch (error) {
      toast.error('Có lỗi xảy ra khi kiểm tra câu hỏi!')
      return false
    }
  }
  console.log(checkTagHasQuestions('e069d464-efe5-4596-8dcc-170be32830fc'))

  const handleDelete = async (idTag) => {
    const hasQuestions = await checkTagHasQuestions(idTag)

    if (hasQuestions) {
      alert('Không thể xóa tag vì có câu hỏi đang sử dụng tag này!')
    } else {
      if (window.confirm('Bạn có chắc chắn muốn xóa Tag này?')) {
        // Thực hiện xóa tag
        deleteTagMutation.mutate(idTag, {
          onSuccess: () => {
            // Sau khi xóa thành công, làm mới danh sách tags
            alert('Xóa gắn thẻ thành công')
            queryClient.invalidateQueries('tags') // Invalidate dữ liệu để refetch lại
          },
          onError: () => {
            toast.error('Có lỗi xảy ra khi xóa gắn thẻ!')
          }
        })
      }
    }
  }

  return (
    <div className={`${darkMode ? 'dark' : ''}`}>
      <div className='text-gray-500 bg-gray-100 p-4 sm:ml-64 flex gap-2 flex-col lg:flex-row translate-all duration-300 mt-14 dark:bg-gray-800'>
        <Content>
          <div>
            <h4 className='mt-1 mb-1 text-lg font-semibold text-gray-600 dark:text-gray-300'>Quản lí thẻ gắn</h4>
            <button
              className='border-2 border-purple-500 bg-white hover:bg-purple-500 hover:text-white text-black py-1 px-3 rounded-sm shadow-sm mr-6'
              onClick={handleAdd}
            >
              Thêm gắn thẻ
            </button>
          </div>
          <div className='w-full overflow-hidden rounded-lg shadow-xs'>
            <div className='w-full overflow-x-auto'>
              <table className='w-full whitespace-no-wrap'>
                <thead>
                  <tr className='text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800'>
                    {columns.map((column, index) => (
                      <th key={index} className='px-4 py-3'>
                        {column}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className='bg-white divide-y dark:divide-gray-700 dark:bg-gray-800'>
                  {currentTag &&
                    currentTag.map((tag) => (
                      <tr className='text-gray-700 dark:text-gray-400' key={tag.id}>
                        <td className='px-4 py-3'>
                          <div className='flex items-center text-sm'>
                            <div>
                              <p className='font-semibold'>{tag.name}</p>
                            </div>
                          </div>
                        </td>
                        <td className='px-4 py-3 text-xs'>{tag.description}</td>
                        {/* <td className='px-4 py-3 text-xs'>
                          <span className='px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-full dark:text-white dark:bg-green-600'>
                            Yes
                          </span>
                        </td> */}
                        <td className='px-4 py-3'>
                          <div className='flex items-center space-x-4 text-sm'>
                            <button
                              className='flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-purple-600 rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray'
                              aria-label='Edit'
                              onClick={() => handleEdit(tag)}
                            >
                              <svg className='w-5 h-5' aria-hidden='true' fill='currentColor' viewBox='0 0 20 20'>
                                <path d='M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z'></path>
                              </svg>
                            </button>
                            <button
                              onClick={() => handleDelete(tag.id)}
                              className='flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-purple-600 rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray'
                              aria-label='Delete'
                            >
                              <svg className='w-5 h-5' aria-hidden='true' fill='currentColor' viewBox='0 0 20 20'>
                                <path
                                  fillRule='evenodd'
                                  d='M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z'
                                  clipRule='evenodd'
                                ></path>
                              </svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
            <Pagination
              indexOfFirst={indexOfFirstTag}
              indexOfLast={indexOfLastTag}
              totalPost={totalTag}
              currentPage={currentPage}
              postPerPage={tagPerPage}
              setCurrentPage={setCurrentPage}
            />
          </div>
          <div className='overflow-hidden'>
            {isClose && <ActionTag openForm={() => setIsClose(false)} action={action} tagEdit={tagEdit} />}
          </div>
        </Content>
      </div>
    </div>
  )
}

export default Tag
