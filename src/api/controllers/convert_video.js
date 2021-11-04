const FF = require('fluent-ffmpeg');
const fs = require('fs');

const pathToFfmpeg = 'D:\\Program Files\\ffmpeg-n4.4.1-win64-gpl-4.4\\bin\\ffmpeg.exe';

FF.setFfmpegPath(pathToFfmpeg);

const convertVideo = (input, output, from, to) => new Promise((resolve, reject) => {
  if (from === to) {
    fs.copyFile(input, output, (e) => (e ? reject() : resolve()));
    return;
  }

  new FF(input)
    .inputFormat(from)
    .outputFormat(to)
    .output(output)
    .on('codecData', console.log)
    .on('error', reject)
    .on('end', resolve)
    .run();
});

module.exports = {
  convertVideo,
};
