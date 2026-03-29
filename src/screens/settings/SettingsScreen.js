import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing, typography } from '../../constants/theme';

export function SettingsScreen({ navigation }) {
  const logout = () => {
    const root = navigation.getParent()?.getParent();
    root?.reset({
      index: 0,
      routes: [{ name: 'SignIn' }],
    });
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      <Text style={styles.title}>Settings</Text>
      <View style={styles.card}>
        <Text style={styles.label}>Name</Text>
        <Text style={styles.value}>James Mercer</Text>
        <Text style={[styles.label, styles.gap]}>Email</Text>
        <Text style={styles.value}>james.mercer@example.com</Text>
        <Text style={[styles.label, styles.gap]}>Member since</Text>
        <Text style={styles.value}>2024</Text>
      </View>
      <Pressable style={styles.logout} onPress={logout}>
        <Text style={styles.logoutText}>Logout</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },
  title: {
    fontSize: 22,
    fontWeight: '400',
    letterSpacing: 2,
    textTransform: 'uppercase',
    paddingHorizontal: spacing.md,
    paddingTop: spacing.sm,
    marginBottom: spacing.lg,
    color: colors.black,
  },
  card: {
    marginHorizontal: spacing.md,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.white,
  },
  label: {
    ...typography.caption,
    color: colors.textMuted,
  },
  gap: {
    marginTop: spacing.md,
  },
  value: {
    ...typography.body,
    color: colors.text,
    marginTop: 4,
  },
  logout: {
    marginHorizontal: spacing.md,
    marginTop: spacing.xl,
    paddingVertical: spacing.md,
    borderWidth: 1,
    borderColor: colors.black,
    alignItems: 'center',
  },
  logoutText: {
    fontSize: 12,
    letterSpacing: 2,
    textTransform: 'uppercase',
    color: colors.black,
  },
});
