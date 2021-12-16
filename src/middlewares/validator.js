const { getVideoSchema } = require('../api/schema');
const { FILE_TYPES } = require('../services/configService');

const validate = {
  post: async (ctx, next) => {
    const fileType = ctx.is(...FILE_TYPES);
    if (!fileType) ctx.throw(406, 'Not Acceptable');

    const { headers } = ctx;
    const { 'content-length': size } = headers;
    if (!+size) ctx.throw(400, 'Wrong File Size');

    // const { error } = userSchema.validate(query);
    // if (error) ctx.throw(400, error.message);

    return next();
  },

  get: (ctx, next) => {
    const { params } = ctx;
    const { error } = getVideoSchema.validate(params);
    if (error) ctx.throw(400, error.message);
    return next();
  },

  // getList: async (ctx, next) => {
  //   const { query } = ctx;
  //   const { error } = userSchema.validate(query);
  //   if (error) ctx.throw(400, error.message);
  //   await next();
  // },
};

module.exports = { validate };
