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
import {
  showAuthValidationToast,
  showPasswordLengthToast,
  showPasswordMismatchToast,
} from '../../utils/authToast';
import { digitsOnly, PASSWORD_DIGIT_LENGTH } from '../../utils/digitsOnly';

export function SignUpScreen({ navigation }) {
  const { setSessionEmail } = useStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const isComplete =
    email.trim().length > 0 &&
    password.length === PASSWORD_DIGIT_LENGTH &&
    confirmPassword.length === PASSWORD_DIGIT_LENGTH;

  const submit = () => {
    if (!email.trim()) {
      showAuthValidationToast();
      return;
    }
    if (
      password.length !== PASSWORD_DIGIT_LENGTH ||
      confirmPassword.length !== PASSWORD_DIGIT_LENGTH
    ) {
      showPasswordLengthToast();
      return;
    }
    if (password !== confirmPassword) {
      showPasswordMismatchToast();
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
          <Text style={styles.headline}>Create account</Text>
          <Text style={styles.hint}>Join Open Fashion for curated menswear.</Text>
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
            onChangeText={(t) =>
              setPassword(digitsOnly(t).slice(0, PASSWORD_DIGIT_LENGTH))
            }
            maxLength={PASSWORD_DIGIT_LENGTH}
          />
          <Text style={styles.label}>Confirm Password</Text>
          <TextInput
            style={styles.input}
            placeholder="••••••••"
            placeholderTextColor={colors.textMuted}
            keyboardType="number-pad"
            secureTextEntry
            value={confirmPassword}
            onChangeText={(t) =>
              setConfirmPassword(digitsOnly(t).slice(0, PASSWORD_DIGIT_LENGTH))
            }
            maxLength={PASSWORD_DIGIT_LENGTH}
          />
          <Pressable
            style={[styles.primary, !isComplete && styles.primaryDisabled]}
            onPress={submit}
          >
            <Text style={styles.primaryText}>Sign Up</Text>
          </Pressable>
          <Pressable
            style={styles.link}
            onPress={() => navigation.navigate('SignIn')}
          >
            <Text style={styles.linkText}>Already have an account? Sign In</Text>
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
