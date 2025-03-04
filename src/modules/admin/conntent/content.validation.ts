import { celebrate, Joi, Segments } from "celebrate";
import { CONTENT_TYPE }from "../../../constants/content.constants";

export const createListCategoryValidation = celebrate({
  [Segments.BODY]: Joi.object({
    categories: Joi.array().items(Joi.object({
      name: Joi.string().required()
    })).required().messages({
      'any.required': 'Categories is required'
    })
  }),
});

export const createContentValidation = celebrate({
  [Segments.BODY]: Joi.object({
    typeOfContent: Joi.string().required().valid(...Object.values(CONTENT_TYPE)).messages({
      'any.required': 'Type of content is required',
      'any.only': 'Type of content must be article, video or infographic'
    }),
    requiredMonths: Joi.number().required().messages({
      'any.required': 'Please input required months'
    }),
    banner: Joi.string().allow(null, ''),
    title: Joi.string().required().messages({
      'any.required': 'Title is required'
    }),
    categoryId: Joi.string().required().messages({
      'any.required': 'Category is required'
    }),
    content: Joi.string().allow(null, ''),
    video: Joi.string().allow(null, ''),
    images: Joi.string().allow(null, '')
  }),
});

