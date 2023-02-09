import React from 'react';
import { Platform, Pressable, StyleSheet, Text } from 'react-native';
import { GlobalStyles } from '../../../constants/styles';

function SelectButton({ children, selected, onPress, style, selectStyle }) {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.container,
        selectStyle,
        selected === 'selected' && styles.selected,
      ]}
    >
      <Text style={[styles.text, style]}>{children}</Text>
    </Pressable>
  );
}

export default SelectButton;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: GlobalStyles.borderRadius,
    borderWidth: 2,
    borderColor: GlobalStyles.colors.primary500,
  },
  text: {
    color: 'white',
    fontFamily: 'open-sans-semi-bold',
    fontSize: Platform.OS === 'android' ? 14 : 16,
  },
  selected: {
    backgroundColor: GlobalStyles.colors.primary500,
  },
});
