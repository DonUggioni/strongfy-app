import React from 'react';
import { StyleSheet, View } from 'react-native';
import StyledText from './text/StyledText';
import { MaterialIcons } from '@expo/vector-icons';

function LegendLine({ children, color }) {
  return (
    <View style={styles.rootContainer}>
      <StyledText style={styles.description}>{children}</StyledText>
      <MaterialIcons name='horizontal-rule' size={38} color={color} />
    </View>
  );
}

export default LegendLine;

const styles = StyleSheet.create({
  rootContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  description: {
    fontSize: 14,
  },
});
