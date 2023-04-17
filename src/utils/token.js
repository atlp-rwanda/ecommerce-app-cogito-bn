import jwt from "jsonwebtoken";
import "dotenv/config";

export const generateToken = (data) => {
  return jwt.sign(data, process.env.JWT_KEY, { expiresIn: "1d" });
};

export const decodeToken = (token) => {
  return jwt.verify(token, process.env.JWT_KEY);
};
export default function decodeJWT(token) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const payload = JSON.parse(atob(base64));
  return payload;
}