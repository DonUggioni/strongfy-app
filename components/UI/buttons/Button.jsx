import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { GlobalStyles } from '../../../constants/styles';

function Button({ children, type, onPress }) {
  return (
    <Pressable
      style={({ pressed }) =>
        pressed
          ? [styles.container, type === 'flat' && styles.flatPressed]
          : [styles.container, type === 'full' ? styles.full : styles.flat]
      }
      onPress={onPress}
    >
      <Text style={styles.text}>{children}</Text>
    </Pressable>
  );
}

export default Button;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: GlobalStyles.borderRadius,
    borderWidth: 2,
    borderColor: GlobalStyles.colors.primary500,
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontFamily: 'open-sans-semi-bold',
    fontSize: 14,
  },
  flat: {
    borderColor: GlobalStyles.colors.primary500,
  },
  flatPressed: {
    backgroundColor: GlobalStyles.colors.primary500,
  },
  full: {
    backgroundColor: GlobalStyles.colors.primary500,
  },
});
