import { Typography, type Theme } from '@/constants/theme';
import { useThemedStyles } from '@/hooks/use-themed-styles';
import React from 'react';
import { StyleSheet, Text, TextInput, type TextInputProps, View } from 'react-native';

export type FormTextInputProps = Omit<TextInputProps, 'style'> & {
  label?: string;
  error?: string | null;
};

export function FormTextInput({ label, error, ...inputProps }: FormTextInputProps) {
  const styles = useThemedStyles(createStyles);

  return (
    <View style={styles.wrapper}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <TextInput
        {...inputProps}
        style={[styles.input, error ? styles.inputError : null]}
        placeholderTextColor={styles.placeholder.color}
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
}

function createStyles(theme: Theme) {
  return StyleSheet.create({
    wrapper: {
      width: '100%',
      gap: 6,
    },
    label: {
      fontSize: Typography.label,
      fontWeight: '600',
      color: theme.text,
    },
    input: {
      borderWidth: 1,
      borderColor: theme.border,
      borderRadius: 8,
      paddingHorizontal: 12,
      paddingVertical: 10,
      fontSize: Typography.body,
      color: theme.text,
      backgroundColor: theme.inputBackground,
    },
    inputError: {
      borderColor: theme.borderError,
    },
    placeholder: {
      color: theme.placeholder,
    },
    errorText: {
      color: theme.error,
      fontSize: Typography.caption,
    },
  });
}
