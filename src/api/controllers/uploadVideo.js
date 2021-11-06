const fs = require('fs');
const { v4: createUuid } = require('uuid');
const { convertVideo } = require('../../services/convertVideo');
const { FILE_TYPES, VIDEO_DIR } = require('../../config');

const uploadVideo = (ctx) => {
  const fileType = ctx.is(...FILE_TYPES);
  if (!fileType) ctx.throw(406, 'Not Acceptable');

  const uuid = createUuid();
  const tmpFileName = `${VIDEO_DIR}/tmp/${uuid}`;
  const fileName = `${VIDEO_DIR}/${uuid}.mp4`;
  const deleteTmpFile = (reason) => fs.unlink(tmpFileName, (e) => console.log(e || `${reason}: TMP FILE DELETED`));

  const file = fs.createWriteStream(tmpFileName);

  const { req } = ctx;
  req.pipe(file);

  req.once('data', () => {
    console.log('UPLOAD START');
  });

  req.on('error', () => {
    deleteTmpFile('UPLOAD ERROR');
    ctx.throw(500, 'UPLOAD ERROR');
  });

  let uploadingEnd = false;

  req.on('aborted', () => {
    if (uploadingEnd) return;
    deleteTmpFile('ABORTED');
  });

  const response = (resolve, reject) => {
    req.on('end', () => {
      uploadingEnd = true;
      console.log('UPLOAD END');
      convertVideo(tmpFileName, fileName, fileType, 'mp4')
        .then(() => {
          deleteTmpFile('CONVERTION END');
          ctx.status = 201;
          ctx.body = 'FILE UPLOADED';
          resolve();
        })
        .catch(() => {
          deleteTmpFile('CONVERTION ERROR');
          ctx.throw(500, 'CONVERTION ERROR');
        })
        .catch(reject);
    });
  };

  return new Promise(response);
};

module.exports = { uploadVideo };
