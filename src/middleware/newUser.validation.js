import Joi from 'joi';

const validation = Joi.object({
  name: Joi.string(),
  email: Joi.string().email(),
  gender: Joi.string(),
  phone: Joi.string(),
  birthdate: Joi.date(),
  preferred_language: Joi.string(),
  preferred_currency: Joi.string(),
  billingAddress: Joi.array().items(Joi.string()),
  roleId: Joi.number().integer(),
  password: Joi.string(),
});

const newUserValidation = async (req, res, next) => {
  const { error } = validation.validate(req.body, { abortEarly: false });
  if (error) {
    const errorDetails = error.details.map((err) => ({
      field: err.path[0],
      message: err.message,
    }));
    res.status(422).send({ status: 422, errors: errorDetails });
  } else {
    next();
  }
};
export default newUserValidation;
