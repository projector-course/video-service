const packageJson = require('../../../../package.json');

const getHealth = () => {
  const { name, version } = packageJson;
  return {
    name,
    version,
  };
};

module.exports = { getHealth };
