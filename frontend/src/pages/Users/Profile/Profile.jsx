const Profile = () => {
  return (
    <div className='min-h-screen flex justify-center items-start bg-gray-50 p-4'>
      <div className='max-w-4xl w-full bg-white shadow-lg rounded-lg p-6 sm:p-8'>
        <div className='mt-4'>
          <h2 className='text-xl font-bold text-gray-800 mb-4'>About</h2>
          <p className='text-gray-600 mb-4'>
            Tôi là một lập trình viên phần mềm với nhiều năm kinh nghiệm trong việc phát triển ứng dụng web và di động.
            Tôi đam mê công nghệ và luôn tìm kiếm cơ hội để học hỏi và phát triển kỹ năng của mình.
          </p>
          <p className='text-gray-600'>
            Ngoài ra, tôi còn thích tham gia vào các dự án mã nguồn mở và đóng góp cho cộng đồng lập trình viên.
          </p>
        </div>

        <div className='mt-4'>
          <h2 className='text-xl font-bold text-gray-800 mb-4'>Badges</h2>
          <div className='flex flex-wrap space-x-4'>
            <div className='bg-gray-100 p-4 rounded-lg'>
              <h3 className='font-semibold text-gray-700'>Gold Badge</h3>
              <p className='text-gray-500'>3 Achievements</p>
            </div>
            <div className='bg-gray-100 p-4 rounded-lg'>
              <h3 className='font-semibold text-gray-700'>Silver Badge</h3>
              <p className='text-gray-500'>5 Achievements</p>
            </div>
            <div className='bg-gray-100 p-4 rounded-lg'>
              <h3 className='font-semibold text-gray-700'>Bronze Badge</h3>
              <p className='text-gray-500'>10 Achievements</p>
            </div>
          </div>
        </div>

        <div className='mt-4'>
          <h2 className='text-xl font-bold text-gray-800 mb-4'>Posts</h2>
          <ul className='space-y-2'>
            <li className='p-4 border border-gray-200 rounded-lg'>
              <p className='text-gray-800'>Understanding React Hooks</p>
              <span className='text-gray-500 text-sm'>Published: 1 week ago</span>
            </li>
            <li className='p-4 border border-gray-200 rounded-lg'>
              <p className='text-gray-800'>Tailwind CSS vs. Bootstrap</p>
              <span className='text-gray-500 text-sm'>Published: 2 weeks ago</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Profile
