/**
 * 公共模型
 * @param schema
 */
module.exports = schema => {
  schema.add({
    // 创建时间
    createdAt: {
      type: Number,
      default: Date.now(),
    },
    // 修改时间
    updatedAt: {
      type: Number,
      default: Date.now(),
    },
    // 去掉__v
    __v: {
      type: Number,
      select: false,
    },
  });

  schema.pre(/updateOne|updateMany|bulkWrite/, function (next) {
    this.update({}, { $set: { updatedAt: Date.now() } });
    next();
  });
};
