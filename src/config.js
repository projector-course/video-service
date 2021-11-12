const HOST = '127.0.0.1';
const PORT = 3000;
const BASE_URL = `http://${HOST}:${PORT}`;
const SERVICE_NAME = 'VIDEO SERVICE';

const FILE_TYPES = [
  'mp4',
  'mov',
  'avi',
];

const CHUNK_SIZE = 2 * 1024 * 1024;

const VIDEO_DIR = 'store';

module.exports = {
  PORT,
  BASE_URL,
  FILE_TYPES,
  CHUNK_SIZE,
  VIDEO_DIR,
  SERVICE_NAME,
};
