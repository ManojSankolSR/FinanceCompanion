import React, { useEffect, useRef } from 'react';
import { View, Animated, Text, StyleSheet } from 'react-native';
import { useQuery, useRealm } from '@realm/react';
import { Transaction } from '../../db/schemas/TransactionSchema';
import { Goal } from '../../db/schemas/GoalSchema';
import { useAppDispatch } from '../../app/hooks';
import { setTransactions } from '../../features/transactions/transactionsSlice';
import { setGoals } from '../../features/goals/goalsSlice';
import {
  setUserName,
  setCurrency,
  setMonthlyBudget,
  setHasOnboarded,
  setThemeMode,
  setColorPalette,
} from '../../features/ui/uiSlice';
import { useTransactions } from '../../hooks/useTransactions';
import { useGoals } from '../../hooks/useGoals';
import { FontSizes, FontWeights } from '../../constants/typography';
import { useTheme } from '../../theme/useTheme';
import { useStyles } from '../../theme/useStyles';
import { Theme } from '../../theme/types';
import { useAppSelector } from '../../app/hooks';

interface AppInitializerProps {
  children: React.ReactNode;
}

export const AppInitializer: React.FC<AppInitializerProps> = ({ children }) => {
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const styles = useStyles(getStyles);
  const realm = useRealm();
  const realmTransactions = useQuery(Transaction);
  const realmGoals = useQuery(Goal);
  const userProfiles = useQuery('UserProfile');
  const { serializeTransaction } = useTransactions();
  const { serializeGoal } = useGoals();
  const initialized = useRef(false);
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const [ready, setReady] = React.useState(false);
  const hasOnboarded = useAppSelector(state => state.ui.hasOnboarded);

  useEffect(() => {
    if (initialized.current) {
      return;
    }
    initialized.current = true;

    const initApp = async () => {
      let profile = userProfiles[0] as any;
      if (!profile) {
        realm.write(() => {
          profile = realm.create('UserProfile', {
            _id: new Realm.BSON.ObjectId(),
            name: 'Friend',
            currency: 'INR',
            currencySymbol: '₹',
            hasSeenOnboarding: false,
            monthlyBudget: 50000,
            themeMode: 'system',
            colorPalette: 'default',
          });
        });
      }

      const serializedTransactions =
        Array.from(realmTransactions).map(serializeTransaction);
      const serializedGoals = Array.from(realmGoals).map(serializeGoal);

      dispatch(setTransactions(serializedTransactions));
      dispatch(setGoals(serializedGoals));

      dispatch(setUserName(profile.name));
      dispatch(
        setCurrency({
          currency: profile.currency,
          symbol: profile.currencySymbol,
        }),
      );
      dispatch(setMonthlyBudget(profile.monthlyBudget));
      dispatch(setHasOnboarded(profile.hasSeenOnboarding));
      dispatch(setThemeMode(profile.themeMode as any));
      dispatch(setColorPalette(profile.colorPalette as any));

      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 500,
        delay: 600,
        useNativeDriver: true,
      }).start(() => setReady(true));
    };

    initApp();
  }, [hasOnboarded]);

  if (!ready) {
    return (
      <Animated.View style={[styles.splash, { opacity: fadeAnim }]}>
        <Text style={styles.splashEmoji}>💰</Text>
        <Text style={styles.splashTitle}>Finance Companion</Text>
        <Text style={styles.splashSubtitle}>Loading your finances...</Text>
      </Animated.View>
    );
  }

  return <>{children}</>;
};

function getStyles(theme: Theme) {
  return StyleSheet.create({
    splash: {
      flex: 1,
      backgroundColor: theme.colors.background,
      alignItems: 'center',
      justifyContent: 'center',
      gap: 12,
    },
    splashEmoji: { fontSize: 64 },
    splashTitle: {
      fontSize: FontSizes['2xl'],
      fontWeight: FontWeights.extrabold as '800',
      color: theme.colors.textPrimary,
    },
    splashSubtitle: {
      fontSize: FontSizes.sm,
      color: theme.colors.textMuted,
    },
  });
}
