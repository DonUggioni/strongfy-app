import React, { useState } from 'react';
import { Keyboard, StyleSheet, Image, View } from 'react-native';
import { sendPasswordResetEmail } from 'firebase/auth';
import { TouchableNativeFeedback } from 'react-native';
import LoginInput from '../components/UI/text/LoginInput';
import Button from '../components/UI/buttons/Button';
import { auth } from '../firebase/firebaseConfig';
import { Alert } from 'react-native';

function ForgotPasswordScreen({ navigation }) {
  const [email, setEmail] = useState('');

  const emailIsValid = email.includes('@');

  async function sendEmailHandler() {
    if (!emailIsValid) {
      Alert.alert('Error', 'Please enter a valid email address and try again.');
      return;
    }

    if (emailIsValid) {
      try {
        await sendPasswordResetEmail(auth, email);

        Alert.alert(
          'Email sent.',
          'An email was sent to the provided address. Please follow the steps in the email to reset your password.'
        );
        navigation.navigate('Login');
      } catch (error) {
        console.log(error.code);
        Alert.alert('Oops!', 'Something went wrong, please try again.');
      }
    } else {
      Alert.alert('Error', 'Please provide an email address.');
    }
  }

  return (
    <TouchableNativeFeedback onPress={Keyboard.dismiss}>
      <View style={styles.rootContainer}>
        <View style={styles.imageContainer}>
          <Image
            source={require('../assets/nav_logo-min.png')}
            style={styles.image}
          />
        </View>
        <View style={styles.inputContainer}>
          <LoginInput
            label={'Enter your email'}
            placeHolder={'Email'}
            inputMode={'email'}
            iconName={'mail-outline'}
            iconSize={24}
            onChangeText={(text) => setEmail(text)}
            autoFocus={true}
          />
          <View style={styles.buttonsContainer}>
            <Button type={'full'} onPress={sendEmailHandler}>
              Send Email
            </Button>
            <Button onPress={() => navigation.replace('Login')}>Cancel</Button>
          </View>
        </View>
      </View>
    </TouchableNativeFeedback>
  );
}

export default ForgotPasswordScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
  buttonsContainer: {
    gap: 10,
    marginTop: 6,
  },
  imageContainer: {
    // width: '100%',
    marginTop: '12%',
  },
  image: {
    width: '100%',
    resizeMode: 'contain',
  },
  inputContainer: {
    paddingHorizontal: 24,
  },
});
