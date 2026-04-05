import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { FontSizes, FontWeights } from '../../../constants/typography';
import { useTheme } from '../../../theme/useTheme';
import { useStyles } from '../../../theme/useStyles';
import { Theme } from '../../../theme/types';

export function InsightsHeader() {
  const theme = useTheme();
  const styles = useStyles(getStyles);

  return (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>Insights</Text>
      <Text style={styles.headerSubtitle}>Understand your spending</Text>
    </View>
  );
}

function getStyles(theme: Theme) {
  return StyleSheet.create({
    header: {
      paddingHorizontal: 20,
      paddingVertical: 16,
    },
    headerTitle: {
      fontSize: FontSizes.xl,
      fontWeight: FontWeights.bold as '700',
      color: theme.colors.textPrimary,
    },
    headerSubtitle: {
      fontSize: FontSizes.sm,
      color: theme.colors.textMuted,
      marginTop: 2,
    },
  });
}
