import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Toast from 'react-native-toast-message';
import { colors, spacing, typography } from '../../constants/theme';
import { useStore } from '../../context/StoreContext';
import { productImageSource } from '../../utils/imageSource';

export function ProductCard({ product, onPress }) {
  const { cart, toggleWishlist, isInWishlist, addToCart } = useStore();
  const saved = isInWishlist(product.id);
  const handleAddToBag = () => {
    const line = cart.find((l) => l.productId === product.id);
    const nextQty = (line?.quantity ?? 0) + 1;
    addToCart(product.id, 1);
    Toast.show({
      type: 'success',
      text1: 'Added to bag',
      text2: `${product.name} · Quantity: ${nextQty}`,
      position: 'bottom',
      visibilityTime: 2000,
    });
  };

  return (
    <Pressable style={styles.card} onPress={() => onPress?.(product)}>
      <View style={styles.imageWrap}>
        <Image
          source={productImageSource(product.image)}
          style={styles.image}
          resizeMode="contain"
        />
        <Pressable
          style={styles.heartBtn}
          onPress={() => toggleWishlist(product.id)}
          hitSlop={12}
        >
          <Ionicons
            name={saved ? 'heart' : 'heart-outline'}
            size={22}
            color={colors.black}
          />
        </Pressable>
      </View>
      <Text style={styles.name} numberOfLines={2}>
        {product.name}
      </Text>
      <Text style={styles.price}>${product.price}</Text>
      <Pressable
        style={styles.addBtn}
        onPress={handleAddToBag}
      >
        <Text style={styles.addText}>Add to bag</Text>
      </Pressable>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    flexBasis: 0,
    minWidth: 0,
    marginHorizontal: spacing.xs,
    marginBottom: spacing.lg,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    paddingBottom: spacing.sm,
  },
  imageWrap: {
    position: 'relative',
    aspectRatio: 3 / 4,
    backgroundColor: colors.white,
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
