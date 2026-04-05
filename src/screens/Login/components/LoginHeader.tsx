import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { FontSizes, FontWeights } from '../../../constants/typography';
import { useTheme } from '../../../theme/useTheme';
import { useStyles } from '../../../theme/useStyles';
import { Theme } from '../../../theme/types';

export function LoginHeader() {
  const theme = useTheme();
  const styles = useStyles(getStyles);

  return (
    <View style={styles.header}>
      <View style={styles.iconContainer}>
        <Icon name="wallet" size={48} color={theme.colors.white} />
      </View>
      <Text style={styles.title}>Welcome to</Text>
      <Text style={styles.appName}>Finance Companion</Text>
      <Text style={styles.subtitle}>
        Let's set up your profile to get started.
      </Text>
    </View>
  );
}

function getStyles(theme: Theme) {
  return StyleSheet.create({
    header: {
      alignItems: 'center',
      marginBottom: 48,
    },
    iconContainer: {
      width: 80,
      height: 80,
      borderRadius: 40,
      backgroundColor: theme.colors.primary,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 24,
      shadowColor: theme.colors.primary,
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.5,
      shadowRadius: 16,
      elevation: 10,
    },
    title: {
      fontSize: FontSizes.xl,
      color: theme.colors.textSecondary,
      fontWeight: FontWeights.medium as '500',
    },
    appName: {
      fontSize: FontSizes['3xl'],
      fontWeight: FontWeights.extrabold as '800',
      color: theme.colors.textPrimary,
      marginTop: 4,
      marginBottom: 12,
    },
    subtitle: {
      fontSize: FontSizes.base,
      color: theme.colors.textMuted,
      textAlign: 'center',
    },
  });
}
