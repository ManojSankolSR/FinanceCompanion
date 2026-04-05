import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Theme } from '../../../theme/types';
import { useStyles } from '../../../theme/useStyles';
import { useTheme } from '../../../theme/useTheme';

interface DetailItemProps {
  icon: string;
  iconColor: string;
  iconBg: string;
  label: string;
  value?: string;
  onPress?: () => void;
  rightIcon?: string;
  isLoading?: boolean;
  children?: React.ReactNode;
}

export function DetailItem({
  icon,
  iconColor,
  iconBg,
  label,
  value,
  onPress,
  rightIcon = 'pencil',
  isLoading = false,
  children,
}: DetailItemProps) {
  const theme = useTheme();
  const styles = useStyles(getStyles);

  const Content = (
    <View style={styles.settingRow}>
      <View style={[styles.settingIcon, { backgroundColor: iconBg }]}>
        <Icon name={icon} size={18} color={iconColor} />
      </View>
      <View style={styles.settingInfo}>
        <Text style={styles.settingLabel}>{label}</Text>
        {children ? children : <Text style={styles.settingValue}>{value}</Text>}
      </View>
      {onPress &&
        (isLoading ? (
          <ActivityIndicator size="small" color={theme.colors.primary} />
        ) : (
          <TouchableOpacity onPress={onPress}>
            <Icon name={rightIcon} size={18} color={theme.colors.primary} />
          </TouchableOpacity>
        ))}
    </View>
  );

  return Content;
}

function getStyles(theme: Theme) {
  return StyleSheet.create({
    settingRow: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingVertical: 16,
      gap: 12,
    },
    settingIcon: {
      width: 36,
      height: 36,
      borderRadius: 18,
      alignItems: 'center',
      justifyContent: 'center',
    },
    settingInfo: { flex: 1 },
    settingLabel: {
      fontSize: 16,
      fontWeight: '500',
      color: theme.colors.textPrimary,
    },
    settingValue: {
      fontSize: 14,
      color: theme.colors.textMuted,
      marginTop: 2,
    },
  });
}
