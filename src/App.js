import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import Toast, { BaseToast } from 'react-native-toast-message';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StoreProvider } from './context/StoreContext';
import { RootNavigator } from './navigation';

const toastConfig = {
  validation: (props) => (
    <View style={toastStyles.topRight}>
      <BaseToast
        {...props}
        style={{ borderLeftColor: '#0D0D0D', width: 300 }}
      />
    </View>
  ),
};

const toastStyles = StyleSheet.create({
  topRight: {
    width: '100%',
    alignItems: 'flex-end',
    paddingRight: 12,
  },
});

export default function App() {
  return (
    <SafeAreaProvider>
      <StoreProvider>
        <StatusBar style="dark" />
        <RootNavigator />
        <Toast config={toastConfig} />
      </StoreProvider>
    </SafeAreaProvider>
  );
}
