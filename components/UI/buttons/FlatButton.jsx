import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

function FlatButton({ children, onPress, style, containerStyle }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) =>
        pressed ? [styles.pressed, containerStyle] : containerStyle
      }
    >
      <Text style={[styles.text, style]}>{children}</Text>
    </Pressable>
  );
}

export default FlatButton;

const styles = StyleSheet.create({
  text: {
    fontSize: 14,
    color: 'white',
    fontFamily: 'open-sans-regular',
    textDecorationLine: 'underline',
    letterSpacing: 0.5,
    textAlign: 'center',
  },
  pressed: {
    opacity: 0.8,
  },
});
