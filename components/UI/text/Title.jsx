import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

function Title({ children, style }) {
  return (
    <View>
      <Text style={[styles.title, style]}>{children}</Text>
    </View>
  );
}

export default Title;

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    textAlign: 'center',
    color: 'white',
    fontFamily: 'open-sans-regular',
  },
});
