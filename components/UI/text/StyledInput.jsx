import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { GlobalStyles } from '../../../constants/styles';

function StyledInput({
  onChangeText,
  value,
  placeHolder,
  keyboardType,
  onEndEditing,
}) {
  return (
    <TextInput
      style={styles.input}
      onChangeText={onChangeText}
      value={value}
      placeHolder={placeHolder}
      placeholderTextColor={GlobalStyles.colors.gray500}
      keyboardType={keyboardType}
      autoComplete='off'
      onEndEditing={onEndEditing}
    />
  );
}

export default StyledInput;

const styles = StyleSheet.create({
  input: {
    borderBottomWidth: 0.6,
    borderBottomColor: GlobalStyles.colors.accent500,
    width: 60,
    height: 30,
    marginLeft: 16,
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
  },
});
