const authenticateAccount = require('@middlewares/authMiddleware')
const authorize = require('@middlewares/authorizationMiddleware')
const corsMiddleware = require('@middlewares/corsMiddleware')
const errorHandler = require('@middlewares/errorHandlerMiddleware')
const { validateAccountInfo, validateRegistration } = require('@middlewares/validationMiddleware')

module.exports = {
  authenticateAccount,
  authorize,
  corsMiddleware,
  errorHandler,
  validateAccountInfo,
  validateRegistration
}
