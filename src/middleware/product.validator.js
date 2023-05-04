import Joi from 'joi';
import CloudUpload from '../utils/cloudinary/cloudinary';

const validation = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.number().required(),
  image: Joi.array().items(Joi.string()).min(4).max(8)
    .required(),
  quantity: Joi.number(),
  stock: Joi.string(),
  category_id: Joi.number().integer(),
  expiredAt: Joi.date(),
});

const productValidation = async (req, res, next) => {
  req.body.image = await CloudUpload.multi(req.files);

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
