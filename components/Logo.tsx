/* eslint-disable @next/next/no-img-element */
import { logos } from "@/lib/brand";

type Props = { className?: string; tone?: "white" | "black" };

/** The gothic SM monogram — the street voice. */
export function Monogram({ className = "", tone = "black" }: Props) {
  return (
    <img
      src={tone === "white" ? logos.monogramWhite : logos.monogramBlack}
      alt="SM"
      className={className}
      draggable={false}
    />
  );
}

/** The clean, wide-set SOYMONDE wordmark — the couture voice. */
export function Wordmark({ className = "", tone = "black" }: Props) {
  return (
    <img
      src={tone === "white" ? logos.wordmarkWhite : logos.wordmarkBlack}
      alt="SOYMONDE"
      className={className}
      draggable={false}
    />
  );
}
