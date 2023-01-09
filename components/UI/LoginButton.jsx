import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { GlobalStyles } from '../../constants/styles';

function LoginButton({ children, icon, onPress }) {
  return (
    <Pressable
      style={({ pressed }) => [
        pressed ? [styles.container, styles.pressed] : styles.container,
      ]}
      onPress={onPress}
    >
      <Ionicons name={icon} size={30} color='white' />
      <Text style={styles.text}>{children}</Text>
    </Pressable>
  );
}

export default LoginButton;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: GlobalStyles.colors.primary500,
    borderRadius: 5,
    marginVertical: 8,
  },
  text: {
    color: 'white',
    fontFamily: 'open-sans-regular',
    fontSize: 30,
    marginLeft: 16,
  },
  pressed: {
    backgroundColor: GlobalStyles.colors.primary400,
  },
});
