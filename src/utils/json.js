/**
 * 深度解构
 * @param json
 */
exports.depthDeconstruction = json => {
  const result = {};
  const depthDeconstruction = json => {
    Object.keys(json).forEach(key => {
      switch (Object.prototype.toString.call(json[key])) {
        case '[object Array]':
        case '[object Object]':
          depthDeconstruction(json[key]);
          break;
        default:
          result[key] = json[key];
      }
    });
  };
  depthDeconstruction(json);
  return result;
};

/**
 * 键值组合 [key, value]
 * @param json
 */
exports.keyValueMerge = json => {
  Object.keys(json).forEach(key => {
    switch (Object.prototype.toString.call(json[key])) {
      case '[object Array]':
      case '[object Object]':
        this.keyValueMerge(json[key]);
        break;
      default:
        json[key] = [key, json[key]];
    }
  });
  return json;
};

/**
 * 键过滤
 * @param obj 对象
 * @param keys 键列表
 * @param isShow 键列表所对应键是否显示
 */
exports.filter = (obj, keys, isShow = true) => {
  if (typeof obj !== 'object') {
    return obj;
  }
  return Object.keys(obj)
    .filter(key => keys.includes(key) === isShow)
    .reduce((val, key) => {
      val[key] = obj[key];
      return val;
    }, {});
};
