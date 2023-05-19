import Joi from 'joi';

const validation = Joi.object({
  userId: Joi.number().min(1).required(),
  productId: Joi.number().min(1).required(),
  rating: Joi.number().min(1).max(5).required(),
  message: Joi.string().required(),
});

const reviewValidator = async (req, res, next) => {
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
export default reviewValidator;
