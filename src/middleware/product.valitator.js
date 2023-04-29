import Joi from 'joi';

const validation = Joi.object({
  name: Joi.string(),
  description: Joi.string(),
  price: Joi.string(),
  image: Joi.string(),
  quantity: Joi.string(),
  stock: Joi.string(),
  category_id: Joi.number().integer(),
  vendor_id: Joi.number().integer(),
});

const productValidation = async (req, res, next) => {
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
export default productValidation;
