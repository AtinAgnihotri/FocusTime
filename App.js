import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Focus } from './src/features/focus/Focus';
import { FocusHistory } from './src/features/focus/FocusHistory';
import { Timer } from './src/features/timer/Timer';
import { colors } from './src/utils/colors';

const STATUSES = {
  COMPLETED: 1,
  CANCELLED: 2,
};

const STORAGE_KEY = 'FOCUS_HISTORY_ASK';

export default function App() {
  const [focusSubject, setFocusSubject] = useState(null);
  const [focusHistory, setFocusHistory] = useState([]);
  const [wasMounted, setWasMounted] = useState(false);

  const clearHistory = () => {
    setFocusHistory([]);
  };

  const saveFocusHistory = async () => {
    try {
      if (wasMounted)
        await AsyncStorage.setItem(
          'focusHistory',
          JSON.stringify(focusHistory)
        );
      console.log('Saved history to local storage');
    } catch (e) {
      console.log(e);
    }
  };

  const loadFocusHistory = async () => {
    try {
      const history = await AsyncStorage.getItem('focusHistory');

      if (history && JSON.parse(history).length) {
        setFocusHistory(JSON.parse(history));
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    saveFocusHistory();
  }, [focusHistory]);

  useEffect(() => {
    loadFocusHistory();
    setWasMounted(true);
  }, []);

  const clearSubject = (state) => {
    addSubjectHistoryWithState(focusSubject, state);
    setFocusSubject(null);
  };

  const cancelSubject = () => {
    clearSubject(STATUSES.CANCELLED);
  };

  const addSubjectHistoryWithState = (subject, status) => {
    if (focusSubject)
      setFocusHistory([
        ...focusHistory,
        {
          key: String(focusHistory.length + 1),
          subject,
          status,
        },
      ]);
  };

  const timerDidEnd = () => {
    setTimeout(() => clearSubject(STATUSES.COMPLETED), 4000);
  };

  console.log(focusHistory);

  return (
    <View style={styles.container}>
      {focusSubject ? ( // This will help us mock navigation
        <Timer
          focusSubject={focusSubject}
          onTimerEnd={timerDidEnd}
          onCancel={cancelSubject}
        />
      ) : (
        <View style={{flex: 1}}>
          <Focus addSubject={setFocusSubject} />
          <FocusHistory focusHistory={focusHistory} onClear={clearHistory} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgApp,
  },
});
