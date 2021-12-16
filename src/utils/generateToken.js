const { PREFIX: prefix } = require('../services/configService');
const crypto = require('./crypto');

const data = { prefix };
const token = crypto.createToken({ data }, '1d');
// eslint-disable-next-line no-console
console.log(token);
