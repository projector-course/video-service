const fs = require('fs');

function createDir(dir) {
  if (fs.existsSync(dir)) return;
  fs.mkdirSync(dir);
}

module.exports = { createDir };
