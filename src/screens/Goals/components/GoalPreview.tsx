import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { FontSizes, FontWeights } from '../../../constants/typography';
import { useTheme } from '../../../theme/useTheme';
import { useStyles } from '../../../theme/useStyles';
import { Theme } from '../../../theme/types';

interface GoalPreviewProps {
  emoji: string;
  title: string;
  targetAmount: number;
  currencySymbol: string;
  endDate: Date;
}

export function GoalPreview({ emoji, title }: GoalPreviewProps) {
  const theme = useTheme();
  const styles = useStyles(getStyles);

  return (
    <View style={styles.preview}>
      <View style={styles.emojiContainer}>
        <Text style={styles.previewEmoji}>{emoji}</Text>
      </View>
      <Text style={styles.previewTitle} numberOfLines={2}>
        {title || 'Your Goal Name'}
      </Text>
    </View>
  );
}

function getStyles(theme: Theme) {
  return StyleSheet.create({
    preview: {
      alignItems: 'center',
      paddingVertical: 32,
      marginBottom: 8,
    },
    emojiContainer: {
      width: 100,
      height: 100,
      borderRadius: 50,
      backgroundColor: theme.colors.surfaceElevated,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 16,
      borderWidth: 1,
      borderColor: theme.colors.border,
      shadowColor: theme.colors.primary,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 10,
      elevation: 2,
    },
    previewEmoji: { fontSize: 56 },
    previewTitle: {
      fontSize: FontSizes['2xl'],
      fontWeight: FontWeights.bold as '700',
      color: theme.colors.textPrimary,
      textAlign: 'center',
      paddingHorizontal: 20,
    },
  });
}
