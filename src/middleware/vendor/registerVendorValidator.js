import Joi from 'joi';

const validator = (schema) => (payload) => schema.validate(payload, { abortEarly: false });

const registerVendor = Joi.object({
  fullName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().pattern(/^[a-zA-Z0-9]{3,30}$/).min(8).max(16)
    .required(),
  phoneNumber: Joi.string().pattern(/^\+?[0-9]{6,}$/).required(),
  businessName: Joi.string().required(),
  businessAddress: Joi.string().required(),
  businessPhoneNumber: Joi.string().pattern(/^\+?[0-9]{6,}$/).required(),
  businessEmail: Joi.string().email().required(),
  businessWebsite: Joi.string().uri(),
  businessDescription: Joi.string().required(),
  businessLogo: Joi.any(),
  productCategories: Joi.string().required(),
  paymentMethods: Joi.string().required(),
  status: Joi.string().required(),
});

const loginVendor = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().pattern(/^[a-zA-Z0-9]{3,30}$/).min(8).max(16)
    .required(),
});

export const validateVendorRegistration = validator(registerVendor);
export const validateVendorLogin = validator(loginVendor);
