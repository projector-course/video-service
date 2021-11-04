const fs = require('fs');
const { VIDEO_DIR } = require('../../config');

const getVideoList = async (ctx) => {
  const dir = await fs.promises.opendir(VIDEO_DIR)
    .catch((e) => ctx.throw(500, e.message));

  const videos = [];
  async function readDir() {
    const entry = await dir.read().catch((e) => ctx.throw(500, e.message));
    if (!entry) return;
    if (entry.isFile()) videos.push(entry.name);
    await readDir();
  }

  await readDir();
  dir.close();

  ctx.body = videos;
};

module.exports = { getVideoList };
