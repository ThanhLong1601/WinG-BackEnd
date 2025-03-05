import { celebrate, Joi, Segments } from "celebrate";
import { CONTENT_TYPE, CONTENT_STATUS }from "../../../constants/content.constants";

export const createListCategoryValidation = celebrate({
  [Segments.BODY]: Joi.object({
    categories: Joi.array().items(Joi.object({
      name: Joi.string().required()
    })).required().messages({
      'any.required': 'Categories is required'
    })
  }),
});

const contentSchema = Joi.object({
  typeOfContent: Joi.string().required().valid(...Object.values(CONTENT_TYPE)).messages({
    'any.required': 'Type of content is required',
    'any.only': 'Type of content must be article, video or infographic'
  }),
  requiredDays: Joi.number().required().messages({
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
});

export const createContentValidation = celebrate({
  [Segments.BODY]: contentSchema,
});

export const updateCategoryValidation = celebrate({
  [Segments.PARAMS]: Joi.object({
    cateid: Joi.string().required().messages({
      'any.required': 'Category id is required'
    }),
  }),
  [Segments.BODY]: Joi.object({
    status: Joi.string().valid(...Object.values(CONTENT_STATUS)).messages({
      'any.only': 'Status must be active or inactive'
    }),
    name: Joi.string().messages({
      'any.required': 'Name is required'
    }),
  }).or('status', 'name'),
});

export const updateContentValidation = celebrate({
  [Segments.PARAMS]: Joi.object({
    conid: Joi.string().required().messages({
      'any.required': 'Content id is required'
    }),
  }),
  [Segments.BODY]: contentSchema.keys({
    status: Joi.string().valid(...Object.values(CONTENT_STATUS)).messages({
      'any.only': 'Status must be active or inactive'
    }),
  }).or('status', ...Object.keys(contentSchema.describe().keys)),
});


