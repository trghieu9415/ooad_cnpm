const Button = ({ label, onClick, type = 'button', variant, disabled = false, className = '' }) => {
  const baseStyle = 'px-4 py-2 rounded-lg font-semibold transition-colors duration-200'
  const variantStyle = {
    primary: 'bg-orange-500 text-white hover:bg-orange-600',
    secondary: 'bg-gray-300 text-gray-800 hover:bg-gray-400',
    danger: 'bg-red-500 text-white hover:bg-red-600'
  }

  const buttonStyle = `${baseStyle} ${variantStyle[variant]} ${
    disabled ? 'opacity-50 cursor-not-allowed' : ''
  } ${className}`

  return (
    <button type={type} className={buttonStyle} onClick={onClick} disabled={disabled}>
      {label}
    </button>
  )
}

export default Button
