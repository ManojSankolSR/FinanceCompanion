import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

import { FontSizes, FontWeights } from '../../../constants/typography';
import { BottomTabParamList } from '../../../navigation/types';
import { useTheme } from '../../../theme/useTheme';
import { useStyles } from '../../../theme/useStyles';
import { Theme } from '../../../theme/types';

interface HomeHeaderProps {
  userName: string;
}

export function HomeHeader({ userName }: HomeHeaderProps) {
  const theme = useTheme();
  const styles = useStyles(getStyles);
  const navigation =
    useNavigation<BottomTabNavigationProp<BottomTabParamList>>();

  return (
    <LinearGradient
      colors={[theme.dark ? '#0D1424' : '#E5E7EB', theme.colors.background]}
      style={styles.headerGradient}
    >
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Good morning,</Text>
          <Text style={styles.userName}>{userName} 👋</Text>
        </View>
        <View style={styles.rightActions}>
          <TouchableOpacity style={styles.actionBtn} onPress={() => {}}>
            <Icon
              name="bell-outline"
              size={20}
              color={theme.colors.textSecondary}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionBtn}
            onPress={() =>
              navigation.navigate('SettingsTab', { screen: 'Profile' })
            }
          >
            <Icon
              name="account-circle-outline"
              size={22}
              color={theme.colors.textSecondary}
            />
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
}

function getStyles(theme: Theme) {
  return StyleSheet.create({
    headerGradient: { paddingHorizontal: 20, paddingBottom: 12 },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingTop: 8,
    },
    greeting: {
      fontSize: FontSizes.sm,
      color: theme.colors.textMuted,
      fontWeight: FontWeights.medium as '500',
    },
    userName: {
      fontSize: FontSizes.xl,
      color: theme.colors.textPrimary,
      fontWeight: FontWeights.bold as '700',
    },
    rightActions: {
      flexDirection: 'row',
      gap: 8,
    },
    actionBtn: {
      width: 38,
      height: 38,
      borderRadius: 19,
      backgroundColor: theme.colors.surfaceElevated,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
  });
}
