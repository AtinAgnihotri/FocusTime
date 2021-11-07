import React, { useState } from 'react';
import { View, Text, StyleSheet, Vibration, Platform } from 'react-native';
import { ProgressBar } from 'react-native-paper';
import { useKeepAwake } from 'expo-keep-awake';

import { fontSizes, spacing } from '../../utils/sizes';
import { colors } from '../../utils/colors';
import { Countdown } from '../../components/Countdown';
import { RoundedButton } from '../../components/RoundedButton';
import { Timing } from './Timing';

const isProd = false;

export const Timer = ({ focusSubject, onTimerEnd, onCancel }) => {
  useKeepAwake();

  const [isStarted, setIsStarted] = useState(false);
  const [progress, setProgress] = useState(1);
  const [minutes, setMinutes] = useState(0.1);

  const onProgress = (progress) => {
    console.log('Progress at ' + String(progress));
    setProgress(progress);
  };

  const changeTime = (mins) => {
    console.log('Setting mins to ' + String(mins));
    setMinutes(mins);
    resetTimer();
  };

  const completion = () => {
    console.log('Completed ' + String(minutes) + ' mins focus session.');
    vibrate();
    setMinutes(0);
    changeTime(minutes);
    onTimerEnd();
  };

  const resetTimer = () => {
    console.log('Resetting timer.');
    setIsStarted(false);
    setProgress(1);
  };

  const vibrate = () => {
    if (Platform.OS === 'ios') {
      // iOS specific stuff
      const interval = setInterval(() => { Vibration.vibrate() }, 1000);
      setTimeout(() => { clearInterval(interval) }, 5000);
    } else {
      // Android specific stuff
      Vibration.vibrate(5000);
    }
  };


  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Focusing on:</Text>
        <Text style={styles.task}>{focusSubject}</Text>
      </View>
      <ProgressBar
        color={colors.bgProgressBar}
        style={styles.progressBar}
        progress={progress}
      />
      <Countdown
        minutes={minutes}
        isPaused={!isStarted}
        onProgress={onProgress}
        onCompletion={completion}
      />
      <View style={styles.buttonWrapper}>
        <Timing onChangeTime={changeTime} />
      </View>
      <View style={styles.buttonWrapper}>
        <RoundedButton
          title={isStarted ? 'Pause' : 'Start'}
          onPress={() => setIsStarted(!isStarted)}
        />
      </View>
      <View style={styles.clearSubject}>
          <RoundedButton title="-" onPress={onCancel} size={spacing.xxl}/>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.lg,
  },
  titleContainer: {
    paddingTop: spacing.xl,
  },
  title: {
    color: colors.white,
    fontSize: fontSizes.lg,
    textAlign: 'center',
  },
  task: {
    color: colors.white,
    textAlign: 'center',
    fontSize: fontSizes.xl,
    fontWeight: 'bold',
  },
  buttonWrapper: {
    flex: 0.3,
    marginVertical: spacing.sm,
    padding: spacing.md,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  progressBar: {
    margin: spacing.sm,
    height: spacing.sm,
  },
  clearSubject: {
    paddingBottom: spacing.lg,
    paddingLeft: spacing.lg
  }
});
