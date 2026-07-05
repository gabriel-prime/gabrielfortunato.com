import type { JSX } from 'solid-js'

/*
 * Small stroke-based glyph set for the board. Every icon inherits `currentColor`
 * and a shared 1.5 stroke, so a parent just sets `color` and size.
 */

export type IconName =
  | 'layout'
  | 'server'
  | 'cloud'
  | 'layers'
  | 'cart'
  | 'bolt'
  | 'chip'

type IconProps = { readonly size?: number } & JSX.SvgSVGAttributes<SVGSVGElement>

function Svg(props: IconProps & { children: JSX.Element }) {
  const { size = 16, children, ...rest } = props
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
      {...rest}
    >
      {children}
    </svg>
  )
}

const paths: Record<IconName, JSX.Element> = {
  layout: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="2.5" />
      <path d="M3 9h18M9 21V9" />
    </>
  ),
  server: (
    <>
      <rect x="3" y="4" width="18" height="7" rx="2" />
      <rect x="3" y="13" width="18" height="7" rx="2" />
      <path d="M7 7.5h.01M7 16.5h.01" />
    </>
  ),
  cloud: (
    <>
      <path d="M7 18a4 4 0 0 1 .5-7.97 5.5 5.5 0 0 1 10.5 1.6A3.5 3.5 0 0 1 17 18z" />
      <path d="M12 21v-6M9.5 17.5 12 15l2.5 2.5" />
    </>
  ),
  layers: (
    <>
      <path d="M12 3 3 7.5l9 4.5 9-4.5z" />
      <path d="M3 12l9 4.5L21 12M3 16.5 12 21l9-4.5" />
    </>
  ),
  cart: (
    <>
      <circle cx="9" cy="20" r="1.4" />
      <circle cx="18" cy="20" r="1.4" />
      <path d="M2.5 3.5h2.2l2 11.5h11l1.8-8H6.6" />
    </>
  ),
  bolt: <path d="M13 2 4 14h6l-1 8 9-12h-6z" />,
  chip: (
    <>
      <rect x="6" y="6" width="12" height="12" rx="2.5" />
      <path d="M10 2.5v3M14 2.5v3M10 18.5v3M14 18.5v3M2.5 10h3M2.5 14h3M18.5 10h3M18.5 14h3" />
    </>
  ),
}

export default function Icon(props: IconProps & { name: IconName }) {
  const { name, ...rest } = props
  return <Svg {...rest}>{paths[name]}</Svg>
}
