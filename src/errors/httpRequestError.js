const REQUEST_ERROR_TYPE = {
  RESPONSE_ERROR: 'response_error',
  NETWORK_ERROR: 'network_error',
  DATA_ERROR: 'data_error',
};

class HttpRequestError extends Error {
  constructor(errorType, message, status) {
    super(message);
    this.type = errorType;
    this.status = status;
  }
}

module.exports = { REQUEST_ERROR_TYPE, HttpRequestError };
