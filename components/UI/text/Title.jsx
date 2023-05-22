import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

function Title({ children, style }) {
  return <Text style={[styles.title, style]}>{children}</Text>;
}

export default Title;

const styles = StyleSheet.create({
  title: {
    fontSize: 17,
    textAlign: 'center',
    color: 'white',
    fontFamily: 'open-sans-regular',
    letterSpacing: 0.5,
  },
});
