import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { RealmProvider } from '@realm/react';
import { Provider as ReduxProvider } from 'react-redux';

import { store } from './src/app/store';
import { RealmConfig } from './src/db/RealmConfig';
import { RootNavigator } from './src/navigation/RootNavigator';
import { AppInitializer } from './src/components/AppInitializer/AppInitializer';
import { ThemeProvider } from './src/theme/ThemeProvider';

function App(): React.JSX.Element {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <ReduxProvider store={store}>
          <RealmProvider
            schema={RealmConfig.schema}
            schemaVersion={RealmConfig.schemaVersion}
            onMigration={(oldRealm, newRealm) => {
              if (oldRealm.schemaVersion < 2) {
                const oldProfiles = oldRealm.objects('UserProfile');
                const newProfiles = newRealm.objects('UserProfile');
                for (let i = 0; i < oldProfiles.length; i++) {
                  const oldProfile = oldProfiles[i] as any;
                  const newProfile = newProfiles[i] as any;
                  newProfile.themeMode = oldProfile.isDarkMode
                    ? 'dark'
                    : 'light';
                  newProfile.colorPalette = 'default';
                }
              }
            }}
          >
            <ThemeProvider>
              <NavigationContainer>
                <AppInitializer>
                  <RootNavigator />
                </AppInitializer>
              </NavigationContainer>
            </ThemeProvider>
          </RealmProvider>
        </ReduxProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

export default App;
