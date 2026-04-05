import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useTheme } from '../../theme/useTheme';
import { useStyles } from '../../theme/useStyles';
import { Theme } from '../../theme/types';

interface GradientCardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  gradientColors?: string[];
  gradientStart?: { x: number; y: number };
  gradientEnd?: { x: number; y: number };
  variant?: 'surface' | 'gradient' | 'elevated';
}

export const GradientCard: React.FC<GradientCardProps> = ({
  children,
  style,
  gradientColors,
  gradientStart = { x: 0, y: 0 },
  gradientEnd = { x: 1, y: 1 },
  variant = 'surface',
}) => {
  const theme = useTheme();
  const styles = useStyles(getStyles);

  if (variant === 'gradient' || gradientColors) {
    const colors = gradientColors ?? [
      theme.colors.gradientStart,
      theme.colors.gradientEnd,
    ];
    return (
      <LinearGradient
        colors={colors}
        start={gradientStart}
        end={gradientEnd}
        style={[styles.card, style]}
      >
        {children}
      </LinearGradient>
    );
  }

  const containerStyle =
    variant === 'elevated' ? styles.cardElevated : styles.card;

  return <View style={[containerStyle, style]}>{children}</View>;
};

function getStyles(theme: Theme) {
  return StyleSheet.create({
    card: {
      backgroundColor: theme.colors.surface,
      borderRadius: 20,
      padding: 16,
      borderWidth: 1,
      borderColor: theme.colors.border,
      overflow: 'hidden',
    },
    cardElevated: {
      backgroundColor: theme.colors.surfaceElevated,
      borderRadius: 20,
      padding: 16,
      borderWidth: 1,
      borderColor: theme.colors.border,
      shadowColor: theme.colors.black,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 12,
      elevation: 8,
    },
  });
}
