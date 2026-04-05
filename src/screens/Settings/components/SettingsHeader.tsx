import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Theme } from '../../../theme/types';
import { useStyles } from '../../../theme/useStyles';

interface SettingsHeaderProps {
  title: string;
}

export function SettingsHeader({ title }: SettingsHeaderProps) {
  const styles = useStyles(getStyles);
  return (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>{title}</Text>
    </View>
  );
}

function getStyles(theme: Theme) {
  return StyleSheet.create({
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 16,
    },
    headerTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      color: theme.colors.textPrimary,
    },
  });
}
