const sha1 = require('sha1');
const User = require('./model');
const Error = require('../../libs/Error');
const { randomNum } = require('../../utils/number');
const CODE = require('../../constants/responseCode');
const CONFIG = require('../../config');

/**
 * 登录
 * @param _id 用户ID
 * @param signUpAt !* 注册时间
 */
const signIn = async ({
  _id,
  signUpAt,
} = {}) => {
  const now = Date.now();
  // 是否自动注册
  const isAutoSignUp = !signUpAt;
  if (isAutoSignUp) {
    // 注册
    await User.updateOne({ _id }, { signUpAt: now });
  }
  // 登录口令
  const accessToken = sha1(now + Math.random());
  const userInfo = await User.findByIdAndUpdate(_id, {
    accessToken,
    accessTokenEndAt: now + CONFIG.SIGN_IN_ACCESS_TOKEN_DURATION,
    signInLastAt: now,
  }, { new: true });
  return { ...userInfo._doc, isAutoSignUp };
};

/**
 * 手机登录
 * @param mobile 手机号
 * @param mobileCode 手机验证码
 */
exports.signInForMobile = async ({
  mobile,
  mobileCode,
} = {}) => {
  const userInfo = await User.findOne({ mobile, mobileCode, mobileCodeEndAt: { $gte: Date.now() }, status: { $gte: 100 } });
  if (!userInfo) {
    // 验证码无效或已过期
    return new Error(CODE.USER.SING_IN_CODE_EXPIRED);
  }
  return signIn(userInfo);
};

/**
 * 发送手机验证码
 * @param mobile 手机号
 */
exports.sendMobileCode = async ({
  mobile,
} = {}) => {
  let userInfo = await User.findOne({ mobile });
  // 新手机
  if (!userInfo) {
    userInfo = await User.create({ mobile });
  }
  else if (userInfo.status < 100) {
    // 无效用户
    return new Error(CODE.USER.INVALID);
  }
  // 手机验证码
  let mobileCode = 0;
  if (CONFIG.IS_DEV) {
    // 开发环境验证码固定
    mobileCode = CONFIG.MOBILE_CODE;
  }
  else {
    mobileCode = randomNum(CONFIG.MOBILE_CODE_INTERVAL[0], CONFIG.MOBILE_CODE_INTERVAL[1]);
    // TODO 发送手机验证码

  }
  await User.updateOne({ _id: userInfo._id }, { mobileCode, mobileCodeEndAt: Date.now() + CONFIG.MOBILE_CODE_DURATION });
};

/**
 * 登录口令获取用户信息
 * @param accessToken 登录口令
 */
exports.getInfoForAccessToken = async accessToken => {
  const userInfo = await User.findOne({ accessToken, accessTokenEndAt: { $gte: Date.now() }, status: { $gte: 100 } });
  if (!userInfo) {
    // 无效的accessToken
    return new Error(CODE.USER.ACCESS_TOKEN_INVALID);
  }
  // 更新口令时间
  await User.updateOne({ _id: userInfo._id }, { accessTokenEndAt: Date.now() + CONFIG.SIGN_IN_ACCESS_TOKEN_DURATION });
  return userInfo;
};

/**
 * 获取用户信息
 */
exports.getInfo = () => global.app.userInfo;
