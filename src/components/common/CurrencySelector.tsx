import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { FontSizes, FontWeights } from '../../constants/typography';
import { useTheme } from '../../theme/useTheme';
import { useStyles } from '../../theme/useStyles';
import { Theme } from '../../theme/types';

const CURRENCIES = [
  { currency: 'INR', symbol: '₹', label: 'Indian Rupee' },
  { currency: 'USD', symbol: '$', label: 'US Dollar' },
  { currency: 'EUR', symbol: '€', label: 'Euro' },
  { currency: 'GBP', symbol: '£', label: 'British Pound' },
  { currency: 'JPY', symbol: '¥', label: 'Japanese Yen' },
];

interface CurrencySelectorProps {
  showCurrencyPicker: boolean;
  setShowCurrencyPicker: (val: boolean) => void;
  currency: string;
  currencySymbol: string;
  disabled?: boolean;
  onSelectCurrency: (currency: string, symbol: string) => void;
  variant?: 'outline' | 'ghost';
}

export function CurrencySelector({
  showCurrencyPicker,
  setShowCurrencyPicker,
  currency,
  currencySymbol,
  disabled = false,
  onSelectCurrency,
  variant = 'outline',
}: CurrencySelectorProps) {
  const theme = useTheme();
  const styles = useStyles(getStyles);

  const isOutline = variant === 'outline';

  return (
    <>
      <TouchableOpacity
        style={
          isOutline ? styles.currencySelectOutline : styles.currencySelectGhost
        }
        onPress={() => setShowCurrencyPicker(!showCurrencyPicker)}
        disabled={disabled}
      >
        <View style={styles.currencyInfo}>
          <Text style={styles.currencySymbolText}>{currencySymbol}</Text>
          <Text style={styles.currencyValText}>{currency}</Text>
        </View>
        <Icon
          name={showCurrencyPicker ? 'chevron-up' : 'chevron-down'}
          size={isOutline ? 24 : 18}
          color={theme.colors.textMuted}
        />
      </TouchableOpacity>

      {showCurrencyPicker && (
        <View
          style={
            isOutline ? styles.currencyListOutline : styles.currencyListGhost
          }
        >
          {CURRENCIES.map(c => (
            <TouchableOpacity
              key={c.currency}
              style={[
                styles.currencyItem,
                c.currency === currency && styles.currencyItemActive,
              ]}
              onPress={() => {
                onSelectCurrency(c.currency, c.symbol);
              }}
              disabled={disabled}
            >
              <Text style={styles.currencySymbolList}>{c.symbol}</Text>
              <View style={{ flex: 1 }}>
                <Text style={styles.currencyCode}>{c.currency}</Text>
                <Text style={styles.currencyName}>{c.label}</Text>
              </View>
              {c.currency === currency && (
                <Icon
                  name="check-circle"
                  size={isOutline ? 20 : 18}
                  color={theme.colors.income}
                />
              )}
            </TouchableOpacity>
          ))}
        </View>
      )}
    </>
  );
}

function getStyles(theme: Theme) {
  return StyleSheet.create({
    currencySelectOutline: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: theme.colors.surface,
      borderWidth: 1,
      borderColor: theme.colors.border,
      borderRadius: 16,
      paddingHorizontal: 20,
      paddingVertical: 16,
    },
    currencySelectGhost: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 0,
      paddingVertical: 0,
    },
    currencyInfo: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
    },
    currencySymbolText: {
      fontSize: FontSizes.lg,
      fontWeight: FontWeights.bold as '700',
      color: theme.colors.textPrimary,
    },
    currencyValText: {
      fontSize: FontSizes.base,
      color: theme.colors.textSecondary,
    },
    currencyListOutline: {
      backgroundColor: theme.colors.surface,
      borderWidth: 1,
      borderColor: theme.colors.border,
      borderRadius: 16,
      marginTop: 8,
      padding: 8,
    },
    currencyListGhost: {
      paddingHorizontal: 16,
      paddingBottom: 8,
      marginTop: 8,
    },
    currencyItem: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 16,
      paddingVertical: 12,
      paddingHorizontal: 12,
      borderRadius: 12,
    },
    currencyItemActive: {
      backgroundColor: theme.colors.surfaceHighlight,
    },
    currencySymbolList: {
      width: 24,
      textAlign: 'center',
      fontSize: FontSizes.lg,
      fontWeight: FontWeights.bold as '700',
      color: theme.colors.textPrimary,
    },
    currencyCode: {
      fontSize: FontSizes.base,
      fontWeight: FontWeights.semibold as '600',
      color: theme.colors.textPrimary,
    },
    currencyName: {
      fontSize: FontSizes.xs,
      color: theme.colors.textMuted,
      marginTop: 2,
    },
  });
}
