import dotenv from 'dotenv';
import JWT from 'jsonwebtoken';

dotenv.config();
const secret = process.env.JWT_KEY;
const vendorSignAccessToken = async (id, fullName, status) => {
  const payload = {
    id,
    fullName,
    status,
  };
  const options = { expiresIn: process.env.VENDOR_LOGIN_JWT_EXPIRE };
  try {
    const token = await JWT.sign(payload, secret, options);
    return { token };
  } catch (error) {
    throw new Error(error);
  }
};
export default vendorSignAccessToken;
