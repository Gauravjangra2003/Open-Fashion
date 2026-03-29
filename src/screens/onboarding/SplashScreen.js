import React, { useEffect } from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Logo } from '../../components/common';
import { colors, spacing } from '../../constants/theme';

export function SplashScreen({ navigation }) {
  useEffect(() => {
    const t = setTimeout(() => {
      navigation.replace('Onboarding');
    }, 2500);
    return () => clearTimeout(t);
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom', 'left', 'right']}>
      <Logo />
      <ActivityIndicator
        style={styles.loader}
        color={colors.beigeDark}
        size="small"
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: spacing.xxl,
  },
  loader: {
    marginTop: spacing.xl,
  },
});
