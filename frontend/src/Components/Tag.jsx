const Tag = ({ tag }) => {
  return (
    <div className='border rounded-lg p-4 hover:bg-gray-100 transition cursor-pointer'>
      <h2 className='text-sm font-semibold inline-block p-1 bg-gray-300 rounded-lg'>{tag.name}</h2>
      <p className='text-gray-600'>{tag.description}</p>
      <span className='text-sm text-gray-500'>{tag.questionCount} questions</span>
    </div>
  )
}

export default Tag
