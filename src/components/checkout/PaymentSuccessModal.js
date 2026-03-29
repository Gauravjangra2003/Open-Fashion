import React from 'react';
import {
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing, typography } from '../../constants/theme';

export function PaymentSuccessModal({ visible, paymentId, onSubmit, onBackHome }) {
  const id =
    paymentId ||
    `PAY-${Math.random().toString(36).slice(2, 10).toUpperCase()}`;

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.backdrop}>
        <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
          <View style={styles.card}>
            <Text style={styles.title}>PAYMENT SUCCESS</Text>
            <Text style={styles.message}>Your payment was successful</Text>
            <Text style={styles.label}>Payment ID</Text>
            <Text style={styles.paymentId}>{id}</Text>
            <View style={styles.ratingRow}>
              <Text style={styles.emoji}>⭐</Text>
              <Text style={styles.emoji}>✨</Text>
              <Text style={styles.emoji}>👔</Text>
            </View>
            <Pressable style={styles.primary} onPress={onSubmit}>
              <Text style={styles.primaryText}>Submit</Text>
            </Pressable>
            <Pressable style={styles.secondary} onPress={onBackHome}>
              <Text style={styles.secondaryText}>Back to Home</Text>
            </Pressable>
          </View>
        </SafeAreaView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: colors.overlay,
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
  },
  safe: {
    flex: 1,
    justifyContent: 'center',
  },
  card: {
    backgroundColor: colors.white,
    padding: spacing.xl,
    borderWidth: 1,
    borderColor: colors.border,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: 3,
    color: colors.black,
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  message: {
    ...typography.body,
    color: colors.textMuted,
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  label: {
    ...typography.caption,
    color: colors.textMuted,
    textAlign: 'center',
    marginBottom: spacing.xs,
  },
  paymentId: {
    fontSize: 14,
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    color: colors.black,
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  ratingRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacing.md,
    marginBottom: spacing.xl,
  },
  emoji: {
    fontSize: 28,
  },
  primary: {
    backgroundColor: colors.black,
    paddingVertical: spacing.md,
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  primaryText: {
    color: colors.white,
    fontSize: 13,
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  secondary: {
    paddingVertical: spacing.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.black,
  },
  secondaryText: {
    color: colors.black,
    fontSize: 13,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
});
