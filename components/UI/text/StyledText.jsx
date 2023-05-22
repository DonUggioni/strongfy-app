import React from 'react';
import { StyleSheet, Text } from 'react-native';

function StyledText({ children, style }) {
  return <Text style={[styles.text, style]}>{children}</Text>;
}

export default StyledText;

const styles = StyleSheet.create({
  text: {
    color: 'white',
    marginVertical: 16,
    fontSize: 16,
    fontFamily: 'open-sans-regular',
  },
});
