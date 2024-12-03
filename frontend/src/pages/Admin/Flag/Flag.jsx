import React from 'react'
import { useSelector } from 'react-redux'
import Content from '../../../Components/Admin/components/Content'
import { FaCheck, FaTimes } from 'react-icons/fa'

const Flag = () => {
  const darkMode = useSelector((state) => state.theme.darkMode)
  const columns = ['Type', 'Content', 'Member', 'Un Flag']

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
                  <tr className='text-gray-700 dark:text-gray-400'>
                    <td className='px-4 py-3'>
                      <div className='flex items-center text-sm'>
                        <div>
                          <p className='font-semibold'>Flag Câu Hỏi</p>
                        </div>
                      </div>
                    </td>
                    {/*eslint-disable-next-line react/no-unescaped-entities*/}
                    <td className='px-4 py-3 text-xs'>Câu hỏi nhận được ít nhất 5 phiếu bầu "Hữu ích".</td>
                    <td className='px-4 py-3'>
                      <div className='flex items-center text-sm'>
                        <p className='font-semibold'>Nguyễn Văn A</p>
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
                  <tr className='text-gray-700 dark:text-gray-400'>
                    <td className='px-4 py-3'>
                      <div className='flex items-center text-sm'>
                        <div>
                          <p className='font-semibold'>Flag Câu Trả Lời</p>
                        </div>
                      </div>
                    </td>
                    {/*eslint-disable-next-line react/no-unescaped-entities*/}
                    <td className='px-4 py-3 text-xs'>Câu trả lời nhận được ít nhất 10 phiếu bầu "Hữu ích".</td>
                    <td className='px-4 py-3'>
                      <div className='flex items-center text-sm'>
                        <p className='font-semibold'>Trần Thị B</p>
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

                  {/* Flag Comment */}
                  <tr className='text-gray-700 dark:text-gray-400'>
                    <td className='px-4 py-3'>
                      <div className='flex items-center text-sm'>
                        <div>
                          <p className='font-semibold'>Flag Bình Luận</p>
                        </div>
                      </div>
                    </td>
                    <td className='px-4 py-3 text-xs'>Bình luận vi phạm quy tắc cộng đồng.</td>
                    <td className='px-4 py-3'>
                      <div className='flex items-center text-sm'>
                        <p className='font-semibold'>Lê Văn C</p>
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
                </tbody>
              </table>
            </div>
            <div className='grid px-4 py-3 text-xs font-semibold tracking-wide text-gray-500 uppercase border-t dark:border-gray-700 bg-gray-50 sm:grid-cols-9 dark:text-gray-400 dark:bg-gray-800'>
              <span className='flex items-center col-span-3'>Hiển thị 21-30 trên 100</span>
              <span className='col-span-2'></span>
              <span className='flex col-span-4 mt-2 sm:mt-auto sm:justify-end'>
                <nav aria-label='Table navigation'>
                  <ul className='inline-flex items-center'>
                    <li>
                      <button
                        className='px-3 py-1 rounded-md rounded-l-lg focus:outline-none focus:shadow-outline-purple'
                        aria-label='Previous'
                      >
                        <svg className='w-4 h-4 fill-current' aria-hidden='true' viewBox='0 0 20 20'>
                          <path
                            d='M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z'
                            clipRule='evenodd'
                            fillRule='evenodd'
                          ></path>
                        </svg>
                      </button>
                    </li>
                    {/* Pagination code here */}
                  </ul>
                </nav>
              </span>
            </div>
          </div>
        </Content>
      </div>
    </div>
  )
}

export default Flag
