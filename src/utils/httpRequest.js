const axios = require('axios');
const { HttpRequestError, REQUEST_ERROR_TYPE } = require('../errors/httpRequestError');

function checkJson(reqPromise) {
  return reqPromise
    .then((res) => {
      const { headers, data } = res;
      const { 'content-type': contentType } = headers;
      if (!/^application\/json/.test(contentType)) {
        throw new HttpRequestError(REQUEST_ERROR_TYPE.DATA_ERROR, 'Wrong content-type');
      }
      if (typeof data === 'string') {
        throw new HttpRequestError(REQUEST_ERROR_TYPE.DATA_ERROR, 'Wron data format');
      }
      return data;
    })
    .catch((e) => {
      if (e instanceof HttpRequestError) throw e;
      if (e.response) throw new HttpRequestError(REQUEST_ERROR_TYPE.RESPONSE_ERROR, e.message);
      else if (e.request) throw new HttpRequestError(REQUEST_ERROR_TYPE.NETWORK_ERROR, e.message);
      throw e;
    });
}

function get(url, options) {
  return checkJson(axios.get(url, options));
}

function post(url, data, options) {
  return checkJson(axios.post(url, data, options));
}

module.exports = { get, post };
