import { ThemePreference, Themes, type Theme, type ThemeScheme } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export function useThemeScheme(): ThemeScheme {
  if (ThemePreference !== 'system') {
    return ThemePreference;
  }

  const scheme = useColorScheme();
  return scheme === 'dark' ? 'dark' : 'light';
}

export function useTheme(): Theme {
  return Themes[useThemeScheme()];
}
