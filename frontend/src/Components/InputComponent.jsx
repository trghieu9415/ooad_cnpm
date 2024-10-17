import { FaTimes } from 'react-icons/fa'

const InputComponent = ({
  label,
  type = 'text',
  name,
  placeholder,
  value,
  onChange,
  className,
  classNameInput,
  iconClear = false,
  onClear
}) => {
  return (
    <div className={`relative ${className}`}>
      {label && (
        <label htmlFor={name} className='block mb-2'>
          {label}
        </label>
      )}
      <input
        id={name}
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={classNameInput}
      />
      {iconClear && value && (
        <button
          type='button'
          onClick={onClear}
          className='absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-100 hover:text-gray-500 bg-gray-900 rounded-full p-1'
        >
          <FaTimes />
        </button>
      )}
    </div>
  )
}

export default InputComponent
