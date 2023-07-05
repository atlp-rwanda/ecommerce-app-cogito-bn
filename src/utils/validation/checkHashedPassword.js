const isBcryptHashed = async (password) => {
  if (password.length === 60 && password.startsWith('$')) {
    // Check for other common bcrypt characteristics
    if (/\d/.test(password.slice(4))) {
      if (/[a-zA-Z]/.test(password.slice(4))) {
        if (/[.\\/]/.test(password.slice(4))) {
          return true;
        }
      }
    }
  }
  return false;
};
export default isBcryptHashed;
