import { StyleSheet, View } from 'react-native';
import React from 'react';
import StyledText from './text/StyledText';
import Svg, { Rect } from 'react-native-svg';

function SvgLine({ text, lineColor }) {
  return (
    <View style={styles.rootContainer}>
      <StyledText style={styles.text}>{text} </StyledText>
      <Svg height='11' width='40'>
        <Rect x='8' y='7' width='40' height='2' fill={lineColor} />
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 14,
  },
});

export default SvgLine;
