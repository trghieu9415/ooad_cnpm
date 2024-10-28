const Saves = () => {
  return (
    <div className='p-4 sm:p-8 bg-gray-50 min-h-screen flex justify-center items-start'>
      <div className='max-w-4xl w-full bg-white shadow-lg rounded-lg p-6 sm:p-8'>
        <h1 className='text-xl sm:text-2xl font-bold text-gray-800 mb-6'>Saved Questions</h1>

        <div className='space-y-6'>
          {[1, 2, 3].map((item) => (
            <div key={item} className='border-b border-gray-200 pb-4 mb-6 last:border-none last:pb-0 last:mb-0'>
              <div className='flex flex-col sm:flex-row sm:justify-between sm:items-start'>
                <div className='flex-1'>
                  <h2 className='text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 mb-4 sm:mb-6 leading-snug break-all'>
                    Cannot invoke org.hibernate.engine.jdbc.spi.SQLExceptionHelper.convert(java.sql.SQLException,
                    String, String)
                  </h2>
                  <p className='text-gray-600 text-sm mt-1 mb-2'>Saved on October 28, 2024</p>
                  <div className='flex flex-wrap gap-2'>
                    <span className='bg-blue-100 text-blue-600 rounded-full px-3 py-1 text-sm font-semibold'>
                      hibernate
                    </span>
                    <span className='bg-green-100 text-green-600 rounded-full px-3 py-1 text-sm font-semibold'>
                      java
                    </span>
                    <span className='bg-purple-100 text-purple-600 rounded-full px-3 py-1 text-sm font-semibold'>
                      sql
                    </span>
                  </div>
                </div>

                <div className='mt-4 sm:mt-0 sm:ml-4 flex items-center space-x-4 text-gray-500 text-sm'>
                  <button className='hover:text-blue-600 transition'>Remove</button>
                  <button className='hover:text-blue-600 transition'>View</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Saves
