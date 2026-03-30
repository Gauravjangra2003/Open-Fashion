import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Logo } from '../../components/common';
import { useStore } from '../../context/StoreContext';
import { colors, spacing, typography } from '../../constants/theme';
import { showAuthValidationToast } from '../../utils/authToast';
import { digitsOnly } from '../../utils/digitsOnly';

export function SignInScreen({ navigation }) {
  const { setSessionEmail } = useStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const isComplete =
    email.trim().length > 0 && password.trim().length > 0;

  const submit = () => {
    if (!isComplete) {
      showAuthValidationToast();
      return;
    }
    setSessionEmail(email.trim());
    navigation.replace('Main');
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.flex}
      >
        <View style={styles.inner}>
          <Logo />
          <Text style={styles.headline}>Sign in</Text>
          <Text style={styles.hint}>Welcome back. Continue with your email.</Text>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="you@example.com"
            placeholderTextColor={colors.textMuted}
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="••••••••"
            placeholderTextColor={colors.textMuted}
            keyboardType="number-pad"
            secureTextEntry
            value={password}
            onChangeText={(t) => setPassword(digitsOnly(t))}
          />
          <Pressable
            style={[styles.primary, !isComplete && styles.primaryDisabled]}
            onPress={submit}
          >
            <Text style={styles.primaryText}>Sign In</Text>
          </Pressable>
          <Pressable
            style={styles.link}
            onPress={() => navigation.navigate('SignUp')}
          >
            <Text style={styles.linkText}>Need an account? Sign Up</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },
  flex: {
    flex: 1,
  },
  inner: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xxl,
  },
  headline: {
    ...typography.title,
    marginTop: spacing.xl,
    marginBottom: spacing.sm,
  },
  hint: {
    ...typography.subtitle,
    marginBottom: spacing.xl,
  },
  label: {
    ...typography.caption,
    color: colors.textMuted,
    marginBottom: spacing.xs,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    marginBottom: spacing.md,
    backgroundColor: colors.white,
    fontSize: 16,
    color: colors.text,
  },
  primary: {
    backgroundColor: colors.black,
    paddingVertical: spacing.md,
    alignItems: 'center',
    marginTop: spacing.sm,
  },
  primaryDisabled: {
    backgroundColor: '#C8C8C8',
  },
  primaryText: {
    color: colors.white,
    fontSize: 12,
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  link: {
    marginTop: spacing.lg,
    alignItems: 'center',
  },
  linkText: {
    ...typography.body,
    color: colors.textMuted,
    textDecorationLine: 'underline',
  },
});
