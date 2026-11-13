"use client";

import { useEffect, useState } from "react";
import type { Dictionary } from "@/content/dictionaries";

const pad = (n: number) => String(n).padStart(2, "0");

/** Counts down to the drop. Shows nothing once the moment has passed. */
export function Countdown({ to, units }: { to: string; units: Dictionary["drop"]["units"] }) {
  const target = Date.parse(to);
  // The time is only read in the browser, so the page itself stays static.
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    const tick = () => setNow(Date.now());
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const left = now === null ? null : Math.max(0, Math.floor((target - now) / 1000));
  if (left === 0) return null;

  const parts: [string, number | null][] = [
    [units.days, left === null ? null : Math.floor(left / 86400)],
    [units.hours, left === null ? null : Math.floor(left / 3600) % 24],
    [units.minutes, left === null ? null : Math.floor(left / 60) % 60],
    [units.seconds, left === null ? null : left % 60],
  ];

  return (
    <div role="timer" className="flex justify-center gap-6 md:gap-10">
      {parts.map(([label, value]) => (
        <div key={label} className="w-12 text-center md:w-16">
          <p className="coord text-2xl tabular-nums md:text-4xl">{value === null ? "––" : pad(value)}</p>
          <p className="label mt-2 text-bone/50">{label}</p>
        </div>
      ))}
    </div>
  );
}
