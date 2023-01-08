import jwt from 'jsonwebtoken';

export const signinToken = (
  params,
  secret = process.env.JWT_SECRET,
) => {
  const token = jwt.sign(params, secret, {
    expiresIn: process.env.TOKEN_EXPIRATION || '24h',
  });
  return token;
};
// decoding token
export const decode = (token, secret = process.env.JWT_SECRET) => {
  const payload = jwt.verify(token, secret);
  return payload;
};
