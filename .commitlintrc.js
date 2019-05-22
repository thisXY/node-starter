const types = [
  'ci', // 持续集成
  'docs', // 文档
  'feat', // 新功能
  'fix', // 修复缺陷
  'perf', // 性能调优
  'refactor', // 重构
  'revert', // 回滚
  'style', // 样式调整
  'test', // 测试相关
  'release', // 发布
  'chore' // 辅助功能，包括docker, gitlab相关修改
];

module.exports = {
  rules: {
    'body-leading-blank': [1, 'always'],
    'footer-leading-blank': [1, 'always'],
    'header-max-length': [2, 'always', 2000],
    'scope-case': [2, 'always', 'lower-case'],
    'subject-empty': [2, 'never'],
    'type-case': [2, 'always', 'lower-case'],
    'type-empty': [2, 'never'],
    'type-enum': [2, 'always', types]
  }
};
