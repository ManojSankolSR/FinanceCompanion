import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { FontSizes, FontWeights } from '../../../constants/typography';
import { useTheme } from '../../../theme/useTheme';
import { useStyles } from '../../../theme/useStyles';
import { Theme } from '../../../theme/types';

interface TransactionTypeTabsProps {
  type: 'income' | 'expense';
  setType: (type: 'income' | 'expense') => void;
  onTypeChange: (type: 'income' | 'expense') => void;
}

export function TransactionTypeTabs({
  type,
  onTypeChange,
}: TransactionTypeTabsProps) {
  const theme = useTheme();
  const styles = useStyles(getStyles);

  return (
    <View style={styles.typeToggle}>
      <TouchableOpacity
        style={[
          styles.typeBtn,
          type === 'expense' && {
            backgroundColor: theme.colors.expenseLight,
            borderColor: theme.colors.expense,
          },
        ]}
        onPress={() => onTypeChange('expense')}
      >
        <Icon
          name="arrow-up-circle"
          size={16}
          color={
            type === 'expense' ? theme.colors.expense : theme.colors.textMuted
          }
        />
        <Text
          style={[
            styles.typeBtnText,
            type === 'expense' && { color: theme.colors.expense },
          ]}
        >
          Expense
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.typeBtn,
          type === 'income' && {
            backgroundColor: theme.colors.incomeLight,
            borderColor: theme.colors.income,
          },
        ]}
        onPress={() => onTypeChange('income')}
      >
        <Icon
          name="arrow-down-circle"
          size={16}
          color={
            type === 'income' ? theme.colors.income : theme.colors.textMuted
          }
        />
        <Text
          style={[
            styles.typeBtnText,
            type === 'income' && { color: theme.colors.income },
          ]}
        >
          Income
        </Text>
      </TouchableOpacity>
    </View>
  );
}

function getStyles(theme: Theme) {
  return StyleSheet.create({
    typeToggle: {
      flexDirection: 'row',
      gap: 12,
      marginBottom: 28,
    },
    typeBtn: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      paddingVertical: 14,
      borderRadius: 16,
      backgroundColor: theme.colors.surfaceElevated,
      borderWidth: 1.5,
      borderColor: theme.colors.border,
    },
    typeBtnText: {
      fontSize: FontSizes.base,
      fontWeight: FontWeights.semibold as '600',
      color: theme.colors.textMuted,
    },
  });
}
