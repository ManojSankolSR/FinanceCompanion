import React from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRealm } from '@realm/react';
import { useNavigation } from '@react-navigation/native';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  setThemeMode,
  setColorPalette,
  setHasOnboarded,
  setUserName,
  setCurrency,
  setMonthlyBudget,
} from '../../features/ui/uiSlice';
import { setTransactions } from '../../features/transactions/transactionsSlice';
import { setGoals } from '../../features/goals/goalsSlice';
import { useStyles } from '../../theme/useStyles';
import { Theme, ColorPalette, ThemeMode } from '../../theme/types';
import { SettingsScreenNavigationProp } from '../../navigation/types';

import { SettingsHeader } from './components/SettingsHeader';
import { ProfileLinkCard } from './components/ProfileLinkCard';
import { AppearanceSection } from './components/AppearanceSection';
import { LogoutButton } from './components/LogoutButton';

export default function SettingsScreen() {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<SettingsScreenNavigationProp>();
  const realm = useRealm();
  const styles = useStyles(getStyles);

  const userProfiles = realm.objects('UserProfile');

  const userName = useAppSelector(s => s.ui.userName);
  const currentThemeMode = useAppSelector(s => s.ui.themeMode);
  const currentColorPalette = useAppSelector(s => s.ui.colorPalette);

  const updateThemeMode = (mode: ThemeMode) => {
    dispatch(setThemeMode(mode));
    let profile = userProfiles[0] as any;
    if (profile) {
      realm.write(() => {
        profile.themeMode = mode;
      });
    }
  };

  const updateColorPalette = (id: ColorPalette) => {
    dispatch(setColorPalette(id));
    let profile = userProfiles[0] as any;
    if (profile) {
      realm.write(() => {
        profile.colorPalette = id;
      });
    }
  };

  const handleLogOut = () => {
    console.log('Logout button tapped');
    Alert.alert(
      'Log Out',
      'This will permanently delete all your data and log you out. This action cannot be undone.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
          onPress: () => console.log('Logout cancelled'),
        },
        {
          text: 'Log Out',
          style: 'destructive',
          onPress: () => {
            console.log('Starting logout process...');
            try {
              realm.write(() => {
                realm.deleteAll();
              });
              dispatch(setTransactions([]));
              dispatch(setGoals([]));
              dispatch(setUserName('Friend'));
              dispatch(setCurrency({ currency: 'INR', symbol: '₹' }));
              dispatch(setMonthlyBudget(50000));
              dispatch(setThemeMode('system'));
              dispatch(setColorPalette('default'));

              setTimeout(() => {
                dispatch(setHasOnboarded(false));
              }, 100);
            } catch (error) {
              console.error('Logout error:', error);
              Alert.alert('Error', 'Failed to clear data cleanly.');
            }
          },
        },
      ],
      { cancelable: true },
    );
  };

  return (
    <View style={styles.container}>
      <SafeAreaView edges={['top']} style={styles.safeArea}>
        <SettingsHeader title="Settings" />

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <ProfileLinkCard
            userName={userName}
            onPress={() => navigation.navigate('Profile')}
          />

          <AppearanceSection
            currentThemeMode={currentThemeMode}
            currentColorPalette={currentColorPalette}
            onThemeChange={updateThemeMode}
            onPaletteChange={updateColorPalette}
          />

          <LogoutButton onPress={handleLogOut} />

          <View style={styles.versionContainer}>
            <View style={styles.versionLine} />
            <Text style={styles.versionText}>
              Finance Companion v1.2.0 (Themed)
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

function getStyles(theme: Theme) {
  return StyleSheet.create({
    container: { flex: 1, backgroundColor: theme.colors.background },
    safeArea: { flex: 1 },
    scrollContent: { paddingBottom: 40 },
    versionContainer: {
      marginTop: 40,
      paddingBottom: 20,
      alignItems: 'center',
    },
    versionLine: {
      height: 1,
      backgroundColor: theme.colors.border,
      width: '40%',
      marginBottom: 16,
    },
    versionText: { fontSize: 12, color: theme.colors.textMuted },
  });
}
