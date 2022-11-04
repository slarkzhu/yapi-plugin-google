import React from 'react';

module.exports = function (options) {
  const handleLogin = () => {
    const { redirectUri, clientId } = options;
    const rootUrl = 'https://accounts.google.com/o/oauth2/v2/auth'
    const params = {
      redirect_uri: redirectUri,
      client_id: clientId,
      access_type: 'offline',
      response_type: 'code',
      prompt: 'consent',
      scope: [
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email',
      ].join(' '),
      state: 'test',
    };
    const qs = new URLSearchParams(params);
    location.href = `${rootUrl}?${qs.toString()}`;;
  }

  const GoogleLoginComponent = () => (
    <button
      className="btn-home btn-home-normal"
      onClick={handleLogin}
    >
      {options.buttonText ? options.buttonText : 'Sign In with Google'}
    </button>
  )

  this.bindHook('third_login', GoogleLoginComponent);
};

