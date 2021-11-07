import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { RoundedButton } from '../../components/RoundedButton';
import { fontSizes, spacing } from '../../utils/sizes';

export const Timing = ({ onChangeTime }) => {
  return (
    <View style={styles.container}>
      <RoundedButton
        style={styles.timerButtons}
        title="10"
        size={spacing.hg}
        onPress={() => onChangeTime(10)}
      />
      <RoundedButton
        style={styles.timerButtons}
        title="15"
        size={spacing.hg}
        onPress={() => onChangeTime(15)}
      />
      <RoundedButton
        style={styles.timerButtons}
        title="20"
        size={spacing.hg}
        onPress={() => onChangeTime(20)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  timerButtons: {
    margin: spacing.sm,
  },
});
