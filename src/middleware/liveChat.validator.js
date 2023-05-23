import Joi from 'joi';

const messageSchema = Joi.object({
  message: Joi.string().required(),
  sender: Joi.string().required(),
});
export default messageSchema;
