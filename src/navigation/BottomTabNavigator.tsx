import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { StyleSheet, View } from 'react-native';

import { useTheme } from '../theme/useTheme';
import { useStyles as useAppStyles } from '../theme/useStyles';
import { Theme } from '../theme/types';
import {
  BottomTabParamList,
  HomeStackParamList,
  TransactionsStackParamList,
  GoalsStackParamList,
  InsightsStackParamList,
  SettingsStackParamList,
} from './types';

import HomeScreen from '../screens/Home/HomeScreen';
import TransactionsScreen from '../screens/Transactions/TransactionsScreen';
import AddTransactionScreen from '../screens/Transactions/AddTransactionScreen';
import GoalsScreen from '../screens/Goals/GoalsScreen';
import AddGoalScreen from '../screens/Goals/AddGoalScreen';
import InsightsScreen from '../screens/Insights/InsightsScreen';
import SettingsScreen from '../screens/Settings/SettingsScreen';
import ProfileScreen from '../screens/Profile/ProfileScreen';

const Tab = createBottomTabNavigator<BottomTabParamList>();
const HomeStack = createStackNavigator<HomeStackParamList>();
const TransactionsStack = createStackNavigator<TransactionsStackParamList>();
const GoalsStack = createStackNavigator<GoalsStackParamList>();
const InsightsStack = createStackNavigator<InsightsStackParamList>();
const SettingsStack = createStackNavigator<SettingsStackParamList>();

const getScreenOptions = (theme: Theme) => ({
  headerShown: false,
  cardStyle: { backgroundColor: theme.colors.background },
});

const HomeStackNavigator = () => {
  const theme = useTheme();
  return (
    <HomeStack.Navigator screenOptions={getScreenOptions(theme)}>
      <HomeStack.Screen name="Home" component={HomeScreen} />
    </HomeStack.Navigator>
  );
};

const TransactionsStackNavigator = () => {
  const theme = useTheme();
  return (
    <TransactionsStack.Navigator screenOptions={getScreenOptions(theme)}>
      <TransactionsStack.Screen
        name="Transactions"
        component={TransactionsScreen}
      />
      <TransactionsStack.Screen
        name="AddTransaction"
        component={AddTransactionScreen}
        options={{ presentation: 'modal' }}
      />
    </TransactionsStack.Navigator>
  );
};

const GoalsStackNavigator = () => {
  const theme = useTheme();
  return (
    <GoalsStack.Navigator screenOptions={getScreenOptions(theme)}>
      <GoalsStack.Screen name="Goals" component={GoalsScreen} />
      <GoalsStack.Screen
        name="AddGoal"
        component={AddGoalScreen}
        options={{ presentation: 'modal' }}
      />
    </GoalsStack.Navigator>
  );
};

const InsightsStackNavigator = () => {
  const theme = useTheme();
  return (
    <InsightsStack.Navigator screenOptions={getScreenOptions(theme)}>
      <InsightsStack.Screen name="Insights" component={InsightsScreen} />
    </InsightsStack.Navigator>
  );
};

const SettingsStackNavigator = () => {
  const theme = useTheme();
  return (
    <SettingsStack.Navigator screenOptions={getScreenOptions(theme)}>
      <SettingsStack.Screen name="Settings" component={SettingsScreen} />
      <SettingsStack.Screen name="Profile" component={ProfileScreen} />
    </SettingsStack.Navigator>
  );
};

type TabBarIconProps = {
  color: string;
  size: number;
  focused: boolean;
};

const TAB_ICONS: Record<string, { active: string; inactive: string }> = {
  HomeTab: { active: 'view-dashboard', inactive: 'view-dashboard-outline' },
  TransactionsTab: {
    active: 'swap-horizontal-bold',
    inactive: 'swap-horizontal',
  },
  GoalsTab: { active: 'bullseye-arrow', inactive: 'bullseye' },
  InsightsTab: { active: 'chart-bar', inactive: 'chart-bar' },
  SettingsTab: { active: 'cog', inactive: 'cog-outline' },
};

export const BottomTabNavigator = () => {
  const theme = useTheme();
  const styles = useAppStyles(getStyles);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.textMuted,
        tabBarShowLabel: true,
        tabBarLabelStyle: styles.tabBarLabel,
        tabBarIcon: ({ color, size, focused }: TabBarIconProps) => {
          const icons = TAB_ICONS[route.name];
          const iconName = focused ? icons.active : icons.inactive;
          return (
            <View style={focused ? styles.activeIconContainer : undefined}>
              <Icon
                name={iconName}
                size={22}
                color={color}
                style={focused ? { padding: 4 } : {}}
              />
            </View>
          );
        },
      })}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeStackNavigator}
        options={{ tabBarLabel: 'Home' }}
      />
      <Tab.Screen
        name="TransactionsTab"
        component={TransactionsStackNavigator}
        options={{ tabBarLabel: 'Transactions' }}
      />
      <Tab.Screen
        name="GoalsTab"
        component={GoalsStackNavigator}
        options={{ tabBarLabel: 'Goals' }}
      />
      <Tab.Screen
        name="InsightsTab"
        component={InsightsStackNavigator}
        options={{ tabBarLabel: 'Insights' }}
      />
      <Tab.Screen
        name="SettingsTab"
        component={SettingsStackNavigator}
        options={{ tabBarLabel: 'Settings' }}
      />
    </Tab.Navigator>
  );
};

function getStyles(theme: Theme) {
  return StyleSheet.create({
    tabBar: {
      backgroundColor: theme.colors.surface,
      borderTopColor: theme.colors.border,
      borderTopWidth: 1,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: -4 },
      shadowOpacity: 0.1,
      shadowRadius: 12,
      height: 65,
      paddingBottom: 10,
    },
    tabBarLabel: {
      fontSize: 10,
      fontWeight: '600',
      marginTop: 2,
    },
    activeIconContainer: {
      backgroundColor: theme.colors.primaryLight,
      borderRadius: 12,
    },
  });
}
