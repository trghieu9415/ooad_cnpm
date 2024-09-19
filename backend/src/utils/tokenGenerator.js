const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY

const generateToken = (account_id, member_id) => {
  return jwt.sign({ member_id: member_id, account_id: account_id }, secretKey, {
    expiresIn: '1h',
  });
};

module.exports = generateToken