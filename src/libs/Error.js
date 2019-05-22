// 私有定义
const _code = Symbol('code'); // 异常码
const _message = Symbol('message'); // 异常信息

// 异常
module.exports = class Error {
  /**
   * 构造
   * @param code 异常码 || [异常码, 异常信息]
   * @param message 异常信息
   */
  constructor(code, message) {
    if (code instanceof Array) {
      this[_code] = code[0];
      this[_message] = code[1];
    }
    else {
      this[_code] = code;
      this[_message] = message;
    }
  }

  /**
   * 获取异常码
   */
  get code() {
    return this[_code];
  }

  /**
   * 获取异常信息
   */
  get message() {
    return this[_message];
  }

  /**
   * 是否为同一异常
   * @param error 异常
   * @param isCheckMessage 是否判断异常信息
   */
  equal(error, isCheckMessage = false) {
    if (!(error instanceof Error)) {
      return false;
    }
    const isEqual = this.code === error.code;
    // 判断异常信息
    if (isEqual && isCheckMessage) {
      return this.message === error.message;
    }
    return isEqual;
  }
};
