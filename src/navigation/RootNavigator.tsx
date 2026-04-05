import React from 'react';
import { useAppSelector } from '../app/hooks';
import { BottomTabNavigator } from './BottomTabNavigator';
import LoginScreen from '../screens/Login/LoginScreen';

export const RootNavigator = () => {
  const hasOnboarded = useAppSelector(state => state.ui.hasOnboarded);

  if (!hasOnboarded) {
    return <LoginScreen />;
  }

  return <BottomTabNavigator />;
};
