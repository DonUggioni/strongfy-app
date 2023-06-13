import { StyleSheet, View } from 'react-native';
import React from 'react';
import { GlobalStyles } from '../constants/styles';

function RootAppContainer({ children }) {
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>{children}</View>
    </View>
  );
}

export default RootAppContainer;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: GlobalStyles.colors.gray500,
  },
  innerContainer: {
    width: '50%',
    flex: 1,
  },
});
