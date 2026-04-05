import { NavigatorScreenParams, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

export type BottomTabParamList = {
  HomeTab: undefined;
  TransactionsTab: undefined;
  GoalsTab: undefined;
  InsightsTab: undefined;
  SettingsTab: NavigatorScreenParams<SettingsStackParamList> | undefined;
};

export type HomeStackParamList = {
  Home: undefined;
};

export type TransactionsStackParamList = {
  Transactions: undefined;
  AddTransaction: { transactionId?: string } | undefined;
};

export type GoalsStackParamList = {
  Goals: undefined;
  AddGoal: { goalId?: string } | undefined;
};

export type InsightsStackParamList = {
  Insights: undefined;
};

export type SettingsStackParamList = {
  Settings: undefined;
  Profile: undefined;
};

export type SettingsScreenNavigationProp = StackNavigationProp<
  SettingsStackParamList,
  'Settings'
>;

export type ProfileScreenNavigationProp = StackNavigationProp<
  SettingsStackParamList,
  'Profile'
>;
export type TransactionsScreenNavigationProp = StackNavigationProp<
  TransactionsStackParamList,
  'Transactions'
>;

export type AddTransactionScreenNavigationProp = StackNavigationProp<
  TransactionsStackParamList,
  'AddTransaction'
>;

export type AddTransactionScreenRouteProp = RouteProp<
  TransactionsStackParamList,
  'AddTransaction'
>;

export type GoalsScreenNavigationProp = StackNavigationProp<
  GoalsStackParamList,
  'Goals'
>;

export type AddGoalScreenNavigationProp = StackNavigationProp<
  GoalsStackParamList,
  'AddGoal'
>;

export type AddGoalScreenRouteProp = RouteProp<GoalsStackParamList, 'AddGoal'>;
