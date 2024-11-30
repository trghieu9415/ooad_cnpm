const UserInfo = ({ user }) => {
  return (
    <div className='border rounded-lg p-4 hover:shadow-lg transition-shadow duration-300 flex gap-4'>
      <img
        src='https://www.gravatar.com/avatar/999068a6dbcc836522fd6eb79bb9ad2b?s=48&d=identicon&r=PG&f=y&so-version=2'
        alt={`${user.name}'s avatar`}
        className='rounded-lg mb-2 border w-12 h-12'
      />
      <div className='flex-1'>
        <h2 className='text-[17px] font-normal text-blue-600'>{user.name}</h2>
        <div className='flex flex-col mt-1 text-gray-500 text-sm'>
          <span className='mb-1'>Location: {user.location || 'N/A'}</span>
          <span>Reputation: {user.reputation || 0}</span>
          <span>Questions: {user.questionCount || 0}</span>
          <span>Answers: {user.answerCount || 0}</span>
          <span>Joined: {user.joinedDate}</span>
        </div>
        <div className='mt-2 flex flex-wrap gap-2'>
          {user.tags.map((tag, index) => (
            <span key={index} className='bg-gray-200 text-gray-800 px-2 py-1 rounded-full text-xs md:text-sm'>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default UserInfo
