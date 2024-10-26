import { useState } from 'react'

const ButtonGroup = ({ listItem, onClick }) => {
  const [selectedIndex, setSelectedIndex] = useState(null)

  const handleClick = (index, item) => {
    setSelectedIndex(index)
    if (onClick) {
      onClick(item)
    }
  }

  return (
    <div
      className='h-[40px] inline-flex flex-wrap xl:flex-nowrap rounded-lg border border-gray-300 bg-white shadow-sm overflow-hidden'
      role='group'
    >
      {listItem.map((item, index) => (
        <button
          key={index}
          type='button'
          className={`px-2 py-1 md:px-4 md:py-2 text-xs md:text-sm font-medium 
                      ${selectedIndex === index ? 'bg-gray-500 text-white' : 'bg-gray-100 text-gray-700'} 
                      border-b md:border-r border-gray-300 
                      hover:bg-gray-400 focus:z-10`}
          onClick={() => handleClick(index, item)}
        >
          {item}
        </button>
      ))}
    </div>
  )
}

export default ButtonGroup
