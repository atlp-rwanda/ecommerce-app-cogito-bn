import Joi from 'joi';

const validation = Joi.object({
  coupon_code: Joi.string().required(),
  discount_type: Joi.string().required(),
  discount_amount: Joi.number(),
  discount_percentage: Joi.number(),
  minimum_purchase_amount: Joi.number().integer(),
  vendorId: Joi.number().integer(),
  associated_products: Joi.array().items(Joi.number().integer()),
  start_date: Joi.date().required(),
  end_date: Joi.date(),
  usage_limit: Joi.number().integer(),
  usage_count: Joi.number().integer(),
});

const couponValidation = async (req, res, next) => {
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
export default couponValidation;
