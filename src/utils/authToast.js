import Toast from 'react-native-toast-message';

export function showAuthValidationToast() {
  Toast.show({
    type: 'validation',
    text1: 'Missing fields',
    text2: 'Please fill in all fields to continue.',
    position: 'top',
    visibilityTime: 2500,
    topOffset: 56,
  });
}

export function showPasswordMismatchToast() {
  Toast.show({
    type: 'validation',
    text1: 'Passwords do not match',
    text2: 'Make sure both password fields are the same.',
    position: 'top',
    visibilityTime: 2500,
    topOffset: 56,
  });
}

export function showPasswordLengthToast() {
  Toast.show({
    type: 'validation',
    text1: '8-digit password',
    text2: 'Enter exactly 8 numbers for your password.',
    position: 'top',
    visibilityTime: 2500,
    topOffset: 56,
  });
}
