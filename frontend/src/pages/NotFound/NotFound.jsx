const NotFound = () => {
  return (
    <div className='min-h-screen flex flex-col justify-center items-center bg-gray-100'>
      <h1 className='text-6xl font-bold text-red-600'>404</h1>
      <p className='text-xl mt-4 text-gray-600'>Page Not Found</p>
      <a href='/' className='mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700'>
        Go Back Home
      </a>
    </div>
  )
}

export default NotFound
