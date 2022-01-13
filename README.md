# yapi-plugin-google

第三方插件，在生成的配置文件中，添加如下配置即可：  

``` json
"plugins": [
    {
      "name": "google",
      "options": {
         "buttonText": "Sign In with Google",
         "clientId": "xxx",
         "secret": "xxx"
      }
    }
  ]
```

这里面的配置项含义如下：  

- `buttonText` 登录按钮显示文字
- `clientId` google credentials clientId
- `secret` google credentials secret
