const { checkServiceKey } = require('../utils/chekServiceKey');
const { readToken } = require('../utils/crypto');

const isAuth = async (ctx, next) => {
  const { headers } = ctx;

  const { 'x-token': token, 'x-service-key': serviceKey } = headers;
  if (!token || !serviceKey) ctx.throw(401);

  checkServiceKey(serviceKey);

  const { data } = readToken(token);

  ctx.user = data;

  return next();
};

module.exports = { isAuth };
