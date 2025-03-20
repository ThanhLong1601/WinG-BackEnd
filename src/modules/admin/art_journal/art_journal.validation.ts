import { celebrate, Joi, Segments } from "celebrate";
import { ART_JOURNAL_STATUS } from "../../../constants/art_journal.constants";

const artJournalSchema = Joi.object({
  name: Joi.string().required().messages({
    'any.required': 'Please input topic name',
  }),
  status: Joi.string().valid(...Object.values(ART_JOURNAL_STATUS)).messages({
    'any.only': 'Status must be active or inactive',
  }),
  point: Joi.number().integer().min(0).messages({
    'number.base': 'Point must be a number',
    'number.integer': 'Point must be an integer',
    'number.min': 'Point must be at least 0',
  }),
  isDrawCircle: Joi.boolean().allow(null, ''),
  description: Joi.string().allow(null, ''),
  banner: Joi.string().allow(null, ''),
});

export const createdArtJournal = celebrate({
  [Segments.BODY]: artJournalSchema,
});

export const updatedArtJournal = celebrate({
  [Segments.PARAMS]: Joi.object({
    aid: Joi.string().required().messages({
      'any.required': 'Art journal id is required',
    }),
  }),
  [Segments.BODY]: artJournalSchema,
});