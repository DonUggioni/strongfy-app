import React from 'react';
import { StyleSheet, View } from 'react-native';
import { GlobalStyles } from '../constants/styles';
import StyledText from './UI/text/StyledText';

function MessageScreen({ message }) {
  return (
    <View style={styles.rootContainer}>
      <StyledText>{message}</StyledText>
    </View>
  );
}

export default MessageScreen;

const styles = StyleSheet.create({
  rootContainer: {
    backgroundColor: GlobalStyles.colors.background,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
