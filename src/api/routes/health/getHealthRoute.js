const { getHealth } = require('../../controllers/healthController/getHealth');

const getHealthRoute = async (ctx) => {
  ctx.log.debug('ROUTE: %s', ctx.path);
  ctx.body = await getHealth();
};

module.exports = { getHealthRoute };
