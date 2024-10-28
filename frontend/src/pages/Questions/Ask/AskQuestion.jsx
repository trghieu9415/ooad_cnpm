const AskQuestion = () => {
  return (
    <div className='p-8 bg-gray-100 min-h-screen'>
      <div className='max-w-4xl mx-auto bg-white shadow-md rounded-lg p-8'>
        <h1 className='text-3xl font-bold mb-6'>Ask a public question</h1>

        <div className='space-y-6'>
          <div>
            <label className='block font-semibold text-lg mb-1'>Title</label>
            <input
              type='text'
              className='w-full border border-gray-300 rounded-lg p-2'
              placeholder="Be specific and imagine you're asking a question to another person"
            />
            <p className='text-sm text-gray-500 mt-1'>Use a short and descriptive title to summarize your question.</p>
          </div>

          <div>
            <label className='block font-semibold text-lg mb-1'>What are the details of your problem?</label>
            <textarea
              className='w-full border border-gray-300 rounded-lg p-2 h-32'
              placeholder='Include all the information someone would need to answer your question'
            />
            <p className='text-sm text-gray-500 mt-1'>
              Explain what you are trying to achieve and the expected outcome.
            </p>
          </div>

          <div>
            <label className='block font-semibold text-lg mb-1'>What did you try and what were you expecting?</label>
            <textarea
              className='w-full border border-gray-300 rounded-lg p-2 h-32'
              placeholder="Describe any attempts you've made to solve the problem"
            />
            <p className='text-sm text-gray-500 mt-1'>
              Mention solutions you have tried and explain why they didn’t work.
            </p>
          </div>

          <div>
            <label className='block font-semibold text-lg mb-1'>Tags</label>
            <input
              type='text'
              className='w-full border border-gray-300 rounded-lg p-2'
              placeholder='Add up to 5 tags to describe what your question is about'
            />
            <p className='text-sm text-gray-500 mt-1'>
              Add relevant tags to help categorize your question (e.g., react, javascript).
            </p>
          </div>

          <div className='flex justify-between items-center mt-8'>
            <button className='bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700'>
              Post Your Question
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AskQuestion
