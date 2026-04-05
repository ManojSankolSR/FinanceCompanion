import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Animated,
  StatusBar,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRealm, useQuery } from '@realm/react';

import { useAppDispatch } from '../../app/hooks';
import {
  setUserName,
  setCurrency,
  setHasOnboarded,
} from '../../features/ui/uiSlice';
import { LoginHeader } from './components/LoginHeader';
import { LoginForm } from './components/LoginForm';
import { useTheme } from '../../theme/useTheme';
import { useStyles } from '../../theme/useStyles';
import { Theme } from '../../theme/types';

export default function LoginScreen() {
  const theme = useTheme();
  const styles = useStyles(getStyles);
  const realm = useRealm();
  const dispatch = useAppDispatch();
  const userProfiles = useQuery('UserProfile');

  const [name, setName] = useState('');
  const [currency, setLocalCurrency] = useState('INR');
  const [currencySymbol, setLocalCurrencySymbol] = useState('₹');
  const [showCurrencyPicker, setShowCurrencyPicker] = useState(false);
  const fadeAnim = useState(new Animated.Value(0))[0];

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const handleContinue = () => {
    if (!name.trim()) return;

    let profile = userProfiles[0] as any;

    realm.write(() => {
      if (profile) {
        profile.name = name.trim();
        profile.currency = currency;
        profile.currencySymbol = currencySymbol;
        profile.hasSeenOnboarding = true;
      } else {
        profile = realm.create('UserProfile', {
          _id: new Realm.BSON.ObjectId(),
          name: name.trim(),
          currency: currency,
          currencySymbol: currencySymbol,
          hasSeenOnboarding: true,
          monthlyBudget: 50000,
          themeMode: 'system',
          colorPalette: 'default',
        });
      }
    });

    dispatch(setUserName(profile.name));
    dispatch(
      setCurrency({
        currency: profile.currency,
        symbol: profile.currencySymbol,
      }),
    );
    dispatch(setHasOnboarded(true));
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle={theme.dark ? 'light-content' : 'dark-content'} />
      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={styles.keyboardView}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
              <LoginHeader />

              <LoginForm
                name={name}
                setName={setName}
                showCurrencyPicker={showCurrencyPicker}
                setShowCurrencyPicker={setShowCurrencyPicker}
                currency={currency}
                currencySymbol={currencySymbol}
                onSelectCurrency={(cur, sym) => {
                  setLocalCurrency(cur);
                  setLocalCurrencySymbol(sym);
                  setShowCurrencyPicker(false);
                }}
                onContinue={handleContinue}
              />
            </Animated.View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}

function getStyles(theme: Theme) {
  return StyleSheet.create({
    container: { flex: 1, backgroundColor: theme.colors.background },
    safeArea: { flex: 1 },
    keyboardView: { flex: 1 },
    scrollContent: { flexGrow: 1, padding: 24, justifyContent: 'center' },
    content: { width: '100%' },
  });
}
