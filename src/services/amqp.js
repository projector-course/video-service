const rabbit = require('amqplib');
const { getModuleLogger } = require('./logService');
const { AMQP_HOST, AMQP_EXCHANGE_NAME, AMQP_EVENT } = require('./configService');

const logger = getModuleLogger(module);
logger.debug('service CREATED');

const amqp = rabbit
  .connect(AMQP_HOST)
  .then((connection) => connection.createChannel())
  .then((channel) => {
    logger.debug('AMQP channel created');
    return channel;
  });

async function publish(data) {
  const dataStr = JSON.stringify(data);
  const message = Buffer.from(dataStr);
  const channel = await amqp;
  return channel.publish(AMQP_EXCHANGE_NAME, AMQP_EVENT, message);
}

module.exports = { publish };
