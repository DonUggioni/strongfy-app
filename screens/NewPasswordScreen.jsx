import React, { useState } from 'react';
import { updatePassword } from 'firebase/auth';
import { StyleSheet, View } from 'react-native';
import LoginInput from '../components/UI/text/LoginInput';
import Button from '../components/UI/buttons/Button';
import LoadingScreen from '../components/LoadingScreen';
import { auth } from '../firebase/firebaseConfig';
import { Alert } from 'react-native';

function NewPasswordScreen({ navigation }) {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  async function confirmHandler() {
    const user = auth.currentUser;

    if (password !== confirmPassword) {
      Alert.alert("Error!', 'Passwords don't match.");
      return;
    }

    if (!password || !confirmPassword) {
      Alert.alert('Error', 'Please enter and confirm new password.');
      return;
    }

    if (password && confirmPassword) {
      setIsLoading(true);
      try {
        const update = updatePassword(user, password);
        if (update) {
          navigation.navigate('Articles');
          Alert.alert('Success!', 'Password has been updated successfully.');
        }
      } catch (error) {
        console.log(error.code);
        Alert.alert('Oops!', 'Something went wrong! Please try again.');
        setIsLoading(false);
      }
      setIsLoading(false);
    }
  }

  if (isLoading) {
    return <LoadingScreen />;
  }
  return (
    <View style={styles.rootContainer}>
      <View style={styles.inputContainer}>
        <LoginInput
          label={'New Password'}
          placeHolder={'Password'}
          autoFocus={true}
          onChangeText={(text) => setPassword(text)}
          iconName={'lock-closed-outline'}
          iconSize={24}
          secureTextEntry={true}
        />
        <LoginInput
          label={'Re-enter Password'}
          placeHolder={'Password'}
          onChangeText={(text) => setConfirmPassword(text)}
          iconName={'lock-closed-outline'}
          iconSize={24}
          secureTextEntry={true}
        />
      </View>
      <View style={styles.buttonsContainer}>
        <Button type={'full'} onPress={confirmHandler}>
          Confirm
        </Button>
        <Button onPress={() => navigation.replace('Articles')}>Cancel</Button>
      </View>
    </View>
  );
}

export default NewPasswordScreen;

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
