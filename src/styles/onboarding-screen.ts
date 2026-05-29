import { MaxContentWidth, Spacing, Typography, type Theme } from '@/constants/theme';
import { Platform, StyleSheet } from 'react-native';

export function createOnboardingScreenStyles(theme: Theme) {
  return StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: theme.background,
    },
    keyboardView: {
      flex: 1,
    },
    content: {
      flex: 1,
      paddingHorizontal: Spacing.three,
      paddingTop: Spacing.three,
      paddingBottom: Spacing.four,
      maxWidth: MaxContentWidth,
      width: '100%',
      alignSelf: 'center',
      justifyContent: 'space-between',
    },
    progressRow: {
      flexDirection: 'row',
      gap: Spacing.two,
      justifyContent: 'center',
      paddingVertical: Spacing.two,
    },
    progressDot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: theme.backgroundElement,
    },
    progressDotActive: {
      backgroundColor: theme.primary,
    },
    messageBlock: {
      flex: 1,
      justifyContent: 'center',
      paddingVertical: Spacing.four,
    },
    message: {
      fontSize: Typography.title,
      lineHeight: 32,
      fontWeight: '600',
      color: theme.text,
    },
    inputBlock: {
      gap: Spacing.three,
      paddingBottom: Spacing.two,
    },
    textInput: {
      borderWidth: 0,
      borderBottomWidth: 2,
      borderRadius: 0,
      paddingHorizontal: 0,
      paddingVertical: Spacing.two,
      backgroundColor: 'transparent',
    },
    textInputText: {
      fontSize: Typography.title,
      lineHeight: 30,
      fontWeight: '500',
    },
    textInputMultiline: {
      minHeight: 72,
      textAlignVertical: 'top',
    },
    timeWheelWrap: {
      width: '100%',
      alignItems: 'stretch',
    },
    timeWheel: {
      width: '100%',
      height: Platform.OS === 'ios' ? 216 : 200,
    },
    backLink: {
      alignSelf: 'center',
      paddingVertical: Spacing.two,
    },
    backLinkText: {
      fontSize: Typography.link,
      color: theme.link,
    },
  });
}
