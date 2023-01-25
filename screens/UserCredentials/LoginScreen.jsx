import React, { useEffect, useState } from 'react';
import AuthContent from '../../components/AuthContent';
import { auth } from '../../firebase/firebaseConfig';
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import useAppContext from '../../store/AppContext';

function LoginScreen() {
  const { setUserIsAuthenticated } = useAppContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    async function getCurrentUser() {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setUserIsAuthenticated(user);
        }
      });
    }
    getCurrentUser();
  }, []);

  async function loginHandler() {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      if (user) {
        setUserIsAuthenticated(user);
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <AuthContent
      isLogin={true}
      onChangeEmail={(text) => setEmail(text)}
      onChangePassword={(text) => setPassword(text)}
      onSubmit={loginHandler}
    />
  );
}

export default LoginScreen;
