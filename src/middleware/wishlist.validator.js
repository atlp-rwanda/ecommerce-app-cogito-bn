import Joi from 'joi';

const validation = Joi.object({
  userId: Joi.number().integer().required(),
  productId: Joi.number().integer().required(),
});

const wishlistValidator = async (req, res, next) => {
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
export default wishlistValidator;
