import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FontSizes, FontWeights } from '../../../constants/typography';
import { FilterType } from '../../../features/transactions/transactionsSlice';
import { useTheme } from '../../../theme/useTheme';
import { useStyles } from '../../../theme/useStyles';
import { Theme } from '../../../theme/types';

const FILTER_OPTIONS: { label: string; value: FilterType }[] = [
  { label: 'All', value: 'all' },
  { label: 'Income', value: 'income' },
  { label: 'Expense', value: 'expense' },
];

interface FilterPillBarProps {
  filterType: FilterType;
  setFilterType: (val: FilterType) => void;
}

export function FilterPillBar({
  filterType,
  setFilterType,
}: FilterPillBarProps) {
  const theme = useTheme();
  const styles = useStyles(getStyles);

  return (
    <View style={styles.filterRow}>
      {FILTER_OPTIONS.map(opt => (
        <TouchableOpacity
          key={opt.value}
          style={[
            styles.filterChip,
            filterType === opt.value && styles.filterChipActive,
          ]}
          onPress={() => setFilterType(opt.value)}
        >
          <Text
            style={[
              styles.filterChipText,
              filterType === opt.value && {
                color: theme.colors.primary,
                fontWeight: '600',
              },
            ]}
          >
            {opt.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

function getStyles(theme: Theme) {
  return StyleSheet.create({
    filterRow: {
      flexDirection: 'row',
      paddingHorizontal: 20,
      marginBottom: 12,
      gap: 8,
    },
    filterChip: {
      paddingHorizontal: 20,
      paddingVertical: 8,
      borderRadius: 20,
      backgroundColor: theme.colors.surfaceElevated,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    filterChipActive: {
      backgroundColor: theme.colors.primaryLight,
      borderColor: theme.colors.primary,
    },
    filterChipText: {
      fontSize: FontSizes.sm,
      color: theme.colors.textSecondary,
      fontWeight: FontWeights.medium as '500',
    },
  });
}
