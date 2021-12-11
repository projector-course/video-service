const VERIFICATION_ERROR_TYPE = {
  EXIST_ERROR: 'exist_error',
  NOT_FOUND_ERROR: 'not_found',
};

const HTTP_STATUS = {
  [VERIFICATION_ERROR_TYPE.NOT_FOUND_ERROR]: {
    status: 404,
    expose: true,
  },
  [VERIFICATION_ERROR_TYPE.EXIST_ERROR]: {
    status: 409,
    expose: true,
  },
};

class VerificationError extends Error {
  constructor(errorType, message = '') {
    super(message);
    this.type = errorType;
    const { status, expose } = HTTP_STATUS[errorType];
    this.status = status;
    this.expose = expose;
  }
}

module.exports = { VERIFICATION_ERROR_TYPE, VerificationError };
