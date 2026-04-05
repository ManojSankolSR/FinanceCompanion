import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Theme } from '../../../theme/types';
import { useStyles } from '../../../theme/useStyles';
import { useTheme } from '../../../theme/useTheme';

interface AvatarIdentityProps {
  userName: string;
  nameInput: string;
  isEditing: boolean;
  onEditPress: () => void;
  onSaveName: () => void;
  onNameChange: (text: string) => void;
}

export function AvatarIdentity({
  userName,
  nameInput,
  isEditing,
  onEditPress,
  onSaveName,
  onNameChange,
}: AvatarIdentityProps) {
  const theme = useTheme();
  const styles = useStyles(getStyles);

  return (
    <View style={styles.avatarSection}>
      <View
        style={[
          styles.avatarPlaceholder,
          { backgroundColor: theme.colors.primaryLight },
        ]}
      >
        <Icon name="account" size={60} color={theme.colors.primary} />
        <TouchableOpacity style={styles.editAvatarBtn}>
          <Icon name="camera" size={20} color="#FFF" />
        </TouchableOpacity>
      </View>
      <View style={styles.nameHeaderContainer}>
        {isEditing ? (
          <View style={styles.nameEditRow}>
            <TextInput
              style={styles.nameInput}
              value={nameInput}
              onChangeText={onNameChange}
              autoFocus
              onSubmitEditing={onSaveName}
              returnKeyType="done"
            />
            <TouchableOpacity onPress={onSaveName}>
              <Icon name="check-circle" size={24} color={theme.colors.income} />
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity onPress={onEditPress} style={styles.nameRow}>
            <Text style={styles.userName}>{userName}</Text>
            <Icon
              name="pencil-outline"
              size={18}
              color={theme.colors.textMuted}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

function getStyles(theme: Theme) {
  return StyleSheet.create({
    avatarSection: {
      alignItems: 'center',
      marginVertical: 30,
    },
    avatarPlaceholder: {
      width: 120,
      height: 120,
      borderRadius: 60,
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
    },
    editAvatarBtn: {
      position: 'absolute',
      bottom: 0,
      right: 0,
      backgroundColor: theme.colors.primary,
      width: 36,
      height: 36,
      borderRadius: 18,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 3,
      borderColor: theme.colors.background,
    },
    nameHeaderContainer: {
      marginTop: 16,
      alignItems: 'center',
    },
    nameRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    userName: {
      fontSize: 24,
      fontWeight: 'bold',
      color: theme.colors.textPrimary,
    },
    nameEditRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
      borderBottomWidth: 2,
      borderBottomColor: theme.colors.primary,
      paddingBottom: 4,
    },
    nameInput: {
      fontSize: 24,
      fontWeight: 'bold',
      color: theme.colors.textPrimary,
      padding: 0,
      minWidth: 150,
      textAlign: 'center',
    },
  });
}
