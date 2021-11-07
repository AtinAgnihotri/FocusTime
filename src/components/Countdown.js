import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { colors } from '../utils/colors';
import { spacing, fontSizes } from '../utils/sizes';

const minutesToMilliseconds = (mins) => mins * 60 * 1000;
const millisecondsToSeconds = (ms) => ms / 1000;
const zeroPad = (num, places) => String(num).padStart(places, '0')

const formatTime = (timeInMS) => {
  const totalTimeInSecs = millisecondsToSeconds(timeInMS);
  const pendingMins = zeroPad(Math.floor(totalTimeInSecs / 60), 2);
  const pendingSecs = zeroPad(totalTimeInSecs % 60, 2);
  return pendingMins + ":" + pendingSecs;
}

export const Countdown = ({
  minutes = 20,
  isPaused = true,
  onProgress,
  onCompletion,
}) => {
  const interval = React.useRef(null);

  const [time, setTime] = useState(minutesToMilliseconds(minutes));
  // const [running, setRunning] = useState(!isPaused);

  const countdown = () => {
    setTime(
      (time) => {
        if (time === 0) {
          // setTime(minutesToMilliseconds(minutes));
          clearInterval(interval.current);
          onCompletion();
          return time;
        }
        const timeLeft = time - 1000;
        // onProgress(timeLeft / minutesToMilliseconds(minutes));
        // console.log(timeLeft / minutesToMilliseconds(minutes));
        return timeLeft;
      }
    )
  }

  useEffect(() => {
    console.log("Countdown time being changed to " + String(minutes) + " mins");
    setTime(minutesToMilliseconds(minutes));
  }, [minutes]);

  useEffect(() => {
    if (isPaused) {
      if (interval.current) clearInterval(interval.current);
      return;
    }

    interval.current = setInterval(countdown, 1000);

    return () => clearInterval(interval.current);
  }, [isPaused]);

  useEffect(() => {
    onProgress(time / minutesToMilliseconds(minutes));
    if (time === 0) onCompletion();
  }, [time]);
  

  return (
    <View style={styles.container}>
      <Text style={styles.countdownText}>{formatTime(time)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // margin: spacing.md,
    padding: spacing.md,
    backgroundColor: colors.bgCountdown,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    overflowY: "scroll"
  },
  countdownText: {
    fontSize: fontSizes.hg,
    fontWeight: "bold",
    color: colors.white
  }
});