import React from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';

import { FontSizes, FontWeights } from '../../../constants/typography';
import { CurrencySelector } from '../../../components/common/CurrencySelector';
import { PrimaryButton } from '../../../components/common/PrimaryButton';
import { useTheme } from '../../../theme/useTheme';
import { useStyles } from '../../../theme/useStyles';
import { Theme } from '../../../theme/types';

interface LoginFormProps {
  name: string;
  setName: (name: string) => void;
  showCurrencyPicker: boolean;
  setShowCurrencyPicker: (show: boolean) => void;
  currency: string;
  currencySymbol: string;
  onSelectCurrency: (currency: string, symbol: string) => void;
  onContinue: () => void;
}

export function LoginForm({
  name,
  setName,
  showCurrencyPicker,
  setShowCurrencyPicker,
  currency,
  currencySymbol,
  onSelectCurrency,
  onContinue,
}: LoginFormProps) {
  const theme = useTheme();
  const styles = useStyles(getStyles);

  return (
    <View style={styles.form}>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>What should we call you?</Text>
        <TextInput
          style={styles.input}
          placeholder="Your Name"
          placeholderTextColor={theme.colors.textMuted}
          value={name}
          onChangeText={setName}
          autoCorrect={false}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Select your currency</Text>
        <CurrencySelector
          showCurrencyPicker={showCurrencyPicker}
          setShowCurrencyPicker={setShowCurrencyPicker}
          currency={currency}
          currencySymbol={currencySymbol}
          variant="outline"
          onSelectCurrency={onSelectCurrency}
        />
      </View>

      <PrimaryButton
        label="Continue"
        onPress={onContinue}
        disabled={!name.trim()}
        style={styles.button}
      />
    </View>
  );
}

function getStyles(theme: Theme) {
  return StyleSheet.create({
    form: {
      gap: 24,
    },
    inputGroup: {
      gap: 8,
    },
    label: {
      fontSize: FontSizes.sm,
      fontWeight: FontWeights.semibold as '600',
      color: theme.colors.textSecondary,
      marginLeft: 4,
    },
    input: {
      backgroundColor: theme.colors.surface,
      borderWidth: 1,
      borderColor: theme.colors.border,
      borderRadius: 16,
      paddingHorizontal: 20,
      paddingVertical: 16,
      fontSize: FontSizes.base,
      color: theme.colors.textPrimary,
      fontWeight: FontWeights.medium as '500',
    },
    button: {
      marginTop: 16,
    },
  });
}
