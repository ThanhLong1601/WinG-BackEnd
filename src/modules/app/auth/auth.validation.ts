import {celebrate, Joi, Segments} from 'celebrate';

export const loginValidation = celebrate({
  [Segments.BODY]: Joi.object({
    phone: Joi.string().required().messages({
      'any.required': 'Please input a valid phone number',
    }),
    pinCode: Joi.string().required().messages({
      'any.required': 'Please input your PIN Code',
    }),
  }),
});

export const registerValidation = celebrate({
  [Segments.BODY]: Joi.object({
    name: Joi.string().required().messages({
      'any.required': 'Please input Your Name',
    }),
    phone: Joi.string().required().messages({
      'any.required': 'Please input a valid phone number',
    }),
    email: Joi.string().email().required().messages({
      'any.required': 'Please input Email Address', 
    }),
    pinCode: Joi.string().length(4).required().messages({
      'any.required': 'Pin code is required',
      'string.length': 'Pin code must be 4 digits',
    }),
  }),
});
