import React, { useState } from 'react';
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
import StyledText from './UI/text/StyledText';

function AuthContent({
  isLogin,
  onChangeEmail,
  onChangePassword,
  onChangeConfirmPassword,
  onChangeUsername,
  onSubmit,
}) {
  const [passwordVisible, setPasswordVisible] = useState(false);
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
        secureTextEntry={!passwordVisible}
        viewPasswordButton
        seePasswordIcon={passwordVisible}
        onPasswordVisible={() => setPasswordVisible(!passwordVisible)}
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
        iconName={'lock-closed-outline'}
        iconSize={24}
        secureTextEntry={!passwordVisible}
        viewPasswordButton
        seePasswordIcon={passwordVisible}
        onPasswordVisible={() => setPasswordVisible(!passwordVisible)}
      />
      <LoginInput
        placeHolder={'Confirm Password'}
        label={'Confirm Password'}
        inputMode={'text'}
        onChangeText={onChangeConfirmPassword}
        style={{ marginBottom: 18 }}
        iconName={'lock-closed-outline'}
        iconSize={24}
        secureTextEntry={!passwordVisible}
        viewPasswordButton
        seePasswordIcon={passwordVisible}
        onPasswordVisible={() => setPasswordVisible(!passwordVisible)}
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
              {isLogin && Platform.OS !== 'web' && (
                <FlatButton
                  style={{ marginVertical: 6 }}
                  onPress={() => navigation.navigate('ForgotPassword')}
                >
                  Forgot password
                </FlatButton>
              )}
            </View>
            {/* <Text style={styles.rightsText}>Terms and conditions</Text> */}
            {Platform.OS === 'web' && (
              <View style={styles.demoTextContainer}>
                <StyledText style={styles.demoText}>
                  For demo, use these credentials:
                </StyledText>
                <StyledText style={styles.demoText}>
                  Email: nosignupforme@gmail.com
                </StyledText>
                <StyledText style={styles.demoText}>
                  Password: justlooking
                </StyledText>
                <StyledText style={styles.demoText}>
                  Data for the demo app is deleted weekly. To navigate the
                  inputs, use the TAB key. Some account related features are not
                  available in the demo version. Also, keep in mind that the app
                  has not been fully optimized for larger screens.
                </StyledText>
              </View>
            )}
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
    marginTop: '12%',
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
  demoTextContainer: {
    // alignItems: 'center',
    width: 380,
    marginTop: 24,
    marginLeft: 24,
  },
  demoText: {
    marginVertical: 6,
  },
});
