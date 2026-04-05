import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '../../../theme/useTheme';
import { useStyles } from '../../../theme/useStyles';
import { Theme } from '../../../theme/types';

interface HomeFabProps {
  onPress: () => void;
}

export function HomeFab({ onPress }: HomeFabProps) {
  const theme = useTheme();
  const styles = useStyles(getStyles);

  return (
    <TouchableOpacity style={styles.fab} onPress={onPress} activeOpacity={0.85}>
      <LinearGradient
        colors={[theme.colors.gradientStart, theme.colors.gradientEnd]}
        style={styles.fabGradient}
      >
        <Icon name="plus" size={28} color={theme.colors.white} />
      </LinearGradient>
    </TouchableOpacity>
  );
}

function getStyles(theme: Theme) {
  return StyleSheet.create({
    fab: {
      position: 'absolute',
      bottom: 24,
      right: 24,
      borderRadius: 32,
      shadowColor: theme.colors.gradientStart,
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.5,
      shadowRadius: 12,
      elevation: 12,
    },
    fabGradient: {
      width: 63,
      height: 63,
      borderRadius: 31.5,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
}
