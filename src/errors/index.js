/* eslint-disable max-classes-per-file */
class VideoNotFoundError extends Error {
  constructor(message = 'Video not found') {
    super(message);
    this.name = 'Video not found';
    this.status = 404;
  }
}

class ServiceKeyError extends Error {
  constructor(message = 'Bad service key') {
    super(message);
    this.name = 'ServiceKeyError';
    this.status = 401;
  }
}

module.exports = {
  VideoNotFoundError,
  ServiceKeyError,
};
