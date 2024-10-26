const Home = () => {
  return (
    <div className='max-w-7xl mx-auto p-8 space-y-12'>
      <section className='text-center space-y-4'>
        <h1 className='text-4xl font-normal'>Welcome to Stack Overflow</h1>
        <div className='flex justify-center items-center'>
          <img width={200} height={50} src='./img/iconLogoStack.png' alt='Logo' />
        </div>
        <p className='text-lg'>
          <span className='font-bold'>Stack Overflow</span> is a question and answer site for professional and
          enthusiast programmers. It is built and run by you as part of the{' '}
          <a href='/' className='text-blue-500'>
            Stack Exchange
          </a>{' '}
          network of Q&A sites. With your help, we are working together to build a library of detailed, high-quality
          answers to every question about programming.
        </p>
      </section>

      <section className='bg-gray-100 p-8 rounded-lg shadow-md'>
        <h2 className='text-3xl font-semibold mb-6 text-center'>How Stack Overflow Works</h2>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          <div className='text-center'>
            <div className='bg-white p-4 rounded-lg shadow-md'>
              <h3 className='text-xl font-bold'>Ask Questions</h3>
              <p className='mt-2 text-gray-600'>Post questions about programming and get answers from the community.</p>
            </div>
          </div>
          <div className='text-center'>
            <div className='bg-white p-4 rounded-lg shadow-md'>
              <h3 className='text-xl font-bold'>Get Answers</h3>
              <p className='mt-2 text-gray-600'>Receive high-quality, trusted answers from experienced developers.</p>
            </div>
          </div>
          <div className='text-center'>
            <div className='bg-white p-4 rounded-lg shadow-md'>
              <h3 className='text-xl font-bold'>Share Knowledge</h3>
              <p className='mt-2 text-gray-600'>Help others by contributing your own expertise and solutions.</p>
            </div>
          </div>
        </div>
      </section>

      <section className='text-center space-y-4'>
        <h2 className='text-3xl font-semibold'>Why Join the Stack Overflow Community?</h2>
        <p className='text-lg text-gray-600 max-w-4xl mx-auto'>
          Join millions of developers who solve coding problems, contribute answers, and collaborate with like-minded
          individuals.
        </p>
      </section>

      <section className='text-center'>
        <button
          className='px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-300'
          onClick={() => {
            window.location.href = '/register'
          }}
        >
          Sign Up for Free
        </button>
      </section>
    </div>
  )
}

export default Home
