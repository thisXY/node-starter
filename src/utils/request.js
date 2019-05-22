const request = require('request');
const { getUrl } = require('./param');

/**
 * 请求
 * @param method [POST, GET, PUT, DELETE]
 * @param data 数据
 * @param url 链接
 * @param headers 请求头
 * @param success 成功回调
 * @param fail 失败回调
 */
module.exports = ({ method = 'GET', data, url, headers = {}, success, fail } = {}) => {
  return new Promise((resolve, reject) => {
    const info = {
      method,
      uri: url,
      headers,
    };
    if (method.toUpperCase() === 'GET') {
      info.uri = getUrl(data, url);
    }
    else {
      info.body = JSON.stringify(data);
    }
    request(info, (error, response, body) => {
      if (!error && response.statusCode === 200) {
        if (success) success(JSON.parse(body));
        resolve(JSON.parse(body));
      }
      else {
        if (fail) fail(error, response);
        reject(error, response);
      }
    });
  });
};
