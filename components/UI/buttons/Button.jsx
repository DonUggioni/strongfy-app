import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

function Button({ children }) {
  return (
    <Pressable style={styles.container}>
      <Text>{children}</Text>
    </Pressable>
  );
}

export default Button;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 4,
    backgroundColor: 'red',
    borderWidth: 1,
    borderColor: 'red',
  },
  text: {
    color: 'white',
    fontFamily: 'open-sans-regular',
  },
});
