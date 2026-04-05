import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useRealm } from '@realm/react';
import { useNavigation } from '@react-navigation/native';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  setCurrency,
  setMonthlyBudget,
  setUserName,
} from '../../features/ui/uiSlice';
import { setTransactions } from '../../features/transactions/transactionsSlice';
import { setGoals } from '../../features/goals/goalsSlice';
import { formatCurrency, getExchangeRate } from '../../utils/currency';
import { GradientCard } from '../../components/common/GradientCard';
import { useTheme } from '../../theme/useTheme';
import { useStyles } from '../../theme/useStyles';
import { Theme } from '../../theme/types';
import { serializeTransaction } from '../../hooks/useTransactions';
import { serializeGoal } from '../../hooks/useGoals';

import { ProfileHeader } from './components/ProfileHeader';
import { AvatarIdentity } from './components/AvatarIdentity';
import { DetailItem } from './components/DetailItem';
import { CurrencyPicker } from './components/CurrencyPicker';

export default function ProfileScreen() {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const realm = useRealm();
  const theme = useTheme();
  const styles = useStyles(getStyles);

  const userProfiles = realm.objects('UserProfile');
  const realmTransactions = realm.objects('Transaction');
  const realmGoals = realm.objects('Goal');

  const userName = useAppSelector(s => s.ui.userName);
  const currencySymbol = useAppSelector(s => s.ui.currencySymbol);
  const currency = useAppSelector(s => s.ui.currency);
  const monthlyBudget = useAppSelector(s => s.ui.monthlyBudget);

  const [editingName, setEditingName] = useState(false);
  const [nameInput, setNameInput] = useState(userName);

  const [editingBudget, setEditingBudget] = useState(false);
  const [budgetInput, setBudgetInput] = useState(monthlyBudget.toString());

  const [showCurrencyPicker, setShowCurrencyPicker] = useState(false);
  const [isConverting, setIsConverting] = useState(false);

  const handleSaveName = () => {
    if (nameInput.trim().length > 0) {
      dispatch(setUserName(nameInput.trim()));
      let profile = userProfiles[0] as any;
      if (profile) {
        realm.write(() => {
          profile.name = nameInput.trim();
        });
      }
    }
    setEditingName(false);
  };

  const handleSaveBudget = () => {
    const num = parseFloat(budgetInput);
    if (!isNaN(num) && num > 0) {
      dispatch(setMonthlyBudget(num));
      let profile = userProfiles[0] as any;
      if (profile) {
        realm.write(() => {
          profile.monthlyBudget = num;
        });
      }
    }
    setEditingBudget(false);
  };

  const handleCurrencyChange = async (
    newCurrency: string,
    newSymbol: string,
  ) => {
    if (newCurrency === currency) {
      setShowCurrencyPicker(false);
      return;
    }
    setShowCurrencyPicker(false);
    setIsConverting(true);
    try {
      const rate = await getExchangeRate(currency, newCurrency);
      let profile = userProfiles[0] as any;
      realm.write(() => {
        if (profile) {
          profile.currency = newCurrency;
          profile.currencySymbol = newSymbol;
          profile.monthlyBudget = profile.monthlyBudget * rate;
        }
        realmTransactions.forEach((t: any) => (t.amount *= rate));
        realmGoals.forEach((g: any) => {
          if (typeof g.targetAmount === 'number') g.targetAmount *= rate;
          if (typeof g.currentAmount === 'number' && g.currentAmount > 0)
            g.currentAmount *= rate;
        });
      });
      const serializedTransactions = Array.from(realmTransactions).map(
        (t: any) => serializeTransaction(t),
      );
      const serializedGoals = Array.from(realmGoals).map((g: any) =>
        serializeGoal(g),
      );
      dispatch(setTransactions(serializedTransactions));
      dispatch(setGoals(serializedGoals));
      dispatch(setCurrency({ currency: newCurrency, symbol: newSymbol }));
      if (profile) dispatch(setMonthlyBudget(profile.monthlyBudget));
    } catch (error) {
      Alert.alert('Error', 'Failed to convert currencies.');
    } finally {
      setIsConverting(false);
    }
  };

  return (
    <View style={styles.container}>
      <SafeAreaView edges={['top']} style={styles.safeArea}>
        <ProfileHeader
          title="User Profile"
          onBack={() => navigation.goBack()}
        />

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <AvatarIdentity
            userName={userName}
            nameInput={nameInput}
            isEditing={editingName}
            onEditPress={() => setEditingName(true)}
            onSaveName={handleSaveName}
            onNameChange={setNameInput}
          />

          <Text style={styles.sectionLabel}>PERSONAL DETAILS</Text>
          <GradientCard style={styles.settingsGroup}>
            <DetailItem
              icon="card-account-details-outline"
              iconColor={theme.colors.primary}
              iconBg={theme.colors.primaryLight}
              label="Display Name"
              value={userName}
              onPress={() => setEditingName(true)}
            />

            <View style={styles.settingSeparator} />

            <DetailItem
              icon="currency-usd"
              iconColor={theme.colors.income}
              iconBg={theme.colors.incomeLight}
              label="Preferred Currency"
              value={`${currency} (${currencySymbol})`}
              onPress={() => setShowCurrencyPicker(!showCurrencyPicker)}
              rightIcon={showCurrencyPicker ? 'chevron-up' : 'chevron-down'}
              isLoading={isConverting}
            />

            {showCurrencyPicker && (
              <CurrencyPicker
                currentCurrency={currency}
                onSelect={handleCurrencyChange}
                isConverting={isConverting}
              />
            )}

            <View style={styles.settingSeparator} />

            <DetailItem
              icon="wallet-outline"
              iconColor={theme.colors.savings}
              iconBg={theme.colors.savingsLight}
              label="Monthly Budget"
              onPress={() =>
                editingBudget ? handleSaveBudget() : setEditingBudget(true)
              }
              rightIcon={editingBudget ? 'check' : 'pencil'}
            >
              {editingBudget ? (
                <View style={styles.budgetEditRow}>
                  <Text style={styles.budgetSymbol}>{currencySymbol}</Text>
                  <TextInput
                    style={styles.budgetInput}
                    value={budgetInput}
                    onChangeText={setBudgetInput}
                    keyboardType="decimal-pad"
                    autoFocus
                    onSubmitEditing={handleSaveBudget}
                    returnKeyType="done"
                  />
                </View>
              ) : (
                <Text style={styles.settingValue}>
                  {formatCurrency(monthlyBudget, currencySymbol)}
                </Text>
              )}
            </DetailItem>
          </GradientCard>

          <View style={styles.footer}>
            <Icon
              name="shield-check-outline"
              size={16}
              color={theme.colors.textMuted}
            />
            <Text style={styles.footerText}>
              Your profile data is stored locally on this device.
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

    sectionLabel: {
      fontSize: 12,
      fontWeight: '600',
      color: theme.colors.textMuted,
      letterSpacing: 0.8,
      textTransform: 'uppercase',
      paddingHorizontal: 20,
      marginBottom: 10,
      marginTop: 20,
    },
    settingsGroup: {
      marginHorizontal: 20,
      marginBottom: 12,
      padding: 0,
      overflow: 'hidden',
    },
    settingSeparator: {
      height: 1,
      backgroundColor: theme.colors.border,
      marginHorizontal: 16,
    },
    settingValue: {
      fontSize: 14,
      color: theme.colors.textMuted,
      marginTop: 2,
    },

    budgetEditRow: { flexDirection: 'row', alignItems: 'center' },
    budgetSymbol: {
      fontSize: 16,
      color: theme.colors.textSecondary,
      fontWeight: '500',
      marginRight: 4,
    },
    budgetInput: {
      color: theme.colors.textPrimary,
      fontSize: 16,
      fontWeight: '500',
      padding: 0,
      minWidth: 80,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.primary,
    },

    footer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 30,
      gap: 8,
      paddingHorizontal: 40,
    },
    footerText: {
      fontSize: 12,
      color: theme.colors.textMuted,
      textAlign: 'center',
    },
  });
}
