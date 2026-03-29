import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { colors, spacing, typography } from '../../constants/theme';
import { useStore } from '../../context/StoreContext';

export function ProductCard({ product, onPress }) {
  const { toggleWishlist, isInWishlist, addToCart } = useStore();
  const saved = isInWishlist(product.id);

  return (
    <Pressable style={styles.card} onPress={() => onPress?.(product)}>
      <View style={styles.imageWrap}>
        <Image source={{ uri: product.image }} style={styles.image} />
        <Pressable
          style={styles.heartBtn}
          onPress={() => toggleWishlist(product.id)}
          hitSlop={12}
        >
          <Ionicons
            name={saved ? 'heart' : 'heart-outline'}
            size={20}
            color={saved ? colors.black : colors.white}
          />
        </Pressable>
      </View>
      <Text style={styles.name} numberOfLines={2}>
        {product.name}
      </Text>
      <Text style={styles.price}>${product.price}</Text>
      <Pressable
        style={styles.addBtn}
        onPress={() => addToCart(product.id, 1)}
      >
        <Text style={styles.addText}>Add to bag</Text>
      </Pressable>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    minWidth: '46%',
    maxWidth: '48%',
    marginBottom: spacing.lg,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    paddingBottom: spacing.sm,
  },
  imageWrap: {
    position: 'relative',
    aspectRatio: 3 / 4,
    backgroundColor: colors.border,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  heartBtn: {
    position: 'absolute',
    top: spacing.sm,
    right: spacing.sm,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.9)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    ...typography.body,
    color: colors.text,
    marginTop: spacing.sm,
    marginHorizontal: spacing.sm,
    minHeight: 40,
  },
  price: {
    ...typography.price,
    color: colors.black,
    marginHorizontal: spacing.sm,
    marginTop: 4,
  },
  addBtn: {
    marginTop: spacing.sm,
    marginHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderWidth: 1,
    borderColor: colors.black,
    alignItems: 'center',
  },
  addText: {
    fontSize: 11,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    color: colors.black,
  },
});
