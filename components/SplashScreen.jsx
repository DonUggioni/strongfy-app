import { StyleSheet, View, Image } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GlobalStyles } from '../constants/styles';
import { useSpring, animated } from '@react-spring/native';

function SplashScreen() {
  const [props, api] = useSpring(
    () => ({
      from: { opacity: 0 },
      to: { opacity: 1 },
      config: { duration: 1900 },
    }),
    []
  );

  return (
    <SafeAreaView style={styles.rootContainer}>
      <animated.View style={[props, styles.imageContainer]}>
        <animated.Image
          source={require('../assets/hero_img-min.png')}
          style={[styles.image]}
        />
      </animated.View>
    </SafeAreaView>
  );
}

export default SplashScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: GlobalStyles.colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    width: '100%',
  },
  image: {
    resizeMode: 'contain',
    width: '100%',
  },
});
