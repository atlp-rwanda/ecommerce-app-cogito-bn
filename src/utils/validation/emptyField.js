export const checkEmptyFields = (req, res, next) => {
    const emptyFields = Object.keys(req.body).filter(field => req.body[field] === '');
    if (emptyFields.length > 0) {
      return res.status(409).json({ message: `Please fill the following fields: ${emptyFields.join(', ')}` });
    }
    return next;
  };
  