import React, { useState } from 'react';
import AuthContent from '../../components/AuthContent';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase/firebaseConfig';
import useAppContext from '../../store/AppContext';

function SignUpScreen() {
  const { setUserIsAuthenticated } = useAppContext();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  async function signupHandler() {
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);
      if (user) {
        setUserIsAuthenticated(user);
      }
    } catch (error) {
      console.log(error.message);
    }
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
