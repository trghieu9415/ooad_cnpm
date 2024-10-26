import React from 'react'
import { useSelector } from 'react-redux'
import Content from '../../../Components/Admin/components/Content'

const Answer = () => {
  const darkMode = useSelector((state) => state.theme.darkMode)
  //cột
  const columns = ['Answer content', 'Question', 'Author', 'Date up', 'Actions']
  return (
    <div className={`${darkMode ? 'dark' : ''}`}>
      <div className='text-gray-500 bg-gray-100 p-4 sm:ml-64 flex gap-2 flex-col lg:flex-row translate-all duration-300 mt-14 dark:bg-gray-800'>
        <Content>
          <h4 className='mt-1 mb-1 text-lg font-semibold text-gray-600 dark:text-gray-300'>Quản lí câu hỏi</h4>
          <div className='flex items-start mb-4'>
            <label className='flex items-center mr-4 '>
              <input
                type='checkbox'
                className={`appearance-none h-4 w-4 mr-1 rounded border-2 transition duration-300 ${
                  darkMode
                    ? 'bg-gray-700 border-gray-600 checked:bg-purple-500 checked:border-purple-500'
                    : 'bg-white border-gray-300 checked:bg-purple-600 checked:border-purple-600'
                } focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                  darkMode
                    ? 'focus:ring-offset-gray-800 focus:ring-purple-500'
                    : 'focus:ring-offset-white focus:ring-purple-600'
                }`}
              />
              Câu trả lời có gắn cờ
            </label>
            <label className='flex items-center'>
              <input
                type='checkbox'
                className={`appearance-none h-4 w-4 mr-1 rounded border-2 transition duration-300 ${
                  darkMode
                    ? 'bg-gray-700 border-gray-600 checked:bg-purple-500 checked:border-purple-500'
                    : 'bg-white border-gray-300 checked:bg-purple-600 checked:border-purple-600'
                } focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                  darkMode
                    ? 'focus:ring-offset-gray-800 focus:ring-purple-500'
                    : 'focus:ring-offset-white focus:ring-purple-600'
                }`}
              />
              Câu trả lời không gắn cờ
            </label>
          </div>

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
                          <p className='font-semibold'>
                            Property station at write such system. Also beat every win company under nor push.
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className='px-4 py-3 text-xs'>
                      <button
                        className='flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-purple-600 rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray'
                        aria-label='forward'
                      >
                        <svg className='w-6 h-6' aria-hidden='true' fill='none' viewBox='0 0 24 24'>
                          <path
                            d='M8.0001 10.1308C9.61344 8.97671 11.4547 8.57075 13 8.57075V6.22616C13 5.26817 13 4.78917 13.2952 4.65662C13.5903 4.52407 13.9484 4.8423 14.6644 5.47875L18.6367 9.00968C20.2053 10.404 20.9896 11.1012 20.9896 11.9993C20.9896 12.8975 20.2053 13.5946 18.6367 14.989L14.6644 18.5199C13.9484 19.1563 13.5903 19.4746 13.2952 19.342C13 19.2095 13 18.7305 13 17.7725V15.4279C9.4 15.4279 5.5 17.1422 4 19.9993C4 17.5676 4.37726 15.621 5.0001 14.0735'
                            stroke='currentColor'
                            strokeWidth='1.5'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                          />
                        </svg>
                      </button>
                    </td>
                    <td className='px-4 py-3 text-sm'>Huy Hoang</td>
                    <td className='px-4 py-3 text-sm'>6/10/2020</td>
                    <td className='px-4 py-3 text-xs'>
                      <span className='px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-full dark:text-white dark:bg-green-600'>
                        Yes
                      </span>
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
                          <p className='font-semibold'>
                            Property station at write such system. Also beat every win company under nor push.
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className='px-4 py-3 text-xs'>
                      <button
                        className='flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-purple-600 rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray'
                        aria-label='forward'
                      >
                        <svg className='w-6 h-6' aria-hidden='true' fill='none' viewBox='0 0 24 24'>
                          <path
                            d='M8.0001 10.1308C9.61344 8.97671 11.4547 8.57075 13 8.57075V6.22616C13 5.26817 13 4.78917 13.2952 4.65662C13.5903 4.52407 13.9484 4.8423 14.6644 5.47875L18.6367 9.00968C20.2053 10.404 20.9896 11.1012 20.9896 11.9993C20.9896 12.8975 20.2053 13.5946 18.6367 14.989L14.6644 18.5199C13.9484 19.1563 13.5903 19.4746 13.2952 19.342C13 19.2095 13 18.7305 13 17.7725V15.4279C9.4 15.4279 5.5 17.1422 4 19.9993C4 17.5676 4.37726 15.621 5.0001 14.0735'
                            stroke='currentColor'
                            strokeWidth='1.5'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                          />
                        </svg>
                      </button>
                    </td>
                    <td className='px-4 py-3 text-sm'>Huy Hoang</td>
                    <td className='px-4 py-3 text-sm'>6/10/2020</td>
                    <td className='px-4 py-3 text-xs'>
                      <span className='px-2 py-1 font-semibold leading-tight text-orange-700 bg-orange-100 rounded-full dark:text-white dark:bg-orange-600'>
                        No
                      </span>
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

export default Answer
