import { StatusBar } from 'expo-status-bar';
import React from 'react';
import Toast from 'react-native-toast-message';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StoreProvider } from './context/StoreContext';
import { RootNavigator } from './navigation';

export default function App() {
  return (
    <SafeAreaProvider>
      <StoreProvider>
        <StatusBar style="dark" />
        <RootNavigator />
        <Toast />
      </StoreProvider>
    </SafeAreaProvider>
  );
}
