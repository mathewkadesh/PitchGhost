import { useState } from "react";
import { firmDomains } from "../data/firmDomains";

interface Props {
  slug: string;
  firm: string;
  size?: number;
}

function monogram(firm: string): string {
  const words = firm
    .replace(/\(.*?\)/g, "")
    .replace(/[^A-Za-z\s]/g, "")
    .trim()
    .split(/\s+/)
    .filter(Boolean);
  if (words.length === 0) return "?";
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return (words[0][0] + words[1][0]).toUpperCase();
}

export default function FirmLogo({ slug, firm, size = 48 }: Props) {
  const domain = firmDomains[slug];
  const [failed, setFailed] = useState(false);
  const showImg = domain && !failed;

  return (
    <div
      className="flex shrink-0 items-center justify-center overflow-hidden rounded-md border border-line bg-panel"
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      {showImg ? (
        <img
          src={`https://www.google.com/s2/favicons?domain=${domain}&sz=128`}
          alt=""
          width={size * 0.6}
          height={size * 0.6}
          loading="lazy"
          onError={() => setFailed(true)}
          style={{ objectFit: "contain" }}
        />
      ) : (
        <span
          className="font-display text-gold"
          style={{ fontSize: size * 0.38 }}
        >
          {monogram(firm)}
        </span>
      )}
    </div>
  );
}
