import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Theme } from '../../../theme/types';
import { useStyles } from '../../../theme/useStyles';
import { useTheme } from '../../../theme/useTheme';

const CURRENCIES = [
  { currency: 'INR', symbol: '₹', label: 'Indian Rupee' },
  { currency: 'USD', symbol: '$', label: 'US Dollar' },
  { currency: 'EUR', symbol: '€', label: 'Euro' },
  { currency: 'GBP', symbol: '£', label: 'British Pound' },
  { currency: 'JPY', symbol: '¥', label: 'Japanese Yen' },
];

interface CurrencyPickerProps {
  currentCurrency: string;
  onSelect: (currency: string, symbol: string) => void;
  isConverting: boolean;
}

export function CurrencyPicker({
  currentCurrency,
  onSelect,
  isConverting,
}: CurrencyPickerProps) {
  const theme = useTheme();
  const styles = useStyles(getStyles);

  return (
    <View style={styles.currencyList}>
      {CURRENCIES.map(c => (
        <TouchableOpacity
          key={c.currency}
          style={[
            styles.currencyItem,
            c.currency === currentCurrency && styles.currencyItemActive,
          ]}
          onPress={() => onSelect(c.currency, c.symbol)}
          disabled={isConverting}
        >
          <Text style={styles.currencySymbol}>{c.symbol}</Text>
          <View>
            <Text style={styles.currencyCode}>{c.currency}</Text>
            <Text style={styles.currencyName}>{c.label}</Text>
          </View>
          {c.currency === currentCurrency && (
            <Icon name="check-circle" size={18} color={theme.colors.income} />
          )}
        </TouchableOpacity>
      ))}
    </View>
  );
}

function getStyles(theme: Theme) {
  return StyleSheet.create({
    currencyList: { paddingHorizontal: 16, paddingBottom: 8 },
    currencyItem: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
      paddingVertical: 10,
      paddingHorizontal: 8,
      borderRadius: 12,
    },
    currencyItemActive: { backgroundColor: theme.colors.primaryLight },
    currencySymbol: {
      fontSize: 18,
      fontWeight: '700',
      color: theme.colors.textPrimary,
      width: 24,
      textAlign: 'center',
    },
    currencyCode: {
      fontSize: 14,
      fontWeight: '600',
      color: theme.colors.textPrimary,
    },
    currencyName: { fontSize: 12, color: theme.colors.textMuted },
  });
}
