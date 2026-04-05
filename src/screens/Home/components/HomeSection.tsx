import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FontSizes, FontWeights } from '../../../constants/typography';
import { useTheme } from '../../../theme/useTheme';
import { useStyles } from '../../../theme/useStyles';
import { Theme } from '../../../theme/types';

interface HomeSectionProps {
  title: string;
  subtitle?: string;
  onAction?: () => void;
  children: React.ReactNode;
}

export function HomeSection({
  title,
  subtitle,
  onAction,
  children,
}: HomeSectionProps) {
  const theme = useTheme();
  const styles = useStyles(getStyles);

  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <View>
          <Text style={styles.sectionTitle}>{title}</Text>
          {subtitle && <Text style={styles.sectionSubtitle}>{subtitle}</Text>}
        </View>
        {onAction && (
          <TouchableOpacity onPress={onAction}>
            <Text style={styles.seeAll}>See all</Text>
          </TouchableOpacity>
        )}
      </View>
      {children}
    </View>
  );
}

function getStyles(theme: Theme) {
  return StyleSheet.create({
    section: { marginBottom: 24, paddingHorizontal: 20 },
    sectionHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 14,
    },
    sectionTitle: {
      fontSize: FontSizes.md,
      fontWeight: FontWeights.bold as '700',
      color: theme.colors.textPrimary,
    },
    sectionSubtitle: {
      fontSize: FontSizes.sm,
      color: theme.colors.textMuted,
    },
    seeAll: {
      fontSize: FontSizes.sm,
      color: theme.colors.primary,
      fontWeight: FontWeights.semibold as '600',
    },
  });
}
