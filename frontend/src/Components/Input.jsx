export default function Input({
  className,
  titleLabel,
  type,
  placeholder,
  errorsMessgae,
  register,
  name,
  rules,
  autoComplete
}) {
  return (
    <div className={className}>
      <label className='block text-gray-700 font-semibold mb-1 text-sm' htmlFor='display-name'>
        {titleLabel}
      </label>
      <input
        className='border border-gray-300 rounded-lg p-2 w-full text-sm'
        type={type}
        placeholder={placeholder}
        {...register(name, rules)}
        autoComplete={autoComplete}
      />
      <div className='mt-1 min-h-[1.25rem] text-sm text-red-500'>{errorsMessgae}</div>
    </div>
  )
}
