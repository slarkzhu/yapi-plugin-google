import React from 'react';
import { GoogleLogin } from "react-google-login";

module.exports = function (options) {
  // Success Handler
  const responseGoogleSuccess = (response) => {
    let userInfo = {
      name: response.profileObj.name,
      email: response.profileObj.email,
      token: response.tokenId
    };

    location.href = '/api/user/login_by_token?token=' + userInfo.token
  };

  // Error Handler
  const responseGoogleError = (response) => {
    console.log(response);
  };        

  const GoogleLoginComponent = () => (
    // <button className="btn-home btn-home-normal" >Sign In with Google</button>
    <GoogleLogin
      clientId={options.clientId}
      render={renderProps => (
        <button className="btn-home btn-home-normal" onClick={renderProps.onClick} disabled={renderProps.disabled}>{options.buttonText}</button>
      )}
      // buttonText={options.buttonText}
      onSuccess={responseGoogleSuccess}
      onFailure={responseGoogleError}
      isSignedIn={false}
      cookiePolicy={"single_host_origin"}
    />
  )

  this.bindHook('third_login', GoogleLoginComponent);
};

