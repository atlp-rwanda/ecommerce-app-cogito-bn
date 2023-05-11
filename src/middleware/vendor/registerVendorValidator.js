import Joi from 'joi';

const validator = (schema) => (payload) => schema.validate(payload, { abortEarly: false });

const registerVendor = Joi.object({
  userId: Joi.number().required(),
  businessName: Joi.string().required(),
  businessAddress: Joi.array().required(),
  businessPhoneNumber: Joi.string().pattern(/^\+?[0-9]{6,}$/).required(),
  businessEmail: Joi.string().email().required(),
  businessWebsite: Joi.string().uri(),
  businessDescription: Joi.string().required(),
  businessLogo: Joi.any(),
  productCategories: Joi.array().required(),
  paymentMethods: Joi.array().required(),
  status: Joi.string().required(),
});

const loginVendor = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().pattern(/^[a-zA-Z0-9]{3,30}$/).min(8).max(16)
    .required(),
});

export const validateVendorRegistration = validator(registerVendor);
export const validateVendorLogin = validator(loginVendor);
