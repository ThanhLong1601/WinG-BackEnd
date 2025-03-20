import { celebrate, Joi, Segments } from "celebrate";

export const submission = celebrate({
  [Segments.PARAMS]: Joi.object({
    aid: Joi.string().required().messages({
      'any.required': 'Art journal id is required',
    }),
  }),
  [Segments.BODY]: Joi.object({
    canvas: Joi.string().required().messages({
      'any.required': 'Canvas is required',
    }),
    userThoughts: Joi.string().allow(null, ''),
  }),
});