import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { FontSizes, FontWeights } from '../../../constants/typography';
import { useTheme } from '../../../theme/useTheme';
import { useStyles } from '../../../theme/useStyles';
import { Theme } from '../../../theme/types';

interface AddGoalHeaderProps {
  isEditing: boolean;
  onClose: () => void;
}

export function AddGoalHeader({ isEditing, onClose }: AddGoalHeaderProps) {
  const theme = useTheme();
  const styles = useStyles(getStyles);

  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
        <Icon name="close" size={22} color={theme.colors.textSecondary} />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>
        {isEditing ? 'Edit Goal' : 'New Goal'}
      </Text>
      <View style={styles.spacer} />
    </View>
  );
}

function getStyles(theme: Theme) {
  return StyleSheet.create({
    spacer: { width: 40 },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 20,
      paddingVertical: 16,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    },
    closeBtn: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: theme.colors.surfaceElevated,
      alignItems: 'center',
      justifyContent: 'center',
    },
    headerTitle: {
      fontSize: FontSizes.md,
      fontWeight: FontWeights.bold as '700',
      color: theme.colors.textPrimary,
    },
  });
}
