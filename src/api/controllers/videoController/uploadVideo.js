const fs = require('fs');
const { v4: createUuid } = require('uuid');
const { convertVideo } = require('../../../services/convertVideo');
const { VIDEO_DIR } = require('../../../services/configService');
const { uploadFile } = require('../../../services/uploadFile');
const { getModuleLogger } = require('../../../services/logService');

const logger = getModuleLogger(module);
logger.debug('CONTROLLER CREATED');

const uploadVideo = async (fileType, fileSize, readStream) => {
  const uuid = createUuid();
  const tmpFileName = `${VIDEO_DIR}/tmp/${uuid}`;
  const fileName = `${VIDEO_DIR}/${uuid}.mp4`;
  const deleteTmpFile = (reason) => fs.unlink(tmpFileName, (e) => {
    if (e) logger.error(e);
    else logger.debug('%s: TMP FILE DELETED', reason);
  });

  await uploadFile(tmpFileName, fileSize, readStream);
  logger.info({ fileType, fileSize }, 'UPLOAD VIDEO');

  await convertVideo(tmpFileName, fileName, fileType, 'mp4')
    .then(() => {
      logger.info({ fileType, fileSize }, 'CONVERT VIDEO');
      deleteTmpFile('CONVERTION END');
    })
    .catch((e) => {
      deleteTmpFile('CONVERTION ERROR');
      throw e;
    });
};

module.exports = { uploadVideo };
