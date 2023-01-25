import React from 'react';
import AuthContent from '../../components/AuthContent';
// import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
// import { auth } from '../../firebase/firebaseConfig';

// const googleProvider = new GoogleAuthProvider();

function SignUpScreen() {
  function googleSignupHandler() {
    console.log('google signup');
    // try {
    //   const result = await signInWithPopup(auth, googleProvider);
    //   console.log(result);
    // } catch (error) {
    //   console.log(error.message);
    // }
  }

  function appleSignupHandler() {
    console.log('apple signup');
  }

  return (
    <AuthContent
      googleLogin={googleSignupHandler}
      appleLogin={appleSignupHandler}
    />
  );
}

export default SignUpScreen;
