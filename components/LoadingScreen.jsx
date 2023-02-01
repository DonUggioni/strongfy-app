import React from 'react';
import { Text, View, StyleSheet, ActivityIndicator } from 'react-native';
import { GlobalStyles } from '../constants/styles';
import StyledText from './UI/text/StyledText';

function LoadingScreen() {
  return (
    <View style={styles.rootContainer}>
      <ActivityIndicator
        color={GlobalStyles.colors.primary400}
        size={'large'}
      />
      <StyledText>Loading...</StyledText>
    </View>
  );
}

export default LoadingScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
