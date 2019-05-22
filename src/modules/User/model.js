const mongoose = require('mongoose');
const model = require('../Common/model');

// 用户基本信息
const Schema = new mongoose.Schema({
  // 手机号
  mobile: String,
  // 手机验证码 (注册/登录)
  mobileCode: Number,
  // 手机验证码过期时间
  mobileCodeEndAt: Number,
  // 登录口令
  accessToken: String,
  // 口令过期时间
  accessTokenEndAt: Number,
  // 注册时间
  signUpAt: Number,
  // 最后登录时间
  signInLastAt: Number,
  // 状态
  status: {
    type: Number,
    // [删除, 无效, 有效]
    enum: [-100, 0, 100],
    default: 100,
  },
});

Schema.plugin(model);
module.exports = mongoose.model('user', Schema);
