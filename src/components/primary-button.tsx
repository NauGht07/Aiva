import { Typography, type Theme } from '@/constants/theme';
import { useThemedStyles } from '@/hooks/use-themed-styles';
import React from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';

export type PrimaryButtonProps = {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  testID?: string;
};

export function PrimaryButton({ title, onPress, disabled, loading, testID }: PrimaryButtonProps) {
  const styles = useThemedStyles(createStyles);
  const isDisabled = Boolean(disabled || loading);

  return (
    <Pressable
      testID={testID}
      accessibilityRole="button"
      onPress={onPress}
      disabled={isDisabled}
      style={({ pressed }) => [
        styles.button,
        pressed ? styles.buttonPressed : null,
        isDisabled ? styles.buttonDisabled : null,
      ]}>
      <View style={styles.content}>
        {loading ? <ActivityIndicator color={styles.activity.color} /> : null}
        <Text style={styles.title}>{title}</Text>
      </View>
    </Pressable>
  );
}

function createStyles(theme: Theme) {
  return StyleSheet.create({
    button: {
      width: '100%',
      borderRadius: 8,
      paddingVertical: 12,
      paddingHorizontal: 12,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
      borderColor: theme.buttonBorder,
      backgroundColor: theme.buttonBackground,
    },
    buttonPressed: {
      opacity: 0.7,
    },
    buttonDisabled: {
      opacity: 0.5,
    },
    content: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    title: {
      fontSize: Typography.body,
      fontWeight: '600',
      color: theme.buttonText,
    },
    activity: {
      color: theme.buttonText,
    },
  });
}
