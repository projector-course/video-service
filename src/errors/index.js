/* eslint-disable max-classes-per-file */
class VideoNotFoundError extends Error {
  constructor(message = 'Video not found') {
    super(message);
    this.name = 'Video not found';
    this.status = 404;
  }
}

class BadTokenError extends Error {
  constructor(message = 'Bad token') {
    super(message);
    this.name = 'BadTokenError';
    this.status = 400;
  }
}

module.exports = {
  VideoNotFoundError,
  BadTokenError,
};
