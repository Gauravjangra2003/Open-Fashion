import { Ionicons } from '@expo/vector-icons';
import React, { useCallback, useState } from 'react';
import { InteractionManager, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PaymentSuccessModal } from '../../components/checkout';
import { colors, spacing, typography } from '../../constants/theme';
import { useStore } from '../../context/StoreContext';

function randomPaymentId() {
  return `PAY-${Date.now().toString(36).toUpperCase()}-${Math.random()
    .toString(36)
    .slice(2, 7)
    .toUpperCase()}`;
}

function goHome(navigation) {
  navigation.navigate('Main', {
    screen: 'Home',
    params: { screen: 'HomeFeed' },
  });
}

export function CheckoutScreen({ navigation }) {
  const { cartTotal, clearCart } = useStore();
  const [modalVisible, setModalVisible] = useState(false);
  const [paymentId, setPaymentId] = useState('');

  const pay = () => {
    setPaymentId(randomPaymentId());
    setModalVisible(true);
  };

  /** One path for both modal buttons: clear cart, close modal, then go home after state settles. */
  const finishAfterPayment = useCallback(() => {
    clearCart();
    setModalVisible(false);
    InteractionManager.runAfterInteractions(() => {
      goHome(navigation);
    });
  }, [clearCart, navigation]);

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      <View style={styles.topRow}>
        <Pressable onPress={() => navigation.goBack()} hitSlop={12}>
          <Ionicons name="chevron-back" size={26} color={colors.black} />
        </Pressable>
        <Text style={styles.titleInline}>Checkout</Text>
        <View style={styles.topSpacer} />
      </View>
      <View style={styles.card}>
        <Text style={styles.label}>Order total</Text>
        <Text style={styles.amount}>${cartTotal.toFixed(2)}</Text>
        <Text style={styles.note}>
          This is a demo checkout. No payment is processed.
        </Text>
        <Pressable style={styles.pay} onPress={pay}>
          <Text style={styles.payText}>Pay Now</Text>
        </Pressable>
      </View>
      <PaymentSuccessModal
        visible={modalVisible}
        paymentId={paymentId}
        onComplete={finishAfterPayment}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingTop: spacing.sm,
    marginBottom: spacing.md,
  },
  titleInline: {
    flex: 1,
    fontSize: 18,
    fontWeight: '400',
    letterSpacing: 2,
    textTransform: 'uppercase',
    textAlign: 'center',
    color: colors.black,
  },
  topSpacer: {
    width: 26,
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
    marginBottom: spacing.xs,
  },
  amount: {
    fontSize: 32,
    fontWeight: '300',
    letterSpacing: 1,
    color: colors.black,
    marginBottom: spacing.md,
  },
  note: {
    ...typography.subtitle,
    marginBottom: spacing.xl,
    lineHeight: 20,
  },
  pay: {
    backgroundColor: colors.black,
    paddingVertical: spacing.md,
    alignItems: 'center',
  },
  payText: {
    color: colors.white,
    fontSize: 12,
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
});
