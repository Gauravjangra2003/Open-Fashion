/** Required length for numeric password fields (sign in / sign up). */
export const PASSWORD_DIGIT_LENGTH = 8;

/** Keep only ASCII digits 0–9 (e.g. numeric passwords). */
export function digitsOnly(text) {
  return text.replace(/\D/g, '');
}
