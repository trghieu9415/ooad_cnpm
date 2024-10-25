const Detail = ({handleOnClose }) => {
  return (
    <div className='w-screen h-screen bg-[rgba(0,0,0,0.2)] dark:bg-[rgba(255,255,255,0.3)] fixed top-5 left-20 flex items-center justify-center '>
      <div className='w-[32%] h-[80%] bg-white rounded-lg border-4 border-purple-500 dark:bg-slate-800 dark:text-white'>
        <div className='flex justify-between w-[100%] items-center p-3'>
          <p className='font-bold'>Member Details</p>
          <button
            className='border text-red-500 hover:bg-red-500 hover:text-white font-bold w-[25px] h-[25px] rounded'
            onClick={handleOnClose}
          >
            X
          </button>
        </div>

        <div className='m-4 flex flex-col items-center gap-4'>
          <div className='flex items-center'>
            <img
              src='https://picsum.photos/id/222/200/300'
              alt='User'
              className='w-[60px] h-[60px] rounded-full mr-3'
            />
            <div>
              <p className='font-bold text-lg'>Username: zxczxc</p>
              <p className='text-sm text-gray-500'>User ID: 0xuid8few</p>
            </div>
          </div>

          <div className='w-full mt-4 px-2'>
            <div className='border-b border-gray-300 py-2'>
              <p className='text-sm font-semibold text-gray-700'>Email:</p>
              <p className='text-gray-600'>user@example.com</p>
            </div>
            <div className='border-b border-gray-300 py-2'>
              <p className='text-sm font-semibold text-gray-700'>Phone:</p>
              <p className='text-gray-600'>+123456789</p>
            </div>
            <div className='border-b border-gray-300 py-2'>
              <p className='text-sm font-semibold text-gray-700'>Address:</p>
              <p className='text-gray-600'>123 Main St, City, Country</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Detail
