import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { registerAccount } from '../../apis/auth.api'
import { getRules } from '../../utils/rules'
import { escape, omit } from 'lodash'
import Input from '../../Components/Input'
export default function Register() {
  const navigate = useNavigate() // Khởi tạo navigate

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors }
  } = useForm({})
  const rules = getRules(getValues)

  const registerAccountMutation = useMutation({
    mutationFn: (body) => registerAccount(body)
  })

  const onSubmit = handleSubmit((data) => {
    const body = omit(data, ['confirm_password'])

    registerAccountMutation.mutate(body, {
      onSuccess: (data) => {
        console.log(data)
        alert('Đăng ký thành công. Vui lòng đăng nhập.')
        navigate('/login')
      },
      onError: (error) => {
        console.error(error)
      }
    })
  })

  return (
    <div className='bg-gray-100 flex items-center justify-center min-h-screen'>
      <div className='flex justify-between'>
        {/* Left section: Community description */}
        <div className='w-1/2 flex items-center justify-center'>
          <div>
            <h1 className='text-lg font-bold mb-4'>Tham gia cộng đồng Stack Overflow</h1>
            <ul className='list-disc pl-5 mb-5 space-y-2 text-gray-700 text-sm'>
              <li>Thoát khỏi bế tắc — đặt câu hỏi</li>
              <li>Mở khóa các đặc quyền mới như bình chọn và bình luận</li>
              <li>Lưu các thẻ, bộ lọc và công việc yêu thích của bạn</li>
              <li>Kiếm điểm danh tiếng và huy hiệu</li>
              <li>Cộng tác và chia sẻ kiến thức với một nhóm riêng tư</li>
            </ul>
            <p className='text-xs text-gray-500'>
              Cộng tác và chia sẻ kiến thức với một nhóm riêng tư lên đến 50 người dùng.
            </p>
          </div>
        </div>

        {/* Right section: Form */}
        <div className='max-w-7xl bg-white rounded-lg px-7 py-4 mb-3 mb-0'>
          <div className='flex justify-center mb-2'>
            <svg aria-hidden='true' className='native svg-icon iconGlyphMd' width='32' height='37' viewBox='0 0 32 37'>
              <path fill='#BCBBBB' d='M26 33v-9h4v13H0V24h4v9z'></path>
              <path
                fill='#F48024'
                d='m21.5 0-2.7 2 9.9 13.3 2.7-2zM26 18.4 13.3 7.8l2.1-2.5 12.7 10.6zM9.1 15.2l15 7 1.4-3-15-7zm14 10.79.68-2.95-16.1-3.35L7 23zM23 30H7v-3h16z'
              ></path>
            </svg>
          </div>
          <form className='rounded' onSubmit={onSubmit} noValidate>
            <div className='text-2xl'>
              <Input
                className='mt-3'
                titleLabel='Họ và tên'
                type='text'
                placeholder='Họ và tên'
                register={register}
                name='name'
                rules={rules.name}
                errorsMessgae={errors.name?.message}
              />
              <Input
                className=''
                titleLabel='Tên đăng nhập'
                type='text'
                placeholder='Tên đăng nhập'
                register={register}
                name='username'
                rules={rules.username}
                errorsMessgae={errors.username?.message}
              />
              <Input
                className=''
                titleLabel='Email'
                type='email'
                placeholder='Email'
                register={register}
                name='email'
                rules={rules.email}
                errorsMessgae={errors.email?.message}
              />
              <Input
                className=''
                titleLabel='Số điện thoại'
                type='text'
                placeholder='Số điện thoại'
                register={register}
                name='phone'
                rules={rules.phone}
                errorsMessgae={errors.phone?.message}
              />
              <Input
                className=''
                titleLabel='Mật khẩu'
                type='password'
                placeholder='Mật khẩu'
                register={register}
                name='password'
                rules={rules.password}
                errorsMessgae={errors.password?.message}
              />
              <Input
                className=''
                titleLabel='Xác nhận mật khẩu'
                type='password'
                placeholder='Xác nhận mật khẩu'
                register={register}
                name='confirm_password'
                rules={rules.confirm_password}
                errorsMessgae={errors.confirm_password?.message}
              />
              <button
                className='w-full bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 transition duration-300 text-sm'
                type='submit'
              >
                Đăng ký
              </button>
            </div>
          </form>
          <p className='mt-4 text-gray-700 text-xs text-center'>
            Bằng cách nhấn vào Đăng ký, bạn đồng ý với
            <a href='#' className='text-blue-500 hover:underline'>
              {' '}
              điều khoản dịch vụ
            </a>
            ,
            <a href='#' className='text-blue-500 hover:underline'>
              {' '}
              chính sách bảo mật
            </a>
            , và
            <a href='#' className='text-blue-500 hover:underline'>
              {' '}
              chính sách cookie
            </a>
            .
          </p>

          <p className='mt-3 text-center text-gray-700 text-xs'>
            Bạn đã có tài khoản?{' '}
            <Link className='text-blue-500 hover:underline' to='/login'>
              Đăng nhập
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
