import Image from "next/image";
import type { Frame } from "@/content/archive";

type Props = {
  frame: Frame;
  /** Tailwind classes for size / aspect ratio, e.g. "aspect-[4/5]" */
  className?: string;
  sizes?: string;
  priority?: boolean;
  showCaption?: boolean;
};

/** An image "plate". Shows the real image if the frame has a src,
    otherwise a quiet tonal placeholder. */
export function Plate({
  frame,
  className = "",
  sizes = "100vw",
  priority = false,
  showCaption = false,
}: Props) {
  const light = frame.tone === "sand" || frame.tone === "stone";
  return (
    <div className={`plate ${className}`}>
      {frame.src ? (
        <div className="plate-inner">
          <Image
            src={frame.src}
            alt={frame.alt}
            fill
            sizes={sizes}
            priority={priority}
            className="object-cover"
          />
        </div>
      ) : (
        <div className="plate-inner" data-tone={frame.tone} role="img" aria-label={frame.alt}>
          <div className="plate-grain" />
        </div>
      )}
      {showCaption && frame.caption ? (
        <span
          className={`coord absolute bottom-3 left-3 md:bottom-4 md:left-4 ${
            frame.src ? "text-white" : light ? "text-ink/60" : "text-bone/60"
          }`}
        >
          {frame.caption}
        </span>
      ) : null}
    </div>
  );
}
