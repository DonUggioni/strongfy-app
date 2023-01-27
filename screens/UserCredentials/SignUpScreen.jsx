import React, { useState } from 'react';
import AuthContent from '../../components/AuthContent';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../firebase/firebaseConfig';
import useAppContext from '../../store/AppContext';
import LoadingScreen from '../../components/LoadingScreen';
import { Alert } from 'react-native';

function SignUpScreen() {
  const { setUserIsAuthenticated, setIsLoading, isLoading } = useAppContext();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const emailIsValid = email.includes('@');
  const emptyValues =
    username === '' ||
    email === '' ||
    password === '' ||
    confirmPassword === '';
  const passwordsMatch = password === confirmPassword;

  async function signupHandler() {
    if (emailIsValid && !emptyValues && passwordsMatch) {
      setIsLoading(true);
      try {
        const user = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        if (user) {
          const userData = user.user;
          setUserIsAuthenticated(userData);
          await setDoc(doc(db, 'users', userData.uid), {
            username: username,
            email: email,
            completedWorkouts: 0,
          });
          setIsLoading(false);
        }
      } catch (error) {
        console.log(error.message);
        setIsLoading(false);
        Alert.alert(
          'Oops!',
          `Something went wrong, please try again. ${error.message}`
        );
      }
    }

    if (!emailIsValid) {
      Alert.alert('Invalid email', 'Please enter a valid email address.');
    }

    if (emptyValues) {
      Alert.alert(
        'No empty fields allowed',
        'Please check your information and try again.'
      );
    }

    if (!passwordsMatch) {
      Alert.alert(
        "Passwords don't match",
        'Please check if passwords match and try again.'
      );
    }
  }

  if (isLoading) {
    return <LoadingScreen />;
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
