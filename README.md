# node-stater
- 不关心ctx的控制器, 更便于用作控制器间作为"组件"相互调用
- 路由中间件的请求参数校验、请求参数格式化、请求身份验证等
- 校验规则的自定义
- 控制器响应数据的字段过滤并自动判断成功数据和失败异常处理response
- 请求响应状态码配置处理
- 结构规范
- ...
## 开发说明

### 工程结构
```
.
├── bin                         # 服务
│   ├── www                     # 发布服务
├── src                         # 主代码
│   ├── appUtils                # 应用内工具库
│   │   ├── response            # 请求响应
│   │   ├── validations         # 自定义校验规则
│   ├── assets                  # 静态资源
│   ├── config                  # 配置
│   │   ├── dev                 # 开发环境配置
│   │   ├── index               # 当前配置
│   │   ├── local.example       # 本地配置示例 (必需配置)
│   │   ├── prd                 # 发布环境配置
│   ├── constants               # 常量
│   │   ├── responseCode        # 请求响应状态码
│   ├── libs                    # 库
│   │   ├── Error               # 异常
│   ├── modules                 # 模块包
│   │   ├── Common              # 模块 (公共)
│   │   │   ├── controller      # 控制器
│   │   │   ├── model           # 模型
│   │   │   ├── router          # 模块路由
│   ├── router                  # 应用路由
│   │   ├── index               # 路由配置
│   │   ├── middleware          # 路由中间件
│   ├── utils                   # 通用工具库
│   │   ├── request             # 请求
│   ├── index                   # 应用入口
├── .commitlintrc               # git提交钩子配置
├── .eslintignore               # eslint忽略配置
├── .eslintrc                   # eslint规则配置
├── .gitignore                  # git忽略配置
├── app                         # 入口
└── package.json                # npm配置
```

### 路由配置

#### 配置结构
- [请求类型, 路由名, 控制器, { middleware: [中间件, ...], showFields: [显示字段, ...], hideFields: [隐藏字段, ...] }]
- 请求类型、路由名、控制器为必配

#### 中间件参数校验配置

- 自定义参数: {参数名: [[校验函数, [函数参数, ...]], ...]}
- 无自定义参数: {参数名: [校验函数, ...]}
- GET请求建议用校验规则格式化参数类型
- 自定义校验规则: src/appUtils/validations
- 校验函数见-> https://www.npmjs.com/package/koa-bouncer

### TODO

- 详细日志?
- 埋点?
- ...
