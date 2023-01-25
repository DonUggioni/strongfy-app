import React from 'react';
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { GlobalStyles } from '../constants/styles';
import Title from './UI/text/Title';
import FlatButton from './UI/buttons/FlatButton';
import { useNavigation } from '@react-navigation/native';
import LoginInput from './UI/text/LoginInput';
import Button from './UI/buttons/Button';

function AuthContent({ isLogin, onChangeText, onSubmit }) {
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
        onChangeText={onChangeText}
      />
      <LoginInput
        placeHolder={'Password'}
        label={'Password'}
        inputMode={'text'}
        onChangeText={onChangeText}
        style={{ marginBottom: 18 }}
      />
    </>
  );

  const signUp = (
    <>
      <LoginInput
        placeHolder={'Choose a Username'}
        label={'Username'}
        inputMode={'text'}
        onChangeText={onChangeText}
      />
      <LoginInput
        placeHolder={'email@mail.com'}
        label={'Email'}
        inputMode={'email'}
        onChangeText={onChangeText}
      />
      <LoginInput
        placeHolder={'Password'}
        label={'Password'}
        inputMode={'text'}
        onChangeText={onChangeText}
      />
      <LoginInput
        placeHolder={'Confirm Password'}
        label={'Confirm Password'}
        inputMode={'text'}
        onChangeText={onChangeText}
        style={{ marginBottom: 18 }}
      />
    </>
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.rootContainer}
    >
      <ScrollView>
        <View style={styles.imageContainer}>
          <Image
            source={require('../assets/strongfy_logo_copy.png')}
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
          <FlatButton onPress={switchAuthModeHandler}>
            {isLogin ? 'No account yet?' : 'Already have an account?'}
          </FlatButton>
        </View>
        {/* <Text style={styles.rightsText}>Terms and conditions</Text> */}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

export default AuthContent;

const styles = StyleSheet.create({
  rootContainer: {
    backgroundColor: GlobalStyles.colors.background,
    flex: 1,
    paddingTop: 20,
  },
  innerContainer: {
    flex: 1,
  },
  imageContainer: {
    width: '100%',
    alignItems: 'center',
  },
  image: {
    width: '100%',
  },
  title: {
    marginBottom: 16,
  },
  inputsContainer: {
    paddingHorizontal: 42,
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
});
