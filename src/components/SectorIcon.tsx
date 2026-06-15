import type { ReactElement } from "react";

interface IconProps {
  className?: string;
}

const iconProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

function AiIcon({ className }: IconProps) {
  return (
    <svg {...iconProps} className={className}>
      <rect x="7" y="7" width="10" height="10" rx="1.5" />
      <circle cx="12" cy="12" r="2" />
      <path d="M9 7V4M15 7V4M9 20v-3M15 20v-3M7 9H4M7 15H4M20 9h-3M20 15h-3" />
    </svg>
  );
}

function FintechIcon({ className }: IconProps) {
  return (
    <svg {...iconProps} className={className}>
      <rect x="3" y="6" width="18" height="12" rx="2" />
      <circle cx="12" cy="12" r="2.5" />
      <path d="M6.5 12h.01M17.5 12h.01" />
    </svg>
  );
}

function SaasIcon({ className }: IconProps) {
  return (
    <svg {...iconProps} className={className}>
      <path d="M7 18a4 4 0 0 1-.6-7.96 5.5 5.5 0 0 1 10.6-1.04A4.5 4.5 0 0 1 16.5 18H7z" />
    </svg>
  );
}

function ConsumerIcon({ className }: IconProps) {
  return (
    <svg {...iconProps} className={className}>
      <path d="M6 8h12l-1 12H7L6 8z" />
      <path d="M9 8V6a3 3 0 0 1 6 0v2" />
    </svg>
  );
}

function DeepTechIcon({ className }: IconProps) {
  return (
    <svg {...iconProps} className={className}>
      <circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none" />
      <ellipse cx="12" cy="12" rx="9" ry="3.5" />
      <ellipse cx="12" cy="12" rx="9" ry="3.5" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="9" ry="3.5" transform="rotate(120 12 12)" />
    </svg>
  );
}

function HealthIcon({ className }: IconProps) {
  return (
    <svg {...iconProps} className={className}>
      <path d="M3 12h4l2-6 4 12 2-6h6" />
    </svg>
  );
}

function ClimateIcon({ className }: IconProps) {
  return (
    <svg {...iconProps} className={className}>
      <path d="M5 21c0-9 6-15 15-15-1 9-6 15-15 15z" />
      <path d="M5 21c3-3 6-6 9-9" />
    </svg>
  );
}

function CryptoIcon({ className }: IconProps) {
  return (
    <svg {...iconProps} className={className}>
      <path d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3z" />
      <path d="M12 9l3 3-3 3-3-3 3-3z" />
    </svg>
  );
}

function GamingIcon({ className }: IconProps) {
  return (
    <svg {...iconProps} className={className}>
      <rect x="2.5" y="8" width="19" height="9" rx="4" />
      <path d="M7.5 11v3M6 12.5h3" />
      <path d="M16 11h.01M18 13h.01" />
    </svg>
  );
}

function TagIcon({ className }: IconProps) {
  return (
    <svg {...iconProps} className={className}>
      <path d="M11 3h6a2 2 0 0 1 2 2v6l-9 9-8-8 9-9z" />
      <path d="M16 7h.01" />
    </svg>
  );
}

const SECTOR_ICONS: Record<string, (props: IconProps) => ReactElement> = {
  "ai/ml": AiIcon,
  fintech: FintechIcon,
  saas: SaasIcon,
  consumer: ConsumerIcon,
  "deep tech": DeepTechIcon,
  health: HealthIcon,
  climate: ClimateIcon,
  crypto: CryptoIcon,
  gaming: GamingIcon,
};

/** Used to pick an icon for free-text sectors (e.g. from live-research dossiers). */
const KEYWORD_MATCHES: [RegExp, keyof typeof SECTOR_ICONS][] = [
  [/ai|ml|machine learning|artificial intelligence|agent/i, "ai/ml"],
  [/fintech|finance|bank|payment/i, "fintech"],
  [/saas|software|enterprise|developer/i, "saas"],
  [/consumer|retail|d2c|commerce|marketplace/i, "consumer"],
  [/deep tech|hardware|robotics|space|defen[cs]e|infrastructure/i, "deep tech"],
  [/health|medical|bio|wellness/i, "health"],
  [/climate|energy|sustainab|carbon/i, "climate"],
  [/crypto|web3|blockchain|token/i, "crypto"],
  [/game|gaming/i, "gaming"],
];

/** Renders a small icon for a sector label, with a sensible fallback for free-text sectors. */
export default function SectorIcon({ sector, className }: { sector: string; className?: string }) {
  const exact = SECTOR_ICONS[sector.toLowerCase()];
  if (exact) return exact({ className });

  const match = KEYWORD_MATCHES.find(([pattern]) => pattern.test(sector));
  const Icon = match ? SECTOR_ICONS[match[1]] : TagIcon;
  return Icon({ className });
}
