import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  ActivityIndicator,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { FontSizes, FontWeights } from '../../constants/typography';
import { useTheme } from '../../theme/useTheme';
import { useStyles } from '../../theme/useStyles';
import { Theme } from '../../theme/types';

interface PrimaryButtonProps {
  label: string;
  onPress: () => void;
  style?: ViewStyle;
  disabled?: boolean;
  loading?: boolean;
  variant?: 'gradient' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
}

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  label,
  onPress,
  style,
  disabled = false,
  loading = false,
  variant = 'gradient',
  size = 'md',
  icon,
}) => {
  const theme = useTheme();
  const styles = useStyles(getStyles);

  const sizeStyles = {
    sm: {
      height: 40,
      paddingHorizontal: 16,
      fontSize: FontSizes.sm,
      borderRadius: 12,
    },
    md: {
      height: 52,
      paddingHorizontal: 24,
      fontSize: FontSizes.base,
      borderRadius: 16,
    },
    lg: {
      height: 60,
      paddingHorizontal: 32,
      fontSize: FontSizes.md,
      borderRadius: 18,
    },
  };

  const s = sizeStyles[size];
  const isDisabled = disabled || loading;

  const buttonStyle: ViewStyle = {
    height: s.height,
    paddingHorizontal: s.paddingHorizontal,
    borderRadius: s.borderRadius,
    opacity: isDisabled ? 0.5 : 1,
  };

  const textStyle = {
    fontSize: s.fontSize,
    color:
      variant === 'outline' || variant === 'ghost'
        ? theme.colors.primary
        : theme.colors.white,
    fontWeight: FontWeights.semibold as '600',
  };

  const content = loading ? (
    <ActivityIndicator
      size="small"
      color={variant === 'gradient' ? theme.colors.white : theme.colors.primary}
    />
  ) : (
    <View style={styles.row}>
      {icon}
      <Text style={[textStyle, icon ? { marginLeft: 8 } : {}]}>{label}</Text>
    </View>
  );

  if (variant === 'gradient') {
    return (
      <TouchableOpacity
        onPress={onPress}
        disabled={isDisabled}
        activeOpacity={0.8}
        style={style}
      >
        <LinearGradient
          colors={[theme.colors.gradientStart, theme.colors.gradientEnd]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[styles.base, buttonStyle]}
        >
          {content}
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  const outlineStyles: ViewStyle =
    variant === 'outline'
      ? {
          borderWidth: 1.5,
          borderColor: theme.colors.primary,
          backgroundColor: 'transparent',
        }
      : variant === 'danger'
      ? {
          backgroundColor: theme.colors.expenseLight,
          borderWidth: 1,
          borderColor: theme.colors.expense,
        }
      : { backgroundColor: 'transparent' };

  const dangerTextColor =
    variant === 'danger' ? theme.colors.expense : undefined;

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isDisabled}
      activeOpacity={0.7}
      style={[styles.base, buttonStyle, outlineStyles, style]}
    >
      <View style={styles.row}>
        {icon}
        <Text
          style={[
            textStyle,
            dangerTextColor ? { color: dangerTextColor } : {},
            icon ? { marginLeft: 8 } : {},
          ]}
        >
          {label}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

function getStyles(theme: Theme) {
  return StyleSheet.create({
    base: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
    },
  });
}
