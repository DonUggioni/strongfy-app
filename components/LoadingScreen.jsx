import { StyleSheet, Animated, View, Easing } from 'react-native';
import Lottie from 'lottie-react-native';
import React, { useEffect, useRef } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GlobalStyles } from '../constants/styles';

function LoadingScreen() {
  const progress = useRef(new Animated.Value(0)).current;

  // const handleLikeAnimation = () => {
  //   Animated.timing(progress, {
  //     toValue: 1,
  //     duration: 1000,
  //     useNativeDriver: true,
  //     easing: Easing.linear,
  //   }).start();
  // };
  // useEffect(() => {
  //   handleLikeAnimation();
  // }, []);

  return (
    <SafeAreaView style={styles.rootContainer}>
      <View style={styles.animationContainer}>
        {/* <Lottie
          progress={progress}
          source={require('../assets/dumbell_animation.json')}
        /> */}
      </View>
    </SafeAreaView>
  );
}

export default LoadingScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: GlobalStyles.colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  animationContainer: {
    width: 400,
    height: 400,
  },
});
