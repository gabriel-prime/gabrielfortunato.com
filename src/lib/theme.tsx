import {
  createContext,
  createEffect,
  createSignal,
  onCleanup,
  onMount,
  useContext,
  type JSX,
} from 'solid-js'
import { isServer } from 'solid-js/web'

export type Theme = 'light' | 'dark'

const STORAGE_KEY = 'gf-theme'

type ThemeContextValue = {
  readonly theme: () => Theme
  readonly setTheme: (theme: Theme) => void
  readonly toggle: () => void
  /** True while the user has not made an explicit choice (still following the OS). */
  readonly isSystem: () => boolean
}

const ThemeContext = createContext<ThemeContextValue>()

/** Read the persisted theme, or fall back to the OS preference. */
function readInitialTheme(): { theme: Theme; fromSystem: boolean } {
  if (isServer) return { theme: 'light', fromSystem: true }

  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored === 'light' || stored === 'dark') {
    return { theme: stored, fromSystem: false }
  }

  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  return { theme: prefersDark ? 'dark' : 'light', fromSystem: true }
}

export function ThemeProvider(props: { children: JSX.Element }) {
  const initial = readInitialTheme()
  const [theme, setThemeSignal] = createSignal<Theme>(initial.theme)
  const [isSystem, setIsSystem] = createSignal(initial.fromSystem)

  // Reflect the current theme onto <html> so tokens.css can resolve.
  createEffect(() => {
    if (isServer) return
    document.documentElement.dataset.theme = theme()
  })

  const setTheme = (next: Theme) => {
    setIsSystem(false)
    setThemeSignal(next)
    if (!isServer) localStorage.setItem(STORAGE_KEY, next)
  }

  const toggle = () => setTheme(theme() === 'dark' ? 'light' : 'dark')

  // While the user still follows the OS, keep tracking it live.
  onMount(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)')
    const onChange = (event: MediaQueryListEvent) => {
      if (isSystem()) setThemeSignal(event.matches ? 'dark' : 'light')
    }
    media.addEventListener('change', onChange)
    onCleanup(() => media.removeEventListener('change', onChange))
  })

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggle, isSystem }}>
      {props.children}
    </ThemeContext.Provider>
  )
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within a <ThemeProvider>')
  return ctx
}
