import React from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';

import { FontSizes, FontWeights } from '../../../constants/typography';
import { GoalDateSelector } from './GoalDateSelector';
import { useTheme } from '../../../theme/useTheme';
import { useStyles } from '../../../theme/useStyles';
import { Theme } from '../../../theme/types';

interface AddGoalFormProps {
  title: string;
  setTitle: (val: string) => void;
  titleError: string;
  targetAmount: string;
  setTargetAmount: (val: string) => void;
  amountError: string;
  currencySymbol: string;
  endDate: Date;
  setEndDate: (date: Date) => void;
  isEditing: boolean;
}

export function AddGoalForm({
  title,
  setTitle,
  titleError,
  targetAmount,
  setTargetAmount,
  amountError,
  currencySymbol,
  endDate,
  setEndDate,
  isEditing,
}: AddGoalFormProps) {
  const theme = useTheme();
  const styles = useStyles(getStyles);

  return (
    <View style={styles.fieldsGroup}>
      {}
      <View style={styles.fieldBlock}>
        <Text style={styles.fieldLabel}>Goal Name</Text>
        <TextInput
          style={[styles.fieldInput, titleError ? styles.fieldInputError : {}]}
          placeholder="e.g. Emergency fund"
          placeholderTextColor={theme.colors.textMuted}
          value={title}
          onChangeText={t => {
            setTitle(t);
          }}
          maxLength={40}
          autoFocus={!isEditing}
        />
        {titleError ? <Text style={styles.errorText}>{titleError}</Text> : null}
      </View>

      {}
      <View style={styles.fieldBlock}>
        <Text style={styles.fieldLabel}>Target Amount</Text>
        <View style={styles.amountRow}>
          <Text style={styles.currencySign}>{currencySymbol}</Text>
          <TextInput
            style={[
              styles.amountInput,
              amountError ? styles.fieldInputError : {},
            ]}
            placeholder="0"
            placeholderTextColor={theme.colors.textMuted}
            value={targetAmount}
            onChangeText={t => {
              setTargetAmount(t.replace(/[^0-9.]/g, ''));
            }}
            keyboardType="decimal-pad"
          />
        </View>
        {amountError ? (
          <Text style={styles.errorText}>{amountError}</Text>
        ) : null}
      </View>

      <GoalDateSelector endDate={endDate} setEndDate={setEndDate} />
    </View>
  );
}

function getStyles(theme: Theme) {
  return StyleSheet.create({
    fieldsGroup: { gap: 16, marginBottom: 16 },
    fieldBlock: {},
    fieldLabel: {
      fontSize: FontSizes.sm,
      color: theme.colors.textSecondary,
      fontWeight: FontWeights.semibold as '600',
      marginBottom: 8,
    },
    fieldInput: {
      backgroundColor: theme.colors.surface,
      borderRadius: 14,
      paddingHorizontal: 16,
      paddingVertical: 14,
      color: theme.colors.textPrimary,
      fontSize: FontSizes.base,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    fieldInputError: { borderColor: theme.colors.expense },
    amountRow: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.colors.surface,
      borderRadius: 14,
      paddingHorizontal: 16,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    currencySign: {
      fontSize: FontSizes.lg,
      color: theme.colors.textSecondary,
      fontWeight: FontWeights.bold as '700',
      marginRight: 8,
    },
    amountInput: {
      flex: 1,
      color: theme.colors.textPrimary,
      fontSize: FontSizes.xl,
      fontWeight: FontWeights.bold as '700',
      paddingVertical: 14,
    },
    errorText: {
      fontSize: FontSizes.xs,
      color: theme.colors.expense,
      marginTop: 4,
    },
  });
}
