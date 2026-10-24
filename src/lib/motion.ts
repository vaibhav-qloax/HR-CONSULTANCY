/** Shared motion tokens — keep every animation on the same rhythm. */
export const ease = {
  outExpo: [0.16, 1, 0.3, 1] as const,
  outQuart: [0.25, 1, 0.5, 1] as const,
  inOutCirc: [0.85, 0, 0.15, 1] as const,
};

export const duration = {
  fast: 0.18,
  base: 0.28,
  reveal: 0.7,
  hero: 0.9,
};

export const stagger = {
  words: 0.045,
  items: 0.08,
};

export const viewport = { once: true, margin: "0px 0px -12% 0px" } as const;
