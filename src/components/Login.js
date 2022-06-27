import React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

/* ライブラリ */
import { auth, uiConfig } from "../lib/firebase";

function Login() {
  return (
    <div className="column panel-block">
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />
    </div>
  );
};

export default Login;