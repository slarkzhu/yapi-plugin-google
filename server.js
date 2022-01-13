const {OAuth2Client} = require('google-auth-library');

module.exports = function (options) {
  this.bindHook('third_login', (ctx) => {
    let token = ctx.request.body.token || ctx.request.query.token;
    return new Promise((resolve, reject) => {
      const client = new OAuth2Client(options.clientId);
      client.verifyIdToken({
        idToken: token,
        audience: options.key
      }).then(ticket => {
        const payload = ticket.getPayload();
        let ret = {
          email: payload.email,
          username: payload.name
        }
        resolve(ret)
      }).catch(e => {
        console.log(e)
        reject({message: 'access_token can not login!'})
      })
    })
  });
}