const FF = require('fluent-ffmpeg');
const FFpath = require('@ffmpeg-installer/ffmpeg').path;
const fs = require('fs');

FF.setFfmpegPath(FFpath);

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
