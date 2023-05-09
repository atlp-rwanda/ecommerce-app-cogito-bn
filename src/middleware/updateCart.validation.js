import Joi from 'joi';

const updateCartSchema = Joi.object({
 
  neededQuantity: Joi.number()
    .integer()
    .positive()
    .required()
});

const updateCartValidation = async (req, res, next) => {
  try {
    const { error } = updateCartSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
   next();
  } catch (error) {
    return res.status(500).json({
      status: 'Failed to update cart item',
      message: error.message,
    });
  }
};

export { updateCartValidation };
