import { PrimaryButton } from '@/components/primary-button';
import { useTheme, useThemeScheme } from '@/hooks/use-theme';
import { useThemedStyles } from '@/hooks/use-themed-styles';
import { createOnboardingScreenStyles } from '@/styles/onboarding-screen';
import DateTimePicker, { type DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { router, type Href } from 'expo-router';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Text,
  TextInput,
  View,
} from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

const STEP_COUNT = 4;

function restateHabit(raw: string) {
  let text = raw.trim().replace(/[.!?]+$/, '');
  text = text.replace(
    /^(to\s+|i want to\s+|i've been meaning to\s+|i need to\s+|i should\s+)/i,
    '',
  );
  return text.toLowerCase();
}

function defaultCheckInTime() {
  const date = new Date();
  date.setHours(9, 0, 0, 0);
  return date;
}

export default function OnboardingScreen() {
  const theme = useTheme();
  const scheme = useThemeScheme();
  const styles = useThemedStyles(createOnboardingScreenStyles);
  const nameInputRef = useRef<TextInput>(null);
  const habitInputRef = useRef<TextInput>(null);

  const [step, setStep] = useState(0);
  const [name, setName] = useState('');
  const [habit, setHabit] = useState('');
  const [checkInTime, setCheckInTime] = useState(defaultCheckInTime);
  const [finishing, setFinishing] = useState(false);

  const trimmedName = name.trim();
  const trimmedHabit = habit.trim();

  const inputStyle = useMemo(
    () => [styles.textInput, { borderBottomColor: theme.border }],
    [styles.textInput, theme.border],
  );

  const inputTextStyle = useMemo(
    () => [styles.textInputText, { color: theme.text }],
    [styles.textInputText, theme.text],
  );

  const message = useMemo(() => {
    switch (step) {
      case 0:
        return "hey, I'm Aiva. I'm here to help you actually follow through on the things you keep putting off. what's your name?";
      case 1:
        return `good to meet you ${trimmedName}. what's one thing you've been meaning to build into your routine but keep failing at?`;
      case 2:
        return `got it. sounds like you want to ${restateHabit(trimmedHabit)}. want me to add that as your first habit?`;
      case 3:
        return 'when do you want me to check in with you about this?';
      default:
        return '';
    }
  }, [step, trimmedName, trimmedHabit]);

  useEffect(() => {
    if (step === 0) {
      nameInputRef.current?.focus();
    } else if (step === 1) {
      habitInputRef.current?.focus();
    } else {
      Keyboard.dismiss();
    }
  }, [step]);

  const goToNextStep = useCallback(() => {
    setStep((current) => Math.min(current + 1, STEP_COUNT - 1));
  }, []);

  const onFinish = useCallback(() => {
    if (finishing) return;
    setFinishing(true);
    router.replace('/(app)/home' as Href);
  }, [finishing]);

  const onTimeChange = useCallback((_event: DateTimePickerEvent, selectedDate?: Date) => {
    if (selectedDate) {
      setCheckInTime(selectedDate);
    }
  }, []);

  const canContinue =
    (step === 0 && trimmedName.length > 0) ||
    (step === 1 && trimmedHabit.length > 0) ||
    step === 2 ||
    step === 3;

  return (
    <SafeAreaView style={styles.screen}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View style={styles.content}>
          <View style={styles.progressRow}>
            {Array.from({ length: STEP_COUNT }, (_, index) => (
              <View
                key={index}
                style={[styles.progressDot, index <= step ? styles.progressDotActive : null]}
              />
            ))}
          </View>

          <Animated.View entering={FadeInDown.duration(350)} style={styles.messageBlock} key={step}>
            <Text style={styles.message}>{message}</Text>
          </Animated.View>

          <View style={styles.inputBlock}>
            {step === 0 ? (
              <TextInput
                ref={nameInputRef}
                value={name}
                onChangeText={setName}
                placeholder="Your name"
                placeholderTextColor={theme.placeholder}
                autoCapitalize="words"
                autoCorrect={false}
                returnKeyType="next"
                onSubmitEditing={() => {
                  if (trimmedName.length > 0) goToNextStep();
                }}
                style={[...inputStyle, ...inputTextStyle]}
              />
            ) : null}

            {step === 1 ? (
              <TextInput
                ref={habitInputRef}
                value={habit}
                onChangeText={setHabit}
                placeholder="e.g. meditate for 10 minutes"
                placeholderTextColor={theme.placeholder}
                autoCapitalize="sentences"
                multiline
                blurOnSubmit={false}
                style={[...inputStyle, ...inputTextStyle, styles.textInputMultiline]}
              />
            ) : null}

            {step === 2 ? (
              <>
                <PrimaryButton title="Yes, add it" onPress={goToNextStep} />
                <Pressable onPress={() => setStep(1)} style={styles.backLink}>
                  <Text style={styles.backLinkText}>Let me change that</Text>
                </Pressable>
              </>
            ) : null}

            {step === 3 ? (
              <>
                <View style={styles.timeWheelWrap}>
                  <DateTimePicker
                    value={checkInTime}
                    mode="time"
                    display="spinner"
                    is24Hour={false}
                    themeVariant={scheme}
                    accentColor={theme.primary}
                    onChange={onTimeChange}
                    style={styles.timeWheel}
                  />
                </View>
                <PrimaryButton title="Done" onPress={onFinish} disabled={!canContinue} loading={finishing} />
              </>
            ) : null}

            {step < 2 ? (
              <PrimaryButton title="Continue" onPress={goToNextStep} disabled={!canContinue} />
            ) : null}
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
