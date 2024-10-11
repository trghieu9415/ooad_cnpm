export const getRules = (getValues) => ({
  username: {
    required: {
      value: true,
      message: 'Vui lòng nhập username'
    }
  },
  email: {
    required: {
      value: true,
      message: 'Vui lòng nhập email'
    },
    pattern: {
      value: /^\S+@\S+\.\S+$/,
      message: 'Email không đúng định dạng'
    }
  },
  phone: {
    required: {
      value: true,
      message: 'Vui lòng nhập số điện thoại'
    },
    pattern: {
      value: /^0\d{9}$/,
      message: 'Số điện thoại phải bắt đầu bằng 0 và có 10 chữ số'
    }
  },
  password: {
    required: {
      value: true,
      message: 'Vui lòng nhập mật khẩu'
    },
    minLength: {
      value: 6,
      message: 'Mật khẩu phải có ít nhất 6 ký tự'
    },
    maxLength: {
      value: 20,
      message: 'Mật khẩu không quá 20 ký tự'
    }
  },
  confirm_password: {
    required: {
      value: true,
      message: 'Vui lòng nhập lại mật khẩu'
    },
    minLength: {
      value: 6,
      message: 'Mật khẩu phải có ít nhất 6 ký tự'
    },
    maxLength: {
      value: 20,
      message: 'Mật khẩu không quá 20 ký tự'
    },
    validate:
      typeof getValues === 'function'
        ? (value) => value === getValues('password') || 'Nhập lại password không khớp'
        : undefined
  }
})
