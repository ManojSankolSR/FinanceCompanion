import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { FontSizes, FontWeights } from '../../constants/typography';
import { useTheme } from '../../theme/useTheme';
import { useStyles } from '../../theme/useStyles';
import { Theme } from '../../theme/types';

interface EmptyStateProps {
  icon?: string;
  title: string;
  subtitle?: string;
  style?: ViewStyle;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon = 'inbox-outline',
  title,
  subtitle,
  style,
}) => {
  const theme = useTheme();
  const styles = useStyles(getStyles);

  return (
    <View style={[styles.container, style]}>
      <View style={styles.iconContainer}>
        <Icon name={icon} size={56} color={theme.colors.textMuted} />
      </View>
      <Text style={styles.title}>{title}</Text>
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
    </View>
  );
};

function getStyles(theme: Theme) {
  return StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 48,
      paddingHorizontal: 32,
    },
    iconContainer: {
      width: 96,
      height: 96,
      borderRadius: 48,
      backgroundColor: theme.colors.surfaceElevated,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 20,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    title: {
      fontSize: FontSizes.md,
      fontWeight: FontWeights.semibold as '600',
      color: theme.colors.textSecondary,
      textAlign: 'center',
      marginBottom: 8,
    },
    subtitle: {
      fontSize: FontSizes.sm,
      color: theme.colors.textMuted,
      textAlign: 'center',
      lineHeight: FontSizes.sm * 1.5,
    },
  });
}
