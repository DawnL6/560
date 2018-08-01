# 560注册认证


### 开发环境
```
node >= 8.10.0 npm >=6.6.0  yarn也行
```
## 步骤
```
git clone https://github.com/DawnL6/560.git 克隆项目
yarn install (npm run install)安装依赖 yarn 和 npm  选择一个即可
```

### 开发环境运行
```
yarn run serve (npm run serve)

运行成功后访问 http://192.168.2.198:8081/
```

### 生产环境部署
```
yarn run build (npm run build) 
打包成功后 把 dist内的文件放置到服务器根目录就可以了 切记不要带dist目录 
默认情况下，假定您的应用程序将部署在域的根目录，例如https://www.my-app.com/。如果您的应用程序部署在子路径中，则需要使用此选项指定该子路径。例如，如果您的应用程序部署在https://www.foobar.com/my-app/，设置baseUrl为'/my-app/' 具体配置见 vue.config.js 文件  这个步骤灰尘重要

如果更换接口地址 去修改 src/http 下面的index.js 的BASE_URL 即可。
```