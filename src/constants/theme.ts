/**
 * Theme hub — change colors, spacing, and typography here.
 *
 * React Native: `useTheme()` from `@/hooks/use-theme`
 * Themed StyleSheets: `useThemedStyles()` from `@/hooks/use-themed-styles`
 * Web CSS variables: keep `src/global.css` in sync with `Themes` below
 */

import '@/global.css';

import { Platform } from 'react-native';

/** Color tokens per appearance. Add keys here, then use via `useTheme()`. */
export const Themes = {
  light: {
    text: '#1a231c',
    textSecondary: '#4f5f52',
    background: '#f0f3ee',
    backgroundElement: '#e4e9e0',
    backgroundSelected: '#d5ddd2',
    border: '#b8c4b8',
    borderError: '#b85c4a',
    error: '#a34d3d',
    link: '#4a7c59',
    placeholder: '#7a8a7c',
    buttonBackground: '#5a8f66',
    buttonBorder: '#4a7c59',
    buttonText: '#f5f8f4',
    primary: '#4a7c59',
    inputBackground: '#fafbf9',
  },
  dark: {
    text: '#e6ebe3',
    textSecondary: '#9fad9a',
    background: '#121814',
    backgroundElement: '#1c231e',
    backgroundSelected: '#273028',
    border: '#3a4a3e',
    borderError: '#c9826a',
    error: '#d99584',
    link: '#8fbc7a',
    placeholder: '#6d7d6f',
    buttonBackground: '#4a6b52',
    buttonBorder: '#6b9472',
    buttonText: '#f0f4ef',
    primary: '#7daa6e',
    inputBackground: '#1a211c',
  },
} as const;

export type ThemeScheme = keyof typeof Themes;
export type Theme = (typeof Themes)[ThemeScheme];
export type ThemeColor = keyof Theme;

/** `'system'` follows OS appearance; `'dark'` | `'light'` lock the app to one scheme. */
export const ThemePreference: ThemeScheme | 'system' = 'dark';

/** @deprecated Prefer `Themes` — kept for existing imports */
export const Colors = Themes;

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;

export const Radii = {
  sm: 8,
  md: 12,
  lg: 16,
} as const;

export const Typography = {
  title: 24,
  subtitle: 32,
  body: 16,
  label: 14,
  caption: 13,
  link: 14,
} as const;

export const Fonts = Platform.select({
  ios: {
    sans: 'system-ui',
    serif: 'ui-serif',
    rounded: 'ui-rounded',
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: 'var(--font-display)',
    serif: 'var(--font-serif)',
    rounded: 'var(--font-rounded)',
    mono: 'var(--font-mono)',
  },
});

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 800;
