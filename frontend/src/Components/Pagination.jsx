import { MdNavigateNext } from 'react-icons/md'
import { GrFormPrevious } from 'react-icons/gr'

const Pagination = ({ indexOfFirst, indexOfLast, totalPost, currentPage, postPerPage, setCurrentPage }) => {
  const pageCount = Math.ceil(totalPost / postPerPage)
  const pages = Array(pageCount)
    .fill()
    .map((_, index) => index + 1)

  const handlePageChange = (page) => {
    setCurrentPage(page) // Cập nhật trang hiện tại
  }

  return (
    <div className='grid px-4 py-3 text-xs font-semibold tracking-wide text-gray-500 uppercase border-t dark:border-gray-700 bg-gray-50 sm:grid-cols-9 dark:text-gray-400 dark:bg-gray-800'>
      <span className='flex items-center col-span-3'>
        Showing {indexOfFirst + 1} - {Math.min(indexOfLast, totalPost)} of {totalPost}{' '}
      </span>
      <span className='col-span-2'></span>
      <span className='flex col-span-4 mt-2 sm:mt-auto sm:justify-end'>
        <nav aria-label='Table navigation'>
          <ul className='inline-flex items-center'>
            <li>
              <button
                onClick={() => handlePageChange(currentPage - 1)} // Thay đổi trang khi nhấn nút Previous
                className='px-3 py-1 rounded-md rounded-l-lg focus:outline-none focus:shadow-outline-purple'
                aria-label='Previous'
                disabled={currentPage === 1} // Vô hiệu hóa nút nếu đang ở trang đầu
              >
                <GrFormPrevious className='size-5' />
              </button>
            </li>
            {/* Tạo các nút cho từng trang */}
            {pages.map((page) => (
              <li key={page}>
                <button
                  onClick={() => handlePageChange(page)} // Chuyển đến trang tương ứng
                  className={`px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple ${currentPage === page ? 'bg-purple-600 text-white' : ''}`}
                >
                  {page}
                </button>
              </li>
            ))}
            <li>
              <button
                onClick={() => handlePageChange(currentPage + 1)} // Thay đổi trang khi nhấn nút Next
                className='px-3 py-1 rounded-md rounded-r-lg focus:outline-none focus:shadow-outline-purple'
                aria-label='Next'
                disabled={currentPage === Math.ceil(totalPost / postPerPage)} // Vô hiệu hóa nút nếu đang ở trang cuối
              >
                <MdNavigateNext className='size-5' />
              </button>
            </li>
          </ul>
        </nav>
      </span>
    </div>
  )
}

export default Pagination
