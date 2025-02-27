import {celebrate, Joi, Segments} from 'celebrate';

export const updateUserValidation = celebrate({
  [Segments.BODY]: Joi.object({
    avatar: Joi.string().optional().allow(null, ''),
    name: Joi.string().required().messages({
      'any.required': 'Please input Your Name',
    }),
    dateOfBirth: Joi.date().required().messages({
      'any.base': 'Date of Birth must be a valid date',
      'any.required': 'Please input Your Date of Birth',
    }),
    isKkhPatient: Joi.boolean().allow(null, ''),
    ethnicity: Joi.string().required().messages({
      'any.required': 'Ethnicity is required',
    }),
    currentOccupation: Joi.string().required().messages({
      'any.required': 'Current Occupation is required',
    }),
    highestAttainedEducation: Joi.string().required().messages({
      'any.required': 'Highest Attained Education is required',
    }),
    hasPregnancies: Joi.boolean().allow(null, ''),
    vaginalDeliveries: Joi.number().positive().allow(null, '', 0).messages({
      'number.positive': 'Vaginal Deliveries must be a positive number',
    }),
    caesareanSections: Joi.number().positive().allow(null, '', 0).messages({
      'number.positive': 'Caesarean Sections must be a positive number',
    }),
    miscarriages: Joi.number().positive().allow(null, '', 0).messages({
      'number.positive': 'Miscarriages must be a positive number',
    }),
  })
});