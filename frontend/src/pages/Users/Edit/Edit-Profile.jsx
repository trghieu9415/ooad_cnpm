import { useState } from 'react'
import { useSelector } from 'react-redux'

const EditProfile = () => {
  const user = useSelector((state) => state.user)
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    biography: user?.biography || ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Form data submitted:', formData)
  }

  return (
    <div className='max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg'>
      <h2 className='text-2xl font-semibold mb-4'>Chỉnh sửa hồ sơ</h2>
      <form onSubmit={handleSubmit}>
        <div className='mb-4'>
          <label htmlFor='name' className='block text-sm font-medium text-gray-700'>
            Tên:
          </label>
          <input
            type='text'
            id='name'
            name='name'
            value={formData.name}
            onChange={handleChange}
            required
            className='mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-200'
          />
        </div>
        <div className='mb-4'>
          <label htmlFor='email' className='block text-sm font-medium text-gray-700'>
            Email:
          </label>
          <input
            type='email'
            id='email'
            name='email'
            value={formData.email}
            onChange={handleChange}
            required
            className='mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-200'
          />
        </div>
        <div className='mb-4'>
          <label htmlFor='phone' className='block text-sm font-medium text-gray-700'>
            Số điện thoại:
          </label>
          <input
            type='text'
            id='phone'
            name='phone'
            value={formData.phone}
            onChange={handleChange}
            required
            className='mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-200'
          />
        </div>
        <div className='mb-4'>
          <label htmlFor='biography' className='block text-sm font-medium text-gray-700'>
            Tiểu sử:
          </label>
          <textarea
            id='biography'
            name='biography'
            value={formData.biography}
            onChange={handleChange}
            className='mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-200'
          />
        </div>
        <button type='submit' className='w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition'>
          Lưu
        </button>
      </form>
    </div>
  )
}

export default EditProfile
