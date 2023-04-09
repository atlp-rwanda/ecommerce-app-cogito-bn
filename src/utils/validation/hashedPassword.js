import bcrypt from "bcrypt";
export const hashPassword = (password) => {
return bcrypt.hashSync(password, 10);
};
export const isPasswordMatching = (password, hashedPassword) => {
  return bcrypt.compareSync(password, hashedPassword);
};