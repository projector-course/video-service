const VERIFICATION_ERROR_TYPE = {
  EXIST_ERROR: 'exist_error',
  NOT_FOUND_ERROR: 'not_found',
};

class VerificationError extends Error {
  constructor(errorType, message = '') {
    super(message);
    this.type = errorType;
  }
}

module.exports = { VERIFICATION_ERROR_TYPE, VerificationError };
