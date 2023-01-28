import React, { useEffect, useState } from 'react';
import AuthContent from '../../components/AuthContent';
import { auth } from '../../firebase/firebaseConfig';
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import useAppContext from '../../store/AppContext';
import { Alert } from 'react-native';
import LoadingScreen from '../../components/LoadingScreen';

function LoginScreen() {
  const { setUserIsAuthenticated, setIsLoading, isLoading } = useAppContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const emailIsValid = email.includes('@') || email.length > 0;
  const passwordIsValid = password.length > 5;

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
    if (emailIsValid && passwordIsValid) {
      setIsLoading(true);
      try {
        const user = await signInWithEmailAndPassword(auth, email, password);
        const userData = user.user;
        if (userData) {
          setUserIsAuthenticated(userData);
          setIsLoading(false);
        }
      } catch (error) {
        console.log(error.message);
        Alert.alert('Oops!', `Something went wrong. ${error.message}`);
      }
    }
    if (!emailIsValid || !passwordIsValid) {
      Alert.alert(
        'Login info is incorrect',
        'Please check login info and try again.'
      );
    }
  }

  if (isLoading) {
    return <LoadingScreen />;
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
