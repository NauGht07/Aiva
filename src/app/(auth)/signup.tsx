import { FormTextInput } from '@/components/form-text-input';
import { PrimaryButton } from '@/components/primary-button';
import { useThemedStyles } from '@/hooks/use-themed-styles';
import { supabase } from '@/lib/supabase';
import { createAuthScreenStyles } from '@/styles/auth-screen';
import { router, type Href } from 'expo-router';
import React, { useCallback, useMemo, useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, Text, View } from 'react-native';

export default function SignupScreen() {
  const styles = useThemedStyles(createAuthScreenStyles);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const canSubmit = useMemo(() => {
    return (
      email.trim().length > 0 &&
      password.length > 0 &&
      confirmPassword.length > 0 &&
      !submitting
    );
  }, [email, password, confirmPassword, submitting]);

  const onSignup = useCallback(async () => {
    if (submitting) return;

    setError(null);

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setSubmitting(true);

    try {
      const { error: signUpError } = await supabase.auth.signUp({
        email: email.trim(),
        password,
      });

      if (signUpError) {
        setError(signUpError.message);
        return;
      }

      router.replace('/(app)/onboarding' as Href);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Something went wrong');
    } finally {
      setSubmitting(false);
    }
  }, [email, password, confirmPassword, submitting]);

  const onGoToLogin = useCallback(() => {
    router.push('/(auth)/login' as Href);
  }, []);

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <View style={styles.container}>
        <Text style={styles.title}>Sign up</Text>

        <FormTextInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          placeholder="you@example.com"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          autoComplete="email"
          textContentType="emailAddress"
          editable={!submitting}
        />

        <FormTextInput
          label="Password"
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
          secureTextEntry
          autoCapitalize="none"
          autoCorrect={false}
          autoComplete="new-password"
          textContentType="newPassword"
          editable={!submitting}
        />

        <FormTextInput
          label="Confirm password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          placeholder="Confirm password"
          secureTextEntry
          autoCapitalize="none"
          autoCorrect={false}
          autoComplete="new-password"
          textContentType="newPassword"
          editable={!submitting}
        />

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <PrimaryButton title="Sign up" onPress={onSignup} disabled={!canSubmit} loading={submitting} />

        <Pressable onPress={onGoToLogin} style={styles.linkButton} disabled={submitting}>
          <Text style={styles.linkText}>Already have an account? Log in</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}
