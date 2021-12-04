const Joi = require('joi');

const isId = Joi.number().integer().min(0).required();

const paramsSchema = Joi.object({
  id: isId,
});

const querySchema = Joi.object({
  userId: isId,
});

module.exports = { paramsSchema, querySchema };
