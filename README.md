# Spring-CQ-demo-UI
这是Spring-CQ-demo的页面。基于Vue框架+Vuetify组件库开发。

框架项目地址：https://github.com/lz1998/spring-cq

后端项目地址：https://github.com/lz1998/spring-cq-demo

## 项目环境
- nodejs 12.16.1
- npm 6.13.4

## 功能
- 登陆/注册
- 机器人状态监控
- 学习管理
- 欢迎管理

## 项目设计
### src/api
定义了与后端交互的接口

### src/assets
用于存放静态文件

### src/components
存放项目公用的组件
- myImg 由于vuetify的图片组件不兼容小米浏览器，所以自己写 
- cqCodeGenerate 生成酷Q码工具

### src/plugins
不知道是啥，文档上说要这样写

### src/router
定义vue路由、路由守卫(未登陆自动跳转到登陆)

menuItems是左侧导航栏对应的内容

### src/store
没啥用

### src/utils
requests是自己封装的发送http请求工具。如果未登录会自动跳转，并在发送请求前、收到响应后，对数据进行初步处理。

### src/views
定义了各个页面。
- login 登陆页面
- layout 布局，包含顶部和左侧导航栏
- status 机器人状态监控
- learnManage 学习管理
- welcomeManage 欢迎管理

### .env
设置后端地址

## 接口设计
详情看后端Controller
### 登陆
地址：`/api/security/login`

参数：用户名/密码

返回：正确token，错误验证码

### 查询状态
地址：`/api/bot/getStatus`

Header：'Bearer '+token

### 查询学习
地址：`/api/learn/getGroupLearnPage`

Header：'Bearer '+token

### 修改学习
地址：`/api/learn/setGroupLearn`
Header：'Bearer '+token

### 删除学习
地址：`/api/learn/deleteGroupLearn`

Header：'Bearer '+token

### 查询欢迎
地址：`/api/welcome/getWelcome`

Header：'Bearer '+token

### 修改欢迎
地址：`/api/welcome/setWelcome`

Header：'Bearer '+token


## 运行部署

### 安装所需依赖
```
npm install
```

### 运行 开发调试
```
npm run serve
```

### 打包静态文件
```
npm run build
```
结果在dist文件夹，复制到后端的static文件夹中

