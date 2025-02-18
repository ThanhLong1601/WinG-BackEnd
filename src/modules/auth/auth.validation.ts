import {celebrate, Joi, Segments} from 'celebrate';

export const loginValidation = celebrate({
  [Segments.BODY]: Joi.object({
    phone: Joi.string().required().messages({
      'any.required': 'Phone number is required',
    }),
    pinCode: Joi.string().required().messages({
      'any.required': 'Pin code is required',
    }),
  }),
});
