const fs = require('fs');

const uploadFile = (fileName, fileSize, readStream) => {
  const deleteFile = () => fs.unlink(fileName, (e) => console.log(e));
  let uploadedSize = 0;

  readStream
    .once('data', () => {
      console.log('UPLOAD START');
    })
    .on('data', (chunk) => { uploadedSize += chunk.length; })
    .on('end', () => {
      console.log('UPLOAD END');
    })
    .on('error', (e) => {
      throw e;
    });

  const upload = (resolve, reject) => {
    const file = fs.createWriteStream(fileName);
    readStream.pipe(file);
    file
      .on('error', (e) => {
        deleteFile();
        reject(e);
      })
      .on('close', () => {
        if (uploadedSize !== fileSize) {
          const e = new Error('UPLOAD NOT COMPLETE');
          deleteFile();
          reject(e);
        }
        resolve();
      });
  };

  return new Promise(upload);
};

module.exports = { uploadFile };
