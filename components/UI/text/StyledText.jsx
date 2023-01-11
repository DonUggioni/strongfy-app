import React from 'react';
import { StyleSheet, Text } from 'react-native';

function StyledText({ children }) {
  return <Text style={styles.text}>{children}</Text>;
}

export default StyledText;

const styles = StyleSheet.create({
  text: {
    color: 'white',
    marginVertical: 18,
    fontSize: 18,
    fontFamily: 'open-sans-regular',
  },
});
