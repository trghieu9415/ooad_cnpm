import React from 'react'
import { useSelector } from 'react-redux'
import Content from '../../../Components/Admin/components/Content'
import { MdEdit } from 'react-icons/md'

const Badge = () => {
  const darkMode = useSelector((state) => state.theme.darkMode)
  const columns = ['Badge name', 'Condition', 'Actions']

  return (
    <div className={`${darkMode ? 'dark' : ''}`}>
      <div className='text-gray-500 bg-gray-100 p-4 sm:ml-64 flex gap-2 flex-col lg:flex-row translate-all duration-300 mt-14 dark:bg-gray-800'>
        <Content>
          <h4 className='mt-1 mb-1 text-lg font-semibold text-gray-600 dark:text-gray-300'>Quản lí danh hiệu</h4>
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
                  <tr className='text-gray-700 dark:text-gray-400'>
                    <td className='px-4 py-3'>
                      <div className='flex items-center text-sm'>
                        <div>
                          <p className='font-semibold'>Câu Hỏi Hay </p>
                        </div>
                      </div>
                    </td>
                    {/*eslint-disable-next-line react/no-unescaped-entities*/}
                    <td className='px-4 py-3 text-xs'>Câu hỏi nhận được ít nhất 5 phiếu bầu "Hữu ích" (Upvotes). </td>
                    <td className='px-4 py-3'>
                      <div className='flex items-center space-x-4 text-sm'>
                        {/* <button
                      className='flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-purple-600 rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray'
                      aria-label='Edit'
                    >
                      <svg className='w-5 h-5' aria-hidden='true' fill='currentColor' viewBox='0 0 20 20'>
                        <path d='M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z'></path>
                      </svg>
                    </button> */}
                        <button
                          className='flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-purple-600 rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray'
                          aria-label='Edit'
                        >
                          <MdEdit className='size-6' />
                        </button>
                        <button
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

                  <tr className='text-gray-700 dark:text-gray-400'>
                    <td className='px-4 py-3'>
                      <div className='flex items-center text-sm'>
                        <div>
                          <p className='font-semibold'>Câu Trả Lời Hay</p>
                        </div>
                      </div>
                    </td>
                    <td className='px-4 py-3 text-xs'>
                      {/*eslint-disable-next-line react/no-unescaped-entities*/}
                      Câu trả lời nhận được ít nhất 10 phiếu bầu "Hữu ích" (Upvotes).
                    </td>

                    <td className='px-4 py-3'>
                      <div className='flex items-center space-x-4 text-sm'>
                        {/* <button
                      className='flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-purple-600 rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray'
                      aria-label='Edit'
                    >
                      <svg className='w-5 h-5' aria-hidden='true' fill='currentColor' viewBox='0 0 20 20'>
                        <path d='M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z'></path>
                      </svg>
                    </button> */}
                        <button
                          className='flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-purple-600 rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray'
                          aria-label='Edit'
                        >
                          <MdEdit className='size-6' />
                        </button>
                        <button
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
                </tbody>
              </table>
            </div>
            <div className='grid px-4 py-3 text-xs font-semibold tracking-wide text-gray-500 uppercase border-t dark:border-gray-700 bg-gray-50 sm:grid-cols-9 dark:text-gray-400 dark:bg-gray-800'>
              <span className='flex items-center col-span-3'>Showing 21-30 of 100</span>
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
                    <li>
                      <button className='px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple'>1</button>
                    </li>
                    <li>
                      <button className='px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple'>2</button>
                    </li>
                    <li>
                      <button className='px-3 py-1 text-white transition-colors duration-150 bg-purple-600 border border-r-0 border-purple-600 rounded-md focus:outline-none focus:shadow-outline-purple'>
                        3
                      </button>
                    </li>
                    <li>
                      <button className='px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple'>4</button>
                    </li>
                    <li>
                      <span className='px-3 py-1'>...</span>
                    </li>
                    <li>
                      <button className='px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple'>8</button>
                    </li>
                    <li>
                      <button className='px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple'>9</button>
                    </li>
                    <li>
                      <button
                        className='px-3 py-1 rounded-md rounded-r-lg focus:outline-none focus:shadow-outline-purple'
                        aria-label='Next'
                      >
                        <svg className='w-4 h-4 fill-current' aria-hidden='true' viewBox='0 0 20 20'>
                          <path
                            d='M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z'
                            clipRule='evenodd'
                            fillRule='evenodd'
                          ></path>
                        </svg>
                      </button>
                    </li>
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

export default Badge
