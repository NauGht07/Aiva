import { type Theme } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { useMemo } from 'react';

/**
 * Build StyleSheets from the active theme. Recomputes when light/dark changes.
 *
 * @example
 * const styles = useThemedStyles((theme) =>
 *   StyleSheet.create({
 *     screen: { flex: 1, backgroundColor: theme.background },
 *   }),
 * );
 */
export function useThemedStyles<T>(factory: (theme: Theme) => T): T {
  const theme = useTheme();
  return useMemo(() => factory(theme), [theme]);
}
