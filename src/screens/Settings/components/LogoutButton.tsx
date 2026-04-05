import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Theme } from '../../../theme/types';
import { useStyles } from '../../../theme/useStyles';

interface LogoutButtonProps {
  onPress: () => void;
}

export function LogoutButton({ onPress }: LogoutButtonProps) {
  const styles = useStyles(getStyles);

  return (
    <View style={styles.container}>
      <Text style={styles.sectionLabel}>DATA & ACCOUNT</Text>
      <View style={styles.logoutContainer}>
        <Pressable
          style={({ pressed }) => [
            styles.logoutButton,
            pressed && { opacity: 0.7 },
          ]}
          onPress={onPress}
          hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
        >
          <View
            style={[
              styles.settingIcon,
              { backgroundColor: 'rgba(239, 68, 68, 0.1)' },
            ]}
          >
            <Icon name="logout" size={18} color="#EF4444" />
          </View>
          <Text style={styles.logoutText}>Log Out / Reset Data</Text>
          <Icon name="chevron-right" size={18} color="#EF4444" />
        </Pressable>
      </View>
    </View>
  );
}

function getStyles(theme: Theme) {
  return StyleSheet.create({
    container: { marginTop: 10 },
    sectionLabel: {
      fontSize: 12,
      fontWeight: '600',
      color: theme.colors.textMuted,
      letterSpacing: 0.8,
      textTransform: 'uppercase',
      paddingHorizontal: 20,
      marginBottom: 10,
      marginTop: 10,
    },
    logoutContainer: {
      marginHorizontal: 20,
      marginBottom: 20,
    },
    logoutButton: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.colors.surface,
      borderRadius: 16,
      padding: 16,
      gap: 12,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    settingIcon: {
      width: 36,
      height: 36,
      borderRadius: 18,
      alignItems: 'center',
      justifyContent: 'center',
    },
    logoutText: {
      fontSize: 16,
      fontWeight: '600',
      color: '#EF4444',
      flex: 1,
    },
  });
}
