import React from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import Title from './UI/text/Title';
import FlatButton from './UI/buttons/FlatButton';
import { useNavigation } from '@react-navigation/native';
import LoginInput from './UI/text/LoginInput';
import Button from './UI/buttons/Button';
import { TouchableWithoutFeedback } from 'react-native';
import { Keyboard } from 'react-native';

function AuthContent({
  isLogin,
  onChangeEmail,
  onChangePassword,
  onChangeConfirmPassword,
  onChangeUsername,
  onSubmit,
}) {
  const navigation = useNavigation();

  function switchAuthModeHandler() {
    if (isLogin) {
      navigation.replace('Signup');
    } else {
      navigation.replace('Login');
    }
  }

  const login = (
    <>
      <LoginInput
        placeHolder={'email@mail.com'}
        label={'Email'}
        inputMode={'email'}
        onChangeText={onChangeEmail}
        iconName={'mail-outline'}
        iconSize={24}
        keyboardType={'email-address'}
      />
      <LoginInput
        placeHolder={'Password'}
        label={'Password'}
        inputMode={'text'}
        onChangeText={onChangePassword}
        style={{ marginBottom: 18 }}
        iconName={'lock-closed-outline'}
        iconSize={24}
        secureTextEntry={true}
      />
    </>
  );

  const signUp = (
    <>
      <LoginInput
        placeHolder={'Choose a Username'}
        label={'Username'}
        inputMode={'text'}
        onChangeText={onChangeUsername}
        iconName={'person-outline'}
        iconSize={24}
      />
      <LoginInput
        placeHolder={'email@mail.com'}
        label={'Email'}
        inputMode={'email'}
        onChangeText={onChangeEmail}
        keyboardType={'email-address'}
        iconName={'mail-outline'}
        iconSize={24}
      />
      <LoginInput
        placeHolder={'Password'}
        label={'Password'}
        inputMode={'text'}
        onChangeText={onChangePassword}
        secureTextEntry={true}
        iconName={'lock-closed-outline'}
        iconSize={24}
      />
      <LoginInput
        placeHolder={'Confirm Password'}
        label={'Confirm Password'}
        inputMode={'text'}
        onChangeText={onChangeConfirmPassword}
        style={{ marginBottom: 18 }}
        secureTextEntry={true}
        iconName={'lock-closed-outline'}
        iconSize={24}
      />
    </>
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.rootContainer}
    >
      <ScrollView>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.innerContainer}>
            <View style={styles.imageContainer}>
              <Image
                source={require('../assets/nav_logo-min.png')}
                style={styles.image}
              />
            </View>
            <View style={styles.inputsContainer}>
              <Title style={styles.title}>{isLogin ? 'Login' : 'Signup'}</Title>
              {isLogin && login}
              {!isLogin && signUp}
              <Button type={'full'} onPress={onSubmit}>
                Submit
              </Button>
              <FlatButton
                style={styles.flatButton}
                onPress={switchAuthModeHandler}
              >
                {isLogin ? 'No account yet?' : 'Already have an account?'}
              </FlatButton>
            </View>
            {/* <Text style={styles.rightsText}>Terms and conditions</Text> */}
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

export default AuthContent;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  imageContainer: {
    // width: '100%',
    marginTop: '20%',
  },
  image: {
    width: '100%',
    resizeMode: 'contain',
  },
  title: {
    marginBottom: 10,
  },
  inputsContainer: {
    paddingHorizontal: 24,
  },
  rightsText: {
    flex: 1,
    alignItems: 'flex-end',
    fontFamily: 'open-sans-regular',
    color: 'white',
    textAlign: 'center',
  },
  wrapper: {
    justifyContent: 'space-between',
  },
  flatButton: {
    marginTop: 16,
  },
});
