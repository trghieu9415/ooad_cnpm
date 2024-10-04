const createResData = (status, data) => {
  const success = status < 300 && status >= 200
  if (!success) {
    console.log(data)
  }
  return { status, success: success, data }
}

module.exports = createResData
