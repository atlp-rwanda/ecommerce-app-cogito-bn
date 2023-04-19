import Joi from 'joi';

const validator = (schema) => (payload) => schema.validate(payload, { abortEarly: false });

const loginUser = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().pattern(/^[a-zA-Z0-9]{3,30}$/).min(8).max(16)
    .required(),
});

// eslint-disable-next-line import/prefer-default-export
export const validateUserLogin = validator(loginUser);
