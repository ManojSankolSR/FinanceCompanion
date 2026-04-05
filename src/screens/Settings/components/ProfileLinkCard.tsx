import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Theme } from '../../../theme/types';
import { useStyles } from '../../../theme/useStyles';
import { useTheme } from '../../../theme/useTheme';

interface ProfileLinkCardProps {
  userName: string;
  onPress: () => void;
}

export function ProfileLinkCard({ userName, onPress }: ProfileLinkCardProps) {
  const theme = useTheme();
  const styles = useStyles(getStyles);

  return (
    <View style={styles.profileRow}>
      <TouchableOpacity style={styles.profileCard} onPress={onPress}>
        <View
          style={[
            styles.avatarSmall,
            { backgroundColor: theme.colors.primaryLight },
          ]}
        >
          <Icon name="account" size={30} color={theme.colors.primary} />
        </View>
        <View style={styles.profileInfo}>
          <Text style={styles.profileName}>{userName}</Text>
          <Text style={styles.profileSub}>Profile, Currency, Budget</Text>
        </View>
        <Icon name="chevron-right" size={24} color={theme.colors.textMuted} />
      </TouchableOpacity>
    </View>
  );
}

function getStyles(theme: Theme) {
  return StyleSheet.create({
    profileRow: {
      paddingHorizontal: 20,
      marginBottom: 24,
      marginTop: 10,
    },
    profileCard: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.colors.surface,
      borderRadius: 20,
      padding: 16,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 10,
      elevation: 4,
    },
    avatarSmall: {
      width: 50,
      height: 50,
      borderRadius: 25,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 16,
    },
    profileInfo: {
      flex: 1,
    },
    profileName: {
      fontSize: 18,
      fontWeight: 'bold',
      color: theme.colors.textPrimary,
    },
    profileSub: {
      fontSize: 12,
      color: theme.colors.textMuted,
      marginTop: 2,
    },
  });
}
