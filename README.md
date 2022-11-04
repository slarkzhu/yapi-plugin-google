# yapi-plugin-google

第三方插件，支持使用Google Login作为YApi的第三方登录

## step1

在生成的配置文件中，添加如下配置：  

``` json
"plugins": [
    {
      "name": "google",
      "options": {
         "buttonText": "Sign In with Google",
         "clientId": "xxx",
         "secret": "xxx",
         "redirectUri": "http://your-yapi-server/api/user/login_by_token"
      }
    }
  ]
```

这里面的配置项含义如下：  

- `buttonText` 登录按钮显示文字
- `clientId` google credentials clientId
- `secret` google credentials secret
- `redirectUri` 回调地址

## step 2

在 [Google Cloud](https://console.cloud.google.com/apis/credentials)中增加`redirectUri`到`Authorized redirect URIs`


## step 3

启动并测试服务

``` shell
npm install yapi-plugin-google
node server/app.js
```
