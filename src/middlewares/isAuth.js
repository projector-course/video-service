const crypto = require('../utils/crypto');

const isAuth = async (ctx, next) => {
  const { headers } = ctx;

  const { 'x-token': token, 'x-service-token': serviceToken } = headers;
  if (!token || !serviceToken) ctx.throw(401);

  crypto.checkToken(serviceToken);

  const { data } = crypto.readToken(token);

  ctx.user = data;

  return next();
};

module.exports = { isAuth };
