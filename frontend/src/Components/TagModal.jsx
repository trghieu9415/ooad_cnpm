const TagModal = ({ isOpen, onClose, tags, selectedTags, onTagChange }) => {
  if (!isOpen) return null

  const handleTagChange = (tag) => {
    const isSelected = selectedTags.some((selectedTag) => selectedTag.id === tag.id)
    if (isSelected) {
      onTagChange(selectedTags.filter((selectedTag) => selectedTag.id !== tag.id))
    } else {
      onTagChange([...selectedTags, tag])
    }
  }

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
      <div className='bg-white rounded-lg p-6 max-w-md w-full'>
        <h2 className='text-xl font-semibold mb-4'>Select Tags</h2>
        <div className='space-y-2'>
          {tags.map((tag) => (
            <div key={tag.id} className='flex items-center'>
              <input
                type='checkbox'
                checked={selectedTags.some((selectedTag) => selectedTag.id === tag.id)}
                onChange={() => handleTagChange(tag)}
                className='mr-2'
              />
              <label>{tag.name}</label>
            </div>
          ))}
        </div>
        <div className='mt-4 flex justify-end'>
          <button onClick={onClose} className='bg-gray-300 text-gray-800 px-4 py-2 rounded-lg mr-2'>
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

export default TagModal
