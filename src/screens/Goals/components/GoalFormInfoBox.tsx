import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { FontSizes } from '../../../constants/typography';
import { useTheme } from '../../../theme/useTheme';
import { useStyles } from '../../../theme/useStyles';
import { Theme } from '../../../theme/types';

export function GoalFormInfoBox() {
  const theme = useTheme();
  const styles = useStyles(getStyles);

  return (
    <View style={styles.infoBox}>
      <Icon name="information-outline" size={16} color={theme.colors.primary} />
      <Text style={styles.infoText}>
        Your progress is automatically calculated from your income and expenses
        between the goal dates.
      </Text>
    </View>
  );
}

function getStyles(theme: Theme) {
  return StyleSheet.create({
    infoBox: {
      flexDirection: 'row',
      gap: 10,
      backgroundColor: theme.colors.primaryLight,
      borderRadius: 14,
      padding: 14,
      alignItems: 'flex-start',
      borderWidth: 1,
      borderColor: theme.colors.primary,
    },
    infoText: {
      flex: 1,
      fontSize: FontSizes.sm,
      color: theme.colors.primary,
      lineHeight: FontSizes.sm * 1.5,
    },
  });
}
