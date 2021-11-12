const fs = require('fs');
const { v4: createUuid } = require('uuid');
const { convertVideo } = require('../../../services/convertVideo');
const { VIDEO_DIR } = require('../../../config');
const { uploadFile } = require('../../../services/uploadFile');

const uploadVideo = async (fileType, fileSize, readStream) => {
  const uuid = createUuid();
  const tmpFileName = `${VIDEO_DIR}/tmp/${uuid}`;
  const fileName = `${VIDEO_DIR}/${uuid}.mp4`;
  const deleteTmpFile = (reason) => fs.unlink(tmpFileName, (e) => console.log(e || `${reason}: TMP FILE DELETED`));

  await uploadFile(tmpFileName, fileSize, readStream);

  await convertVideo(tmpFileName, fileName, fileType, 'mp4')
    .then(() => {
      deleteTmpFile('CONVERTION END');
    })
    .catch((e) => {
      deleteTmpFile('CONVERTION ERROR');
      throw e;
    });
};

module.exports = { uploadVideo };
