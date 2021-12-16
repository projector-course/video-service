const Joi = require('joi');

const isId = Joi.number().integer().min(0).required();

// const userSchema = Joi.object({
//   userId: isId,
// });

const getVideoSchema = Joi.object({
  id: isId,
  // userId: isId,
});

module.exports = { getVideoSchema };
