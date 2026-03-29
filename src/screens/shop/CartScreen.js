import React from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing, typography } from '../../constants/theme';
import { useStore } from '../../context/StoreContext';

export function CartScreen({ navigation }) {
  const {
    cart,
    getProductById,
    updateCartQuantity,
    removeFromCart,
    cartTotal,
  } = useStore();

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      <Text style={styles.title}>Cart</Text>
      <ScrollView contentContainerStyle={styles.scroll}>
        {cart.length === 0 ? (
          <Text style={styles.empty}>Your bag is empty.</Text>
        ) : (
          cart.map((line) => {
            const p = getProductById(line.productId);
            if (!p) return null;
            return (
              <View key={line.productId} style={styles.row}>
                <Image source={{ uri: p.image }} style={styles.thumb} />
                <View style={styles.meta}>
                  <Text style={styles.name}>{p.name}</Text>
                  <Text style={styles.price}>${p.price}</Text>
                  <View style={styles.qtyRow}>
                    <Pressable
                      onPress={() =>
                        updateCartQuantity(line.productId, line.quantity - 1)
                      }
                      style={styles.qtyBtn}
                    >
                      <Text style={styles.qtySymbol}>−</Text>
                    </Pressable>
                    <Text style={styles.qty}>{line.quantity}</Text>
                    <Pressable
                      onPress={() =>
                        updateCartQuantity(line.productId, line.quantity + 1)
                      }
                      style={styles.qtyBtn}
                    >
                      <Text style={styles.qtySymbol}>+</Text>
                    </Pressable>
                  </View>
                </View>
                <Pressable onPress={() => removeFromCart(line.productId)}>
                  <Text style={styles.remove}>Remove</Text>
                </Pressable>
              </View>
            );
          })
        )}
      </ScrollView>
      {cart.length > 0 ? (
        <View style={styles.footer}>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>${cartTotal.toFixed(2)}</Text>
          </View>
          <Pressable
            style={styles.checkout}
            onPress={() =>
              navigation.getParent()?.getParent()?.navigate('Checkout')
            }
          >
            <Text style={styles.checkoutText}>Checkout</Text>
          </Pressable>
        </View>
      ) : null}
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
    marginBottom: spacing.sm,
    color: colors.black,
  },
  scroll: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.xxl,
  },
  empty: {
    textAlign: 'center',
    color: colors.textMuted,
    marginTop: spacing.xxl,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  thumb: {
    width: 80,
    height: 104,
    backgroundColor: colors.border,
  },
  meta: {
    flex: 1,
    marginLeft: spacing.md,
  },
  name: {
    ...typography.body,
    color: colors.text,
  },
  price: {
    ...typography.price,
    marginTop: 4,
  },
  qtyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.sm,
  },
  qtyBtn: {
    width: 32,
    height: 32,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
  },
  qtySymbol: {
    fontSize: 18,
    color: colors.black,
  },
  qty: {
    marginHorizontal: spacing.md,
    fontSize: 15,
    minWidth: 24,
    textAlign: 'center',
  },
  remove: {
    fontSize: 11,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    color: colors.textMuted,
    textDecorationLine: 'underline',
  },
  footer: {
    padding: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.white,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  totalLabel: {
    fontSize: 13,
    letterSpacing: 2,
    textTransform: 'uppercase',
    color: colors.textMuted,
  },
  totalValue: {
    fontSize: 18,
    fontWeight: '500',
    color: colors.black,
  },
  checkout: {
    backgroundColor: colors.black,
    paddingVertical: spacing.md,
    alignItems: 'center',
  },
  checkoutText: {
    color: colors.white,
    fontSize: 12,
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
});
