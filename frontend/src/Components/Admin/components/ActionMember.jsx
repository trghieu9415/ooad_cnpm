import { useForm } from 'react-hook-form'
import { formatRegistrationTime } from '../../../helpers/formatRegistrationTime'
import { useMutation } from '@tanstack/react-query'
import { updateInfoMember } from '../../../apis/Admin/adminMember.api'
import { useState } from 'react'
import Toast from '../../Toast'

const ActionMember = ({ handleDetail, member, action, disabled }) => {
  const { register, handleSubmit } = useForm({})
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState('')
  const updateInfoMemberMutation = useMutation({
    mutationFn: ({ id, body }) => updateInfoMember(id, body),
    onSuccess: () => {
      setStatus('success')
      setMessage('Sửa thông tin thành công')
    }
  })

  const onSubmit = handleSubmit((data) => {
    console.log(data)
    updateInfoMemberMutation.mutate({ id: member.id, body: data })
  })

  return (
    <div className='w-screen h-screen bg-[rgba(0,0,0,0.2)] dark:bg-[rgba(255,255,255,0.3)] fixed top-5 left-20 flex items-center justify-center '>
      <div className='w-[32%] h-[80%] bg-white rounded-lg border-4 border-purple-500 dark:bg-slate-800 dark:text-white'>
        <div className='flex justify-between w-[100%] items-center p-3'>
          <p className='font-bold'>Member Details</p>
          <button
            className='border text-red-500 hover:bg-red-500 hover:text-white font-bold w-[25px] h-[25px] rounded'
            onClick={handleDetail}
          >
            X
          </button>
        </div>

        <form onSubmit={onSubmit}>
          <div className='m-4 flex flex-col items-center gap-4'>
            <div className='flex items-center'>
              <img
                src='https://picsum.photos/id/222/200/300'
                alt='User'
                className='w-[60px] h-[60px] rounded-full mr-3'
              />
              <div>
                <p className='font-bold text-lg'>Username: {member.Account.username}</p>
                <p className='text-sm text-gray-500'>Member ID: {member.id}</p>
              </div>
            </div>

            <div className='w-full mt-4 px-2'>
              <div className='border-b border-gray-300 py-2'>
                <p className='text-sm font-semibold text-gray-700'>Name:</p>
                <input
                  type='text'
                  className='bg-white border-none focus:outline-none w-full text-gray-600'
                  {...register('name')}
                  disabled={disabled}
                  defaultValue={member.name}
                />
              </div>
              <div className='border-b border-gray-300 py-2'>
                <p className='text-sm font-semibold text-gray-700'>Email:</p>
                <input
                  type='text'
                  className='bg-white border-none focus:outline-none w-full text-gray-600'
                  {...register('email')}
                  disabled={disabled}
                  defaultValue={member.email}
                />
              </div>
              <div className='border-b border-gray-300 py-2'>
                <p className='text-sm font-semibold text-gray-700'>Phone:</p>
                <input
                  type='text'
                  className='bg-white border-none focus:outline-none w-full text-gray-600'
                  {...register('phone')}
                  disabled={disabled}
                  defaultValue={member.phone}
                />
              </div>
              <div className='border-b border-gray-300 py-2'>
                <p className='text-sm font-semibold text-gray-700'>Biography:</p>
                <input
                  type='text'
                  className='bg-white border-none focus:outline-none w-full text-gray-600'
                  disabled={disabled}
                  {...register('biography')}
                  defaultValue={member.biography}
                />
                <p className='text-gray-600'></p>
              </div>
              <div className='border-b border-gray-300 py-2'>
                <p className='text-sm font-semibold text-gray-700'>Register time:</p>
                <input
                  type='text'
                  className='bg-white border-none focus:outline-none w-full text-gray-600'
                  disabled={disabled}
                  defaultValue={formatRegistrationTime(member.Account.registration_time)}
                />
                <p className='text-gray-600'></p>
              </div>
              <div className='border-b border-gray-300 py-2'>
                <p className='text-sm font-semibold text-gray-700'>Reputation:</p>
                <input
                  type='text'
                  className='bg-white border-none focus:outline-none w-full text-gray-600'
                  name=''
                  disabled={disabled}
                  defaultValue={member.reputation}
                />
              </div>
            </div>
          </div>
          {action !== 'detail' && (
            <div className='flex justify-end '>
              <button
                type='submit'
                className='border-2 border-purple-500 bg-white hover:bg-purple-500
               hover:text-white text-black py-1 px-3 rounded-sm shadow-sm mr-6 '
              >
                Lưu
              </button>
            </div>
          )}
        </form>
      </div>
      <div className='mt-50'>{message && <Toast status={status} message={message} position='bottom-right' />}</div>
    </div>
  )
}

export default ActionMember
