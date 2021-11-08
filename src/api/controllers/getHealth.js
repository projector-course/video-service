const packageJson = require('../../../package.json');

const getHealth = async (ctx) => {
  const { name, version } = packageJson;
  ctx.body = {
    name,
    version,
  };
};

module.exports = { getHealth };
