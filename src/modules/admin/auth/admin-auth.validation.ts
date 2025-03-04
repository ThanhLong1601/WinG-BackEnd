import { celebrate, Joi, Segments } from "celebrate";

export const adminRegisterValidation = celebrate({
  [Segments.BODY]: Joi.object({
    username: Joi.string().required().messages({
      'any.required': 'Please input a valid username',
    }),
    password: Joi.string().required().messages({
      'any.required': 'Please input your password',
    }),
    email: Joi.string().email().required().messages({
      'any.required': 'Please input Email Address',
      'string.email': 'Please input a valid Email Address',
    }),
    name: Joi.string().optional(),
  }),
});

export const adminLoginValidation = celebrate({
  [Segments.BODY]: Joi.object({
    username: Joi.string().required().messages({
      'any.required': 'Please input a valid username',
    }),
    password: Joi.string().required().messages({
      'any.required': 'Please input your password',
    }),
  }),
});