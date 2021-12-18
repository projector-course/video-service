const { SERVICE_KEY } = require('../services/configService');
const { ServiceKeyError } = require('../errors');

function checkServiceKey(key) {
  const isValid = key === SERVICE_KEY;

  if (!isValid) throw new ServiceKeyError();

  return isValid;
}

module.exports = { checkServiceKey };
