import React, { useState } from 'react';
import AuthContent from '../../components/AuthContent';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase/firebaseConfig';

function SignUpScreen() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  function signupHandler() {
    console.log(username, email, password, confirmPassword);
  }

  return (
    <AuthContent
      onSubmit={signupHandler}
      onChangeUsername={(text) => setUsername(text)}
      onChangeEmail={(text) => setEmail(text)}
      onChangePassword={(text) => setPassword(text)}
      onChangeConfirmPassword={(text) => setConfirmPassword(text)}
    />
  );
}

export default SignUpScreen;
