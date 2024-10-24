export const formatRegistrationTime = (time) => {
  const date = new Date(time)
  return date.toLocaleDateString('vi-VN', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric'
  })
}
