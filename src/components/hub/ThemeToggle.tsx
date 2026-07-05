import { useTheme } from '../../lib/theme'
import styles from './ThemeToggle.module.css'

/** Neumorphic light/dark switch. The knob slides; icons cross-fade. */
export default function ThemeToggle() {
  const { theme, toggle } = useTheme()
  const isDark = () => theme() === 'dark'

  return (
    <button
      type="button"
      class={styles.toggle}
      data-dark={isDark() ? '' : undefined}
      role="switch"
      aria-checked={isDark()}
      aria-label={isDark() ? 'Ativar modo claro' : 'Ativar modo escuro'}
      onClick={toggle}
    >
      <svg class={styles.icon} data-icon="sun" viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="4.2" />
        <path d="M12 2.5v3M12 18.5v3M4.2 4.2l2 2M17.8 17.8l2 2M2.5 12h3M18.5 12h3M4.2 19.8l2-2M17.8 6.2l2-2" />
      </svg>
      <svg class={styles.icon} data-icon="moon" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M20 14.5A8 8 0 1 1 9.5 4a6.3 6.3 0 0 0 10.5 10.5z" />
      </svg>
      <span class={styles.knob} />
    </button>
  )
}
