import React, { useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { GlobalStyles } from '../../../constants/styles';
import StyledText from './StyledText';
import { Ionicons } from '@expo/vector-icons';

function LoginInput({
  onChangeText,
  placeHolder,
  inputMode,
  label,
  style,
  iconSize,
  iconName,
  secureTextEntry,
  keyboardType,
}) {
  const [isFocus, setIsFocus] = useState(false);
  return (
    <>
      <StyledText style={styles.label}>{label}</StyledText>
      <View
        style={
          isFocus
            ? [styles.inputContainer, styles.inputFocus, style]
            : [styles.inputContainer, style]
        }
      >
        <Ionicons
          name={iconName}
          size={iconSize}
          color={GlobalStyles.colors.gray300}
        />
        <TextInput
          style={styles.input}
          placeholder={placeHolder}
          placeholderTextColor={GlobalStyles.colors.gray300}
          autoComplete='off'
          inputMode={inputMode}
          autoCapitalize='none'
          autoCorrect={false}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          textContentType='oneTimeCode'
        />
      </View>
    </>
  );
}

export default LoginInput;

const styles = StyleSheet.create({
  inputContainer: {
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: GlobalStyles.borderRadius,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
  },
  inputFocus: {
    borderColor: GlobalStyles.colors.primary400,
  },
  input: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'open-sans-regular',
    paddingVertical: 10,
    paddingHorizontal: 12,
    width: '80%',
  },
  label: {
    marginVertical: 6,
    fontSize: 16,
  },
});
