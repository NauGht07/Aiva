import { Spacing, Typography, type Theme } from '@/constants/theme';
import { StyleSheet } from 'react-native';

export function createAuthScreenStyles(theme: Theme) {
  return StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: theme.background,
    },
    container: {
      flex: 1,
      padding: Spacing.three,
      gap: Spacing.two + Spacing.half,
      justifyContent: 'center',
    },
    title: {
      fontSize: Typography.title,
      fontWeight: '700',
      marginBottom: Spacing.two,
      color: theme.text,
    },
    errorText: {
      color: theme.error,
      fontSize: Typography.link,
    },
    linkButton: {
      paddingVertical: Spacing.two,
      alignSelf: 'flex-start',
    },
    linkText: {
      fontSize: Typography.link,
      color: theme.link,
      textDecorationLine: 'underline',
    },
  });
}
