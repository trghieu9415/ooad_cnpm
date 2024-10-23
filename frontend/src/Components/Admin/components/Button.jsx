import React from 'react'
import { Link } from 'react-router-dom' // Import Link từ React Router

const Button = ({
  to,
  href,
  leftIcon,
  rightIcon,
  left = false,
  right = false,
  center = false,
  small = false,
  regular = false,
  large = false,
  disabled = false,
  onClick,
  children,
  ...passProps
}) => {
  // Xác định kích thước của nút
  const sizeClasses = small ? 'px-3 py-1 text-sm' : regular ? 'px-4 py-2 text-sm' : large ? 'px-10 py-4' : 'px-5 py-3' // Kích thước mặc định cho nút

  // Các lớp cho nút khi bị vô hiệu hóa
  const disabledClasses = disabled
    ? 'opacity-50 cursor-not-allowed focus:outline-none'
    : 'active:bg-purple-600 hover:bg-purple-700 focus:shadow-outline-purple'

  // Xác định loại nút (link nội bộ hoặc ngoại bộ)
  const ButtonComponent = to ? Link : href ? 'a' : 'button'

  // Xác định lớp justify-content dựa trên props
  const justifyClass = left ? 'justify-start' : right ? 'justify-end' : center ? 'justify-center' : 'justify-start' // Mặc định là căn trái nếu không có tùy chọn nào

  return (
    <div className={`flex ${justifyClass}`}>
      <ButtonComponent
        to={to} // Dùng cho Link từ React Router
        href={href} // Dùng cho thẻ a
        className={`font-medium leading-5 text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg ${sizeClasses} ${disabled ? disabledClasses : ''}`}
        onClick={onClick}
        disabled={disabled}
        {...passProps}
      >
        {leftIcon && <span className='flex items-center mr-2'>{leftIcon}</span>}
        {children}
        {rightIcon && <span className='flex items-center ml-2'>{rightIcon}</span>}
      </ButtonComponent>
    </div>
  )
}

export default Button
