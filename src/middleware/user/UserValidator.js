const Joi = require('joi');

const validator = (schema) => (payload) => schema.validate(payload, { abortEarly: false });
const loginUser = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().pattern(/^[a-zA-Z0-9]{3,30}$/).min(8).max(16)
    .required(),
});
exports.validateUserLogin = validator(loginUser);
