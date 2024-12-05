import { useSelector } from 'react-redux'
import Content from '../../../Components/Admin/components/Content'
import { FaTimes } from 'react-icons/fa'
import { useQuery } from '@tanstack/react-query'
import { getAllFlagContent } from '../../../apis/Admin/adminFlag.api'

const Flag = () => {
  const darkMode = useSelector((state) => state.theme.darkMode)
  const columns = ['Type', 'Content', 'Member', 'Un Flag']

  const { data } = useQuery({
    queryKey: ['flags'],
    queryFn: getAllFlagContent
  })
  let flagData
  if (data) {
    flagData = data.data
    console.log(flagData)
  }

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
                  {/* Flag Question */}
                  {flagData &&
                    flagData.data.map((flag) => {
                      return (
                        <tr className='text-gray-700 dark:text-gray-400' key={flag.id}>
                          <td className='px-4 py-3'>
                            <div className='flex items-center text-sm'>
                              <div>
                                <p className='font-semibold'>{flag.related_type}</p>
                              </div>
                            </div>
                          </td>
                          {/*eslint-disable-next-line react/no-unescaped-entities*/}
                          {}
                          <td className='px-4 py-3 text-xs'>
                            {flag.related_type === 'Comment' && flag.comment.comment_text}
                            {flag.related_type === 'Answer' && flag.answer.answer_text}
                            {flag.related_type === 'Question' && flag.question.question_text}
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
                                className='flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-red-600 rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray'
                                aria-label='Ignore'
                              >
                                <FaTimes className='text-xl' />
                              </button>
                            </div>
                          </td>
                        </tr>
                      )
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </Content>
      </div>
    </div>
  )
}

export default Flag
