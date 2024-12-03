import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
// import Profile from '../../../Components/Admin/Profile/Profile'
import Content from '../../../Components/Admin/components/Content'
import Chart from 'chart.js/auto'
import Pagination from '../../../Components/Pagination'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { getAllMember } from '../../../apis/admin/adminMember.api'
import { formatRegistrationTime } from '../../../helpers/formatRegistrationTime'
import { getAllTags } from '../../../apis/Admin/adminTag.api'
import { getAllQuestion } from '../../../apis/Admin/adminQuestion.api'

export default function HomeAdmin() {
  const [tags, setTags] = useState([])
  const [questions, setQuestions] = useState([])
  const [answers, setAnswers] = useState([])
  const [members, setMembers] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const memberPerPage = 5
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        const [membersResponse, questionsResponse, tagssResponse] = await Promise.all([
          getAllMember(),
          getAllQuestion(),
          getAllTags()
        ])
        setMembers(membersResponse.data)
        setQuestions(questionsResponse.data)
        setTags(tagssResponse.data)
      } catch (error) {
        console.error('Error fetching members:', error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [])
  useEffect(() => {
    const ctxPie = document.getElementById('pie').getContext('2d')
    const pieChart = new Chart(ctxPie, {
      type: 'pie',
      data: {
        labels: ['Questions', 'Answers', 'Members'],
        datasets: [
          {
            label: 'Revenue',
            data: [questions.length, 30, members.length],
            backgroundColor: ['#4299E1', '#38B2AC', '#805AD5']
          }
        ]
      },
      options: {
        maintainAspectRatio: false // Điều chỉnh tỉ lệ
      }
    })

    // Khởi tạo biểu đồ Line
    const ctxLine = document.getElementById('line').getContext('2d')
    const lineChart = new Chart(ctxLine, {
      type: 'line',
      data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
          {
            label: 'Questions',
            data: [65, 59, 80, 81, 56, 55, 40],
            borderColor: '#38B2AC',
            fill: false
          },
          {
            label: 'Answers',
            data: [28, 48, 40, 19, 86, 27, 90],
            borderColor: '#805AD5',
            fill: false
          }
        ]
      },
      options: {
        maintainAspectRatio: false
      }
    })
    return () => {
      pieChart.destroy()
      lineChart.destroy()
    }
  }, [members, questions])
  const totalMember = members?.length || 0
  const indexOfLastMember = currentPage * memberPerPage
  const indexOfFirstMember = indexOfLastMember - memberPerPage
  const currentMember = members?.slice(indexOfFirstMember, indexOfLastMember)
  // if (isLoading) return <div>Loading...</div>
  return (
    <div className={`100 ? 'dark' : ''}`}>
      <div className='text-gray-500 bg-gray-100 p-4 sm:ml-64 flex gap-2 flex-col lg:flex-row translate-all duration-300 mt-14 dark:bg-gray-800'>
        <Content>
          <main className='h-full overflow-y-auto'>
            <div className='container px-6 mx-auto grid'>
              <h2 className='my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200'>Dashboard</h2>
              <div className='grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4'>
                <div className='flex items-center p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800'>
                  <div className='p-3 mr-4 text-orange-500 bg-orange-100 rounded-full dark:text-orange-100 dark:bg-orange-500'>
                    <svg className='w-5 h-5' fill='currentColor' viewBox='0 0 20 20'>
                      <path d='M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z'></path>
                    </svg>
                  </div>
                  <div>
                    <p className='mb-2 text-sm font-medium text-gray-600 dark:text-gray-400'>Total members</p>
                    <p className='text-lg font-semibold text-gray-700 dark:text-gray-200'>{totalMember}</p>
                  </div>
                </div>
                <div className='flex items-center p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800'>
                  <div className='p-3 mr-4 text-green-500 bg-green-100 rounded-full dark:text-green-100 dark:bg-green-500'>
                    <svg fill='none' width='20px' height='20px' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
                      <path
                        d='M7.0498 7.0498H7.0598M10.5118 3H7.8C6.11984 3 5.27976 3 4.63803 3.32698C4.07354 3.6146 3.6146 4.07354 3.32698 4.63803C3 5.27976 3 6.11984 3 7.8V10.5118C3 11.2455 3 11.6124 3.08289 11.9577C3.15638 12.2638 3.27759 12.5564 3.44208 12.8249C3.6276 13.1276 3.88703 13.387 4.40589 13.9059L9.10589 18.6059C10.2939 19.7939 10.888 20.388 11.5729 20.6105C12.1755 20.8063 12.8245 20.8063 13.4271 20.6105C14.112 20.388 14.7061 19.7939 15.8941 18.6059L18.6059 15.8941C19.7939 14.7061 20.388 14.112 20.6105 13.4271C20.8063 12.8245 20.8063 12.1755 20.6105 11.5729C20.388 10.888 19.7939 10.2939 18.6059 9.10589L13.9059 4.40589C13.387 3.88703 13.1276 3.6276 12.8249 3.44208C12.5564 3.27759 12.2638 3.15638 11.9577 3.08289C11.6124 3 11.2455 3 10.5118 3ZM7.5498 7.0498C7.5498 7.32595 7.32595 7.5498 7.0498 7.5498C6.77366 7.5498 6.5498 7.32595 6.5498 7.0498C6.5498 6.77366 6.77366 6.5498 7.0498 6.5498C7.32595 6.5498 7.5498 6.77366 7.5498 7.0498Z'
                        stroke='currentColor'
                        strokeWidth='2'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      />
                    </svg>
                  </div>
                  <div>
                    <p className='mb-2 text-sm font-medium text-gray-600 dark:text-gray-400'>Tags</p>
                    <p className='text-lg font-semibold text-gray-700 dark:text-gray-200'> {tags?.length || 0}</p>
                  </div>
                </div>
                <div className='flex items-center p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800'>
                  <div className='p-3 mr-4 text-blue-500 bg-blue-100 rounded-full dark:text-blue-100 dark:bg-blue-500'>
                    <svg
                      width='20px' // Kích thước chiều rộng
                      height='20px' // Kích thước chiều cao
                      viewBox='0 0 16 16' // Khung nhìn
                      fill='none' // Không có màu nền
                      xmlns='http://www.w3.org/2000/svg' // Không gian tên XML
                    >
                      <path
                        d='M5.5 5.5C5.5 4.11929 6.61929 3 8 3C9.38071 3 10.5 4.11929 10.5 5.5C10.5 6.88071 9.38071 8 8 8H7V11H8C11.0376 11 13.5 8.53757 13.5 5.5C13.5 2.46243 11.0376 0 8 0C4.96243 0 2.5 2.46243 2.5 5.5H5.5Z'
                        fill='currentColor' // Đổi màu bên trong
                      />
                      <path
                        d='M10 13H7V16H10V13Z'
                        fill='currentColor' // Đổi màu bên trong
                      />
                    </svg>
                  </div>
                  <div>
                    <p className='mb-2 text-sm font-medium text-gray-600 dark:text-gray-400'>Questions</p>
                    <p className='text-lg font-semibold text-gray-700 dark:text-gray-200'> {questions?.length || 0}</p>
                  </div>
                </div>
                <div className='flex items-center p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800'>
                  <div className='p-3 mr-4 text-teal-500 bg-teal-100 rounded-full dark:text-teal-100 dark:bg-teal-500'>
                    <svg className='w-5 h-5' fill='currentColor' viewBox='0 0 20 20'>
                      <path
                        fillRule='evenodd'
                        d='M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z'
                        clipRule='evenodd'
                      ></path>
                    </svg>
                  </div>
                  <div>
                    <p className='mb-2 text-sm font-medium text-gray-600 dark:text-gray-400'>Answers</p>
                    <p className='text-lg font-semibold text-gray-700 dark:text-gray-200'>35</p>
                  </div>
                </div>
              </div>
              <div className='w-full overflow-hidden rounded-lg shadow-xs'>
                <div className='w-full overflow-x-auto'>
                  <table className='w-full whitespace-no-wrap'>
                    <thead>
                      <tr className='text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800'>
                        <th className='px-4 py-3'>Member</th>
                        <th className='px-4 py-3'>Reputation</th>
                        <th className='px-4 py-3'>Status</th>
                        <th className='px-4 py-3'>Register time</th>
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
                                  <p className='text-xs text-gray-600 dark:text-gray-400'>{member.Account.username}</p>
                                </div>
                              </div>
                            </td>
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
                              {' '}
                              {formatRegistrationTime(member.Account.registration_time)}
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

              <h2 className='my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200'>Charts</h2>
              <div className='grid gap-6 mb-8 md:grid-cols-2'>
                <div className='min-w-0 p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800'>
                  <h4 className='mb-4 font-semibold text-gray-800 dark:text-gray-300'>Pie</h4>
                  <div className='w-auto h-40'>
                    <canvas id='pie'></canvas>
                  </div>
                  <div className='flex justify-center mt-4 space-x-3 text-sm text-gray-600 dark:text-gray-400'>
                    <div className='flex items-center'>
                      <span className='inline-block w-3 h-3 mr-1 bg-blue-500 rounded-full'></span>
                      <span>Questions</span>
                    </div>
                    <div className='flex items-center'>
                      <span className='inline-block w-3 h-3 mr-1 bg-teal-600 rounded-full'></span>
                      <span>Answers</span>
                    </div>
                    <div className='flex items-center'>
                      <span className='inline-block w-3 h-3 mr-1 bg-purple-600 rounded-full'></span>
                      <span>Members</span>
                    </div>
                  </div>
                </div>
                <div className='min-w-0 p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800'>
                  <h4 className='mb-4 font-semibold text-gray-800 dark:text-gray-300'>Line</h4>
                  <div className='w-auto h-40'>
                    <canvas id='line'></canvas>
                  </div>
                  <div className='flex justify-center mt-4 space-x-3 text-sm text-gray-600 dark:text-gray-400'>
                    <div className='flex items-center'>
                      <span className='inline-block w-3 h-3 mr-1 bg-teal-600 rounded-full'></span>
                      <span>Questions</span>
                    </div>
                    <div className='flex items-center'>
                      <span className='inline-block w-3 h-3 mr-1 bg-purple-600 rounded-full'></span>
                      <span>Answers</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </Content>
      </div>
    </div>
  )
}
