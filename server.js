const request = require('request');
const yapi = require('yapi.js');


module.exports = function (options) {
  // Get access_token
  const getAccessToken = async (oauthcode, clientId, secret, redirectUri) => new Promise((resolve, reject) => {
    const tokenPath = 'https://www.googleapis.com/oauth2/v4/token'
    const data = {
      "code": oauthcode,
      "grant_type": "authorization_code",
      "client_id": clientId,
      "client_secret": secret,
      "redirect_uri": redirectUri
    }
    request.post(tokenPath, { json: data }, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        resolve(body);
      }
      reject(error);
    })
  })
  
  // Get user info
  const getUserInfo = async (token) => new Promise((resolve, reject) => {
    const userInfoUrl = 'https://www.googleapis.com/oauth2/v1/userinfo'
    request(userInfoUrl + "?access_token=" + token.access_token, function (error, response, body) {
      yapi.commons.log(body, "user info")
      if (!error && response.statusCode == 200) {
        let result = JSON.parse(body);
        if (result) {
          let ret = {
            email: result.email,
            username: result.name
          };
          resolve(ret);
        } else {
          reject(result);
        }
      }
      reject(error);
    });
  });
  
  // Google login: get userInfo by access_token 
  this.bindHook('third_login', async (ctx) => {
    let oauthcode = ctx.request.query.code;
    yapi.commons.log(oauthcode, "google login")
    if (!oauthcode) {
      return (ctx.body = yapi.commons.resReturn(null, 400, 'code不能为空'));
    }
    let oauthstate = ctx.request.query.state;
    if (!oauthstate) {
      return (ctx.body = yapi.commons.resReturn(null, 400, 'state不能为空'));
    }
  
    const { clientId, secret, redirectUri } = options
    try {
      const token = await getAccessToken(oauthcode, clientId, secret, redirectUri)
      const userInfo = await getUserInfo(token)
      return userInfo
    } catch(e) {
      return {
        status_code: e.statuscode,
        message: e.statusMessage
      }
    }
  });
};
