// Small line icons, drawn in the current text colour.
const base = {
  width: 22,
  height: 22,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.4,
  "aria-hidden": true,
} as const;

export const MenuIcon = () => (
  <svg {...base}>
    <path d="M3 7.5h18M3 16.5h18" />
  </svg>
);

export const CloseIcon = () => (
  <svg {...base}>
    <path d="M5 5l14 14M19 5L5 19" />
  </svg>
);

export const BagIcon = () => (
  <svg {...base}>
    <path d="M5 8.5h14v11.5H5z" />
    <path d="M9 8.5V7a3 3 0 0 1 6 0v1.5" />
  </svg>
);

export const ChevronIcon = ({ className = "" }: { className?: string }) => (
  <svg {...base} width={16} height={16} className={className}>
    <path d="M5 9l7 7 7-7" />
  </svg>
);
