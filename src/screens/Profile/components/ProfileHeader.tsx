import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Theme } from '../../../theme/types';
import { useStyles } from '../../../theme/useStyles';
import { useTheme } from '../../../theme/useTheme';

interface ProfileHeaderProps {
  title: string;
  onBack: () => void;
}

export function ProfileHeader({ title, onBack }: ProfileHeaderProps) {
  const theme = useTheme();
  const styles = useStyles(getStyles);

  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={onBack} style={styles.backBtn}>
        <Icon name="arrow-left" size={24} color={theme.colors.textPrimary} />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>{title}</Text>
      <View style={styles.spacer} />
    </View>
  );
}

function getStyles(theme: Theme) {
  return StyleSheet.create({
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 8,
      paddingVertical: 12,
    },
    backBtn: { padding: 12 },
    headerTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: theme.colors.textPrimary,
    },
    spacer: { width: 48 },
  });
}
