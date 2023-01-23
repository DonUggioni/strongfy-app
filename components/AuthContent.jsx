import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { GlobalStyles } from '../constants/styles';
import LoginButton from './UI/buttons/LoginButton';
import Title from './UI/text/Title';
import FlatButton from './UI/buttons/FlatButton';
import { useNavigation } from '@react-navigation/native';

function AuthContent({ isLogin, googleLogin, appleLogin }) {
  const navigation = useNavigation();

  function switchAuthModeHandler() {
    if (isLogin) {
      navigation.replace('Signup');
    } else {
      navigation.replace('Login');
    }
  }

  return (
    <View style={styles.rootContainer}>
      <View style={styles.imageContainer}>
        <Image
          source={require('../assets/strongfy_logo_copy.png')}
          style={styles.image}
        />
      </View>
      <View style={styles.buttonsContainer}>
        <Title style={styles.title}>
          {isLogin ? 'Login With' : 'Signup With'}
        </Title>
        <LoginButton icon='logo-google' onPress={googleLogin}>
          Google
        </LoginButton>
        <LoginButton icon='logo-apple' onPress={appleLogin}>
          Apple
        </LoginButton>
        <FlatButton onPress={switchAuthModeHandler}>
          {isLogin ? 'No account yet?' : 'Already have an account?'}
        </FlatButton>
      </View>
      <Text style={styles.rightsText}>All Rights Reserved</Text>
    </View>
  );
}

export default AuthContent;

const styles = StyleSheet.create({
  rootContainer: {
    backgroundColor: GlobalStyles.colors.background,
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
  buttonsContainer: {
    paddingHorizontal: 42,
  },
  rightsText: {
    flex: 1,
    alignItems: 'flex-end',
    fontFamily: 'open-sans-regular',
    color: 'white',
    textAlign: 'center',
    marginTop: 200,
  },
  wrapper: {
    justifyContent: 'space-between',
  },
});
