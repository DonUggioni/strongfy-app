import React, { useState } from 'react';
import { Alert } from 'react-native';
import { auth } from '../../firebase/firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import AuthContent from '../../components/AuthContent';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoadingScreen from '../../components/LoadingScreen';
import useAppContext from '../../store/AppContext';

function LoginScreen() {
  const {
    setUserIsAuthenticated,
    setIsLoading,
    isLoading,
    getUserCurrentWorkout,
  } = useAppContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const emailIsValid = email.includes('@') || email.length > 0;
  const passwordIsValid = password.length > 5;

  async function loginHandler() {
    if (emailIsValid && passwordIsValid) {
      setIsLoading(true);
      try {
        const user = await signInWithEmailAndPassword(auth, email, password);
        const userData = user.user;
        await AsyncStorage.setItem('@user_uid', userData.uid);
        if (userData) {
          setUserIsAuthenticated(userData);
          getUserCurrentWorkout(userData.uid);
        }
      } catch (error) {
        console.log(error.message);
        Alert.alert('Oops!', `Something went wrong. ${error.message}`);
        setIsLoading(false);
      }

      setTimeout(() => {
        setIsLoading(false);
      }, 4000);
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
