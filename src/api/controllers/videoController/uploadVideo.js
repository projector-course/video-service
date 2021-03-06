const fs = require('fs');
const { v4: createUuid } = require('uuid');
const { getModuleLogger } = require('../../../services/logService');
const { VIDEO_DIR } = require('../../../services/configService');
const { uploadFile } = require('../../../services/uploadFile');
const { convertVideo } = require('../../../services/convertVideo');
const db = require('../../../db/models');

const logger = getModuleLogger(module);
logger.debug('CONTROLLER CREATED');

const uploadVideo = async (fileType, fileSize, readStream, userId) => {
  const uuid = createUuid();
  const filename = `${uuid}.mp4`;
  const tmpFilePath = `${VIDEO_DIR}/tmp/${filename}`;
  const filePath = `${VIDEO_DIR}/${filename}`;
  const deleteTmpFile = (reason) => fs.unlink(tmpFilePath, (e) => {
    if (e) logger.error(e);
    else logger.debug('%s: TMP FILE DELETED', reason);
  });

  await uploadFile(tmpFilePath, fileSize, readStream);
  logger.info({ fileType, fileSize }, 'UPLOAD VIDEO');

  await convertVideo(tmpFilePath, filePath, fileType, 'mp4')
    .then(() => {
      logger.info({ fileType, fileSize }, 'CONVERT VIDEO');
      deleteTmpFile('CONVERTION END');
    })
    .catch((e) => {
      deleteTmpFile('CONVERTION ERROR');
      throw e;
    });

  return db.videos.create({
    userId,
    filename,
  }).catch((error) => {
    fs.unlink(filePath, (e) => {
      if (e) logger.error(e);
    });
    throw error;
  });
};

module.exports = { uploadVideo };
