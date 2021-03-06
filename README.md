# gitstars-vue
 > An webapp to use github and gitstars apis to view github msgs! (build by Vue.js)

## 截图
<img src="https://github.com/PeterLimao/gitstars-vue/raw/master/docs/img/WechatIMG1.jpeg" width="300"/>

<img src="https://github.com/PeterLimao/gitstars-vue/raw/master/docs/img/WechatIMG2.jpeg" width="300"/>

<img src="https://github.com/PeterLimao/gitstars-vue/raw/master/docs/img/WechatIMG3.jpeg" width="300"/>

## 访问地址
- 测试服: [http://test01.gitstars.cn](http://test01.gitstars.cn)
- 线上服: [https://gitstars.cn](https://gitstars.cn)

##使用的Api
- [github api](https://developer.github.com/v3/)
- [gitstars api](https://github.com/cnzx219/gitstars-openapi) :p

## 技术栈 (点击访问详细)
- [Vue.js@1.0.26](http://cn.vuejs.org/)
- [Vue-router@0.7.13](https://github.com/vuejs/vue-router)
- [Vuex@2.0.0](https://github.com/vuejs/vuex)
- [Vue-Resource@0.7.0](https://github.com/vuejs/vue-resource)
- [Materialize](http://materializecss.com/)

## 模块化&&项目构建
- [Webpack@1.13.1](https://github.com/webpack/webpack)

## 安装

项目地址：（`git clone`）

```shell
git clone https://github.com/PeterLimao/gitstars-vue.git
```

通过`npm`全局安装webpack和eslint(需要已安装[Node.js](https://nodejs.org/))

```shell
npm install -g webpack
npm install -g eslint
```

通过`npm`安装本地服务第三方依赖模块

```shell
npm install
```

启动服务(http://localhost:8080)

```
npm run dev
```

发布代码
```
npm run build
```


## Todos
- 完善单元测试 (:p 大坑)
- 使用Vue.js@2.x和Vue-Router@2.x重构项目

## LICENCE
MIT
