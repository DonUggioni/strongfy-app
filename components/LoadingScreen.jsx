import { StyleSheet, ActivityIndicator, Platform } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GlobalStyles } from '../constants/styles';

function LoadingScreen() {
  return (
    <SafeAreaView style={styles.rootContainer}>
      <ActivityIndicator
        size={Platform.OS === 'ios' ? 'large' : 54}
        color={GlobalStyles.colors.primary400}
      />
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
