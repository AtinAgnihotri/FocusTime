import React from 'react';
import { View, StyleSheet, FlatList, SafeAreaView, Text } from 'react-native';

import { fontSizes, spacing } from '../../utils/sizes';
import { colors } from '../../utils/colors';
import { RoundedButton } from '../../components/RoundedButton';

const HistoryItem = ({ item, index }) => {
  const colorStyle = {
    color: item.status === 1 ? 'mediumseagreen' : 'crimson',
    fontSize: fontSizes.md,
    fontWeight: 'bold',
  };

  return <Text style={colorStyle}>{item.subject}</Text>;
};

export const FocusHistory = ({ focusHistory, onClear }) => {
  const clearHistory = () => {
    onClear();
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        {!!focusHistory.length && (
          <>
            <Text style={styles.focusListTitle}>Things we've focused on:</Text>
            <FlatList
              style={styles.focusList}
              contentContainerStyle={
                (styles.focusList, { alignItems: 'center' })
              }
              data={focusHistory}
              renderItem={HistoryItem}
            />
            <View style={styles.clearContainer}>
              <RoundedButton
                title="Clear"
                size={spacing.xxl}
                onPress={() => clearHistory()}
              />
            </View>
          </>
        )}
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.5,
    textAlign: 'center',
    alignItems: 'center',
  },
  focusList: {
    flex: 1,
  },
  focusListTitle: {
    color: colors.white,
    fontSize: fontSizes.lg,
    marginBottom: spacing.sm,
  },
  clearContainer: {
    alignItems: "center",
    padding: spacing.md,
  },
});
