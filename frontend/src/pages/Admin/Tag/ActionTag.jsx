import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { createTag } from '../../../apis/Admin/adminTag.api'
import { useState } from 'react'
import Toast from '../../../Components/Toast'

export default function AddTag({ openForm, action, tagEdit }) {
  const { register, handleSubmit } = useForm({})
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState('')
  const addTagMutation = useMutation({
    mutationFn: (body) => createTag(body),
    onSuccess: () => {
      setStatus('success')
      setMessage('Thêm gắn thẻ thành công')
    }
  })

  const onSubmit = handleSubmit((data) => {
    addTagMutation.mutate(data)
  })

  return (
    <div className='w-screen h-screen bg-[rgba(0,0,0,0.2)] dark:bg-[rgba(255,255,255,0.3)] fixed top-5 left-20 flex items-center justify-center '>
      <div className='w-[32%] h-[40%] bg-white rounded-lg border-4 border-purple-500 dark:bg-slate-800 dark:text-white'>
        <div className='flex justify-between w-[100%] items-center p-3'>
          <p className='font-bold'>Thêm gắn thẻ</p>
          <button
            className='border text-red-500 hover:bg-red-500 hover:text-white font-bold w-[25px] h-[25px] rounded'
            onClick={openForm}
          >
            X
          </button>
        </div>

        <form onSubmit={onSubmit}>
          <div className='m-4 flex flex-col items-center gap-4'>
            <div className='w-full mt-4 px-2 '>
              <div className='border-b border-gray-300 py-2'>
                <p className='text-sm font-semibold text-gray-700 dark:text-gray-400'>Tên:</p>
                <input
                  type='text'
                  className='bg-white border-none focus:outline-none w-full text-gray-600'
                  {...register('name')}
                  // disabled={disabled}
                  defaultValue={tagEdit ? tagEdit.name : ''}
                  required
                />
              </div>
              <div className='border-b border-gray-300 py-2'>
                <p className='text-sm font-semibold text-gray-700 dark:text-gray-400'>Mô tả:</p>
                <input
                  type='text'
                  className='bg-white border-none focus:outline-none w-full text-gray-600'
                  {...register('description')}
                  // disabled={disabled}
                  defaultValue={tagEdit ? tagEdit.description : ''}
                  required
                />
              </div>
            </div>
          </div>
          {action === 'add' ? (
            <div className='flex justify-end '>
              <button
                type='submit'
                className='border-2 border-purple-500 bg-white hover:bg-purple-500
             hover:text-white text-black py-1 px-3 rounded-sm shadow-sm mr-6 '
              >
                Thêm
              </button>
            </div>
          ) : (
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
