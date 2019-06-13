/**
 * 格式化请求参数
 * @param obj 请求参数对象
 */
exports.format = obj => {
  const params = [];

  const paramHandle = (paramObj = {}, keyName) => {
    let type = Object.prototype.toString.call(paramObj);
    if (type === '[object String]' || type === '[object Number]') {
      params.push([keyName, paramObj]);
    }
    else if (type === '[object Boolean]' || type === '[object Null]') {
      params.push([keyName, paramObj || '']);
    }
    else {
      Object.keys(paramObj).forEach(key => {
        type = Object.prototype.toString.call(paramObj[key]);
        if (type === '[object Object]') {
          paramHandle(paramObj[key], keyName ? `${keyName}[${key}]` : key);
        }
        else if (type === '[object Array]') {
          paramObj[key].forEach((v, k) => {
            paramHandle(v, keyName ? `${keyName}[${key}][${k}]` : `${key}[${k}]`);
          });
        }
        else if (type === '[object Boolean]' || type === '[object Null]') {
          params.push([keyName ? `${keyName}[${key}]` : key, paramObj[key] || '']);
        }
        else {
          params.push([keyName ? `${keyName}[${key}]` : key, paramObj[key]]);
        }
      });
    }
  };

  paramHandle(obj);

  return params.map(v => `${encodeURIComponent(v[0])}=${encodeURIComponent(v[1])}`).join('&');
};

/**
 * 获取请求链接
 * @param data 请求参数数据
 * @param url 请求url
 */
exports.getUrl = (data, url) => {
  if (typeof data !== 'object' || Object.keys(data).length === 0) {
    return url;
  }

  let params = '?';
  if (url.indexOf(params) > -1) {
    params = '&';
  }
  url += params + this.format(data);

  return url;
};
