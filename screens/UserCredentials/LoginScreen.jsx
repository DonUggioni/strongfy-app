import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import LoginButton from '../../components/UI/LoginButton';
import Title from '../../components/UI/Title';
import { GlobalStyles } from '../../constants/styles';

function LoginScreen() {
  return (
    <View style={styles.rootContainer}>
      <View style={styles.imageContainer}>
        <Image
          source={require('../../assets/strongfy_logo_copy.png')}
          style={styles.image}
        />
      </View>
      <View style={styles.buttonsContainer}>
        <Title style={styles.title}>Login With</Title>
        <LoginButton icon='logo-google'>Google</LoginButton>
        <LoginButton icon='logo-apple'>Apple</LoginButton>
      </View>
      <Text style={styles.rightsText}>All Rights Reserved</Text>
    </View>
  );
}

export default LoginScreen;

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
