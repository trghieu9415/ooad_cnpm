const { body, validationResult } = require("express-validator");

const validateAccountInfo = [
  body("username")
    .isLength({ min: 8 })
    .withMessage("Username must be at least 8 characters long")
    .matches(/^[a-z][a-z0-9]*$/)
    .withMessage("Username must start with a letter and only contain lowercase letters and numbers"),

  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long")
    .matches(/^[\S]*$/)
    .withMessage("Password cannot contain spaces")
    .matches(/^[a-zA-Z0-9!@#$%^&*()_+{}\[\]:;"'<>,.?/~`-]*$/)
    .withMessage("Password can only contain letters, numbers, and special characters"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

const validateRegistration = [
  body("email")
		.isEmpty()
		.withMessage("Email is required")
		.isEmail()
		.withMessage("Invalid email format"),

  body("phone")
		.isEmpty()
		.withMessage("Phone number is required")
    .matches(/^0\d{9}$/)
    .withMessage("Phone number must start with 0 followed by 9 digits"),
	
	body("name")
		.isEmpty()
		.withMessage("Name is required")
		.isString()
		.withMessage('Name must be a string'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = { validateAccountInfo, validateRegistration };
