import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, typography } from '../../constants/theme';

export function Logo({ size = 'md' }) {
  const small = size === 'sm';
  return (
    <View style={styles.row}>
      <Text style={[styles.open, small && styles.small]}>OPEN</Text>
      <View style={[styles.divider, small && styles.dividerSmall]} />
      <Text style={[styles.fashion, small && styles.small]}>FASHION</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  open: {
    ...typography.logo,
    fontSize: 20,
    color: colors.black,
  },
  fashion: {
    ...typography.logo,
    fontSize: 20,
    color: colors.black,
    fontWeight: '500',
  },
  small: {
    fontSize: 15,
  },
  divider: {
    width: 1,
    height: 18,
    backgroundColor: colors.beigeDark,
    marginHorizontal: 10,
  },
  dividerSmall: {
    height: 14,
    marginHorizontal: 8,
  },
});
