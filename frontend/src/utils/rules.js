export const getRules = (getValues) => ({
  name: {
    required: {
      value: true,
      message: 'Vui lòng nhập họ và tên'
    }
  },
  username: {
    required: {
      value: true,
      message: 'Vui lòng nhập tên đăng nhập'
    },
    minLength: {
      value: 8,
      message: 'Tên đăng nhập phải có ít nhất 8 ký tự'
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
      message: 'Mật khẩu phải có ít nhất 8 ký tự'
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
      message: 'Mật khẩu phải có ít nhất 8 ký tự'
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

export const getRulesLogin = () => ({
  username: {
    required: {
      value: true,
      message: 'Vui lòng nhập username'
    }
  },
  password: {
    required: {
      value: true,
      message: 'Vui lòng nhập mật khẩu'
    }
  }
})
