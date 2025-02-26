"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerValidation = exports.loginValidation = void 0;
const celebrate_1 = require("celebrate");
exports.loginValidation = (0, celebrate_1.celebrate)({
    [celebrate_1.Segments.BODY]: celebrate_1.Joi.object({
        phone: celebrate_1.Joi.string().required().messages({
            'any.required': 'Phone number is required',
        }),
        pinCode: celebrate_1.Joi.string().required().messages({
            'any.required': 'Pin code is required',
        }),
    }),
});
exports.registerValidation = (0, celebrate_1.celebrate)({
    [celebrate_1.Segments.BODY]: celebrate_1.Joi.object({
        name: celebrate_1.Joi.string().required().messages({
            'any.required': 'Name is required',
        }),
        phone: celebrate_1.Joi.string().required().messages({
            'any.required': 'Phone number is required',
        }),
        email: celebrate_1.Joi.string().email().required().messages({
            'any.required': 'Email is required',
        }),
        pinCode: celebrate_1.Joi.string().length(4).required().messages({
            'any.required': 'Pin code is required',
            'string.length': 'Pin code must be 4 digits',
        }),
    }),
});
//# sourceMappingURL=auth.validation.js.map