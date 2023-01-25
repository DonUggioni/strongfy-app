import React from 'react';
import { KeyboardAvoidingView } from 'react-native';
import AuthContent from '../../components/AuthContent';
// import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
// import { auth } from '../../firebase/firebaseConfig';

// const googleProvider = GoogleAuthProvider(auth);

function LoginScreen() {
  function googleLoginHandler() {
    console.log('google login');
    // try {
    //   const result = await signInWithPopup(auth, googleProvider);
    //   console.log(result);
    // } catch (error) {
    //   console.log(error.message);
    // }
  }

  function appleLoginHandler() {
    console.log('apple login');
  }

  return (
    <AuthContent
      googleLogin={googleLoginHandler}
      appleLogin={appleLoginHandler}
      isLogin={true}
    />
  );
}

export default LoginScreen;
