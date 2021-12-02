/* eslint-disable import/no-dynamic-require */
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const CONFIG = require('../../services/configService');
const { getModuleLogger } = require('../../services/logService');

const logger = getModuleLogger(module);

const dbConfig = CONFIG[CONFIG.NODE_ENV];
const options = {
  ...dbConfig,
  logging: logger.debug.bind(logger),
};

let sequelize;
if (dbConfig.use_env_variable) {
  sequelize = new Sequelize(process.env[dbConfig.use_env_variable], options);
} else {
  sequelize = new Sequelize(options);
}

const basename = path.basename(__filename);
const db = {};

fs
  .readdirSync(__dirname)
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    // eslint-disable-next-line global-require
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

async function checkConnection() {
  try {
    await sequelize.authenticate();
    logger.debug('Connection has been established successfully.');
  } catch (e) {
    logger.error(e, 'Unable to connect to the database:');
  }
}

checkConnection();

module.exports = db;
