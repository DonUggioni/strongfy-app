import React, { useState } from 'react';
import { reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig';
import { Alert, StyleSheet, View } from 'react-native';
import LoginInput from '../components/UI/text/LoginInput';
import Button from '../components/UI/buttons/Button';
import LoadingScreen from '../components/LoadingScreen';

function ReAuthenticationScreen({ navigation }) {
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  async function confirmHandler() {
    const user = auth.currentUser;
    const credential = EmailAuthProvider.credential(user.email, password);

    if (password) {
      setIsLoading(true);
      try {
        const authenticate = await reauthenticateWithCredential(
          user,
          credential
        );
        if (authenticate) {
          navigation.replace('NewPassword');
        }
      } catch (error) {
        console.log(error.code);
        if (error.code === 'auth/wrong-password') {
          Alert.alert('Oops!', 'Password is incorrect.');
          setIsLoading(false);
        }
      }
      setIsLoading(false);
    } else {
      Alert.alert('Error!', 'Must enter current password.');
    }
  }

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <View style={styles.rootContainer}>
      <LoginInput
        placeHolder={'Password'}
        label={'Current Password'}
        iconName={'lock-closed-outline'}
        iconSize={24}
        secureTextEntry={true}
        onChangeText={(text) => setPassword(text)}
        autoFocus={true}
      />
      <View style={styles.buttonsContainer}>
        <Button type={'full'} onPress={confirmHandler}>
          Confirm
        </Button>
        <Button onPress={() => navigation.replace('Articles')}>Cancel</Button>
      </View>
    </View>
  );
}

export default ReAuthenticationScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  buttonsContainer: {
    gap: 10,
    marginTop: 6,
  },
});
