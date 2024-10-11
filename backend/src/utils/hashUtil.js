const bcrypt = require('bcrypt')
const saltRounds = 10

const hashPassword = async (password) => {
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds)
    return hashedPassword
  } catch (error) {
    throw new Error('Error hashing password: ' + error.message)
  }
}

const comparePassword = async (enteredPassword, hashedPassword) => {
  try {
    const isMatch = await bcrypt.compare(enteredPassword, hashedPassword)
    return isMatch
  } catch (error) {
    throw new Error('Error comparing password: ' + error.message)
  }
}

module.exports = {
  hashPassword,
  comparePassword
}
