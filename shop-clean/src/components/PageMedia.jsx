/** Inline SVGs — icons and hero art (no external image assets). */

const S = {
  stroke: 'currentColor',
  fill: 'none',
  strokeWidth: 1.65,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

export function Icon({ size = 20, className, children, title }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      aria-hidden={title ? undefined : true}
      role={title ? 'img' : undefined}
    >
      {title ? <title>{title}</title> : null}
      {children}
    </svg>
  )
}

export function IconCloset(props) {
  return (
    <Icon {...props}>
      <path {...S} d="M4 8h16v12H4z M4 8l8-4 8 4 M9 8v12 M15 8v12" />
      <path {...S} d="M10 14h4" strokeWidth={1.4} />
    </Icon>
  )
}

export function IconShirt(props) {
  return (
    <Icon {...props}>
      <path {...S} d="M6 4l3 3h6l3-3v4l-2 1v11H8V9L6 8V4z M9 7h6" />
    </Icon>
  )
}

export function IconLeaf(props) {
  return (
    <Icon {...props}>
      <path {...S} d="M12 3c-6 3-7 9-4 14 1.5 2.5 4 3 4 3s2.5-.5 4-3c3-5 2-11-4-14z" />
      <path {...S} d="M12 20V10" />
    </Icon>
  )
}

export function IconBars(props) {
  return (
    <Icon {...props}>
      <path {...S} d="M4 19V5 M10 19v-6 M16 19v-3 M22 19V9" />
    </Icon>
  )
}

export function IconRecycle(props) {
  return (
    <Icon {...props}>
      <path {...S} d="M19 13l-2 3h-3 M5 13l2 3h3 M8.5 7.5L12 3l2 3 M15.5 16.5L12 21l-2-3" />
      <path {...S} d="M12 3v4 M12 17v4" />
    </Icon>
  )
}

export function IconPie(props) {
  return (
    <Icon {...props}>
      <circle {...S} cx="12" cy="12" r="9" />
      <path {...S} d="M12 3v9l7.2 4.2" />
    </Icon>
  )
}

export function IconFabric(props) {
  return (
    <Icon {...props}>
      <path {...S} d="M4 6c2 0 4-2 8-2s6 2 8 2v12c-2 0-4 2-8 2s-6-2-8-2V6z" />
      <path {...S} d="M4 10c2.5 1 5.5 1 8 0s5.5-1 8 0 M4 14c2.5 1 5.5 1 8 0s5.5-1 8 0" strokeWidth={1.25} />
    </Icon>
  )
}

export function IconTag(props) {
  return (
    <Icon {...props}>
      <path {...S} d="M4 10V6a2 2 0 012-2h4l10 10-6 6L4 10z" />
      <circle cx="8.5" cy="6.5" r="1" fill="currentColor" strokeWidth={0} />
    </Icon>
  )
}

export function IconLayers(props) {
  return (
    <Icon {...props}>
      <path {...S} d="M12 3L2 8l10 5 10-5-10-5z M2 13l10 5 10-5 M2 18l10 5 10-5" />
    </Icon>
  )
}

export function IconScale(props) {
  return (
    <Icon {...props}>
      <path {...S} d="M12 3v18 M5 21h14 M8 7l4-4 4 4" />
      <path {...S} d="M9 14h6M9 17h4" strokeWidth={1.3} />
    </Icon>
  )
}

export function IconStore(props) {
  return (
    <Icon {...props}>
      <path {...S} d="M4 10V20h16V10 M4 10l2-6h12l2 6 M9 14h6v6H9z" />
    </Icon>
  )
}

export function IconHanger(props) {
  return (
    <Icon {...props}>
      <path {...S} d="M12 5a2 2 0 100-4 2 2 0 000 4z M12 5v3l9 7H3l9-7V5z" />
    </Icon>
  )
}

export function IconPlus(props) {
  return (
    <Icon {...props}>
      <path {...S} d="M12 5v14M5 12h14" />
    </Icon>
  )
}

export function IllustrationLogHero() {
  return (
    <svg viewBox="0 0 200 160" className="page-hero__svg" aria-hidden="true">
      <rect x="8" y="8" width="184" height="144" rx="8" fill="#fff" stroke="#d4c5a9" strokeWidth="1.5" />
      <path
        d="M100 28c-8 0-14 6-14 14v6l-28 22h84l-28-22v-6c0-8-6-14-14-14z"
        fill="#e6f0e6"
        stroke="#3a5c3a"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M70 118h60" stroke="#3a5c3a" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="100" cy="132" r="4" fill="#d4c5a9" />
      <path
        d="M44 102c12-18 32-28 52-28s40 10 52 28"
        fill="none"
        stroke="#7a9e7e"
        strokeWidth="1.25"
        strokeLinecap="round"
        opacity="0.85"
      />
      <ellipse cx="156" cy="48" rx="22" ry="12" fill="#f5f0e8" stroke="#3a5c3a" strokeWidth="1.2" />
      <path
        d="M148 44c4-6 12-6 16 0M152 50h12"
        stroke="#3a5c3a"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function IllustrationClosetHero() {
  return (
    <svg viewBox="0 0 200 160" className="page-hero__svg" aria-hidden="true">
      <rect x="8" y="8" width="184" height="144" rx="8" fill="#fff" stroke="#d4c5a9" strokeWidth="1.5" />
      <rect x="36" y="32" width="88" height="96" rx="4" fill="#f5f0e8" stroke="#3a5c3a" strokeWidth="1.5" />
      <line x1="80" y1="32" x2="80" y2="128" stroke="#d4c5a9" strokeWidth="1.5" />
      <rect x="48" y="48" width="20" height="36" rx="2" fill="#e6f0e6" stroke="#3a5c3a" strokeWidth="1.2" />
      <rect x="76" y="56" width="20" height="44" rx="2" fill="#d4c5a9" stroke="#3a5c3a" strokeWidth="1.2" opacity="0.9" />
      <rect x="104" y="52" width="16" height="40" rx="2" fill="#e6f0e6" stroke="#3a5c3a" strokeWidth="1.2" />
      <g transform="translate(136 40)">
        <circle r="36" fill="#fff" stroke="#d4c5a9" strokeWidth="1.5" />
        <path
          d="M0-22A22 22 0 0120 8L0 8Z"
          fill="#3a5c3a"
          opacity="0.85"
        />
        <path
          d="M0-22A22 22 0 00-20 8L0 8Z"
          fill="#d4c5a9"
        />
        <circle r="10" fill="#fff" stroke="#3a5c3a" strokeWidth="1.2" />
      </g>
    </svg>
  )
}
