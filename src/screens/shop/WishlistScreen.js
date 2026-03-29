import React from 'react';
import { FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing, typography } from '../../constants/theme';
import { useStore } from '../../context/StoreContext';
import { productImageSource } from '../../utils/imageSource';

export function WishlistScreen() {
  const { wishlistProducts, toggleWishlist } = useStore();

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      <Text style={styles.title}>Wishlist</Text>
      <Text style={styles.sub}>Saved pieces</Text>
      <FlatList
        data={wishlistProducts}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <Text style={styles.empty}>Your wishlist is empty.</Text>
        }
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Image source={productImageSource(item.image)} style={styles.thumb} />
            <View style={styles.meta}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.price}>${item.price}</Text>
            </View>
            <Pressable
              onPress={() => toggleWishlist(item.id)}
              style={styles.remove}
              hitSlop={8}
            >
              <Text style={styles.removeText}>Remove</Text>
            </Pressable>
          </View>
        )}
      />
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
    color: colors.black,
  },
  sub: {
    ...typography.subtitle,
    paddingHorizontal: spacing.md,
    marginBottom: spacing.md,
  },
  list: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.xxl,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  thumb: {
    width: 72,
    height: 96,
    backgroundColor: colors.border,
  },
  meta: {
    flex: 1,
    marginLeft: spacing.md,
  },
  name: {
    ...typography.body,
    color: colors.text,
    marginBottom: 4,
  },
  price: {
    ...typography.price,
  },
  remove: {
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
  },
  removeText: {
    fontSize: 11,
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: colors.textMuted,
    textDecorationLine: 'underline',
  },
  empty: {
    textAlign: 'center',
    color: colors.textMuted,
    marginTop: spacing.xxl,
  },
});
