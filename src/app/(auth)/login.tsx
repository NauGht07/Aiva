import { FormTextInput } from '@/components/form-text-input';
import { PrimaryButton } from '@/components/primary-button';
import { useThemedStyles } from '@/hooks/use-themed-styles';
import { supabase } from '@/lib/supabase';
import { createAuthScreenStyles } from '@/styles/auth-screen';
import { router, type Href } from 'expo-router';
import React, { useCallback, useMemo, useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, Text, View } from 'react-native';

export default function LoginScreen() {
  const styles = useThemedStyles(createAuthScreenStyles);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const canSubmit = useMemo(() => {
    return email.trim().length > 0 && password.length > 0 && !submitting;
  }, [email, password, submitting]);

  const onLogin = useCallback(async () => {
    if (submitting) return;

    setError(null);
    setSubmitting(true);

    try {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (signInError) {
        setError(signInError.message);
        return;
      }

      router.replace('/(app)/home' as Href);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Something went wrong');
    } finally {
      setSubmitting(false);
    }
  }, [email, password, submitting]);

  const onGoToSignup = useCallback(() => {
    router.push('/(auth)/signup' as Href);
  }, []);

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <View style={styles.container}>
        <Text style={styles.title}>Login</Text>

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
          autoComplete="password"
          textContentType="password"
          editable={!submitting}
        />

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <PrimaryButton title="Login" onPress={onLogin} disabled={!canSubmit} loading={submitting} />

        <Pressable onPress={onGoToSignup} style={styles.linkButton} disabled={submitting}>
          <Text style={styles.linkText}>Don&apos;t have an account? Sign up</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}
