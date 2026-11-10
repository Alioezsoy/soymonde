"use client";

// The bag. For now it lives in the visitor's browser (localStorage).
// When Shopify is connected, these same functions will talk to the
// Shopify cart instead — the pages do not need to change.
import { useSyncExternalStore } from "react";

export type CartLine = { handle: string; colour?: string; size: string; quantity: number };

const same = (l: CartLine, handle: string, colour: string, size: string) =>
  l.handle === handle && (l.colour ?? "main") === colour && l.size === size;

const KEY = "soymonde-bag";
const EMPTY: CartLine[] = [];
const listeners = new Set<() => void>();
let lines: CartLine[] = EMPTY;
let loaded = false;

function load() {
  if (loaded) return;
  loaded = true;
  try {
    const stored = JSON.parse(localStorage.getItem(KEY) ?? "[]");
    if (Array.isArray(stored)) lines = stored;
  } catch {
    lines = EMPTY;
  }
}

function commit(next: CartLine[]) {
  lines = next;
  try {
    localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    // storage unavailable (private mode): the bag still works for this visit
  }
  listeners.forEach((l) => l());
}

export function addToCart(handle: string, colour: string, size: string) {
  load();
  const existing = lines.find((l) => same(l, handle, colour, size));
  commit(
    existing
      ? lines.map((l) => (l === existing ? { ...l, quantity: l.quantity + 1 } : l))
      : [...lines, { handle, colour, size, quantity: 1 }],
  );
}

export function setQuantity(handle: string, colour: string, size: string, quantity: number) {
  load();
  commit(
    quantity <= 0
      ? lines.filter((l) => !same(l, handle, colour, size))
      : lines.map((l) => (same(l, handle, colour, size) ? { ...l, quantity } : l)),
  );
}

export function useCart() {
  return useSyncExternalStore(
    (listener) => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    () => {
      load();
      return lines;
    },
    () => EMPTY,
  );
}

const OPEN_EVENT = "soymonde:open-bag";
export const openCart = () => window.dispatchEvent(new Event(OPEN_EVENT));
export const onOpenCart = (handler: () => void) => {
  window.addEventListener(OPEN_EVENT, handler);
  return () => window.removeEventListener(OPEN_EVENT, handler);
};
