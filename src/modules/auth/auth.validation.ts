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

export const registerValidation = celebrate({
  [Segments.BODY]: Joi.object({
    name: Joi.string().required().messages({
      'any.required': 'Name is required',
    }),
    phone: Joi.string().required().messages({
      'any.required': 'Phone number is required',
    }),
    email: Joi.string().email().required().messages({
      'any.required': 'Email is required',
    }),
    pinCode: Joi.string().length(4).required().messages({
      'any.required': 'Pin code is required',
      'string.length': 'Pin code must be 4 digits',
    }),
  }),
});
