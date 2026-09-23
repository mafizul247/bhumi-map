export const SQFT_PER_DECIMAL = 435.6;
export const SQFT_PER_KATHA = 720;
export const SQFT_PER_BIGHA = 14400;
export const SQFT_PER_ACRE = 43560;
export const SQFT_PER_HECTARE = 107639.104;
export const SQFT_PER_CHHATAK = 45;
export const SQFT_PER_KANI = 17280;
export const SQFT_PER_GONDA = 864;
export const SQFT_PER_KORA = 216;

export const toFeet = (value, unit) => {
  const n = Number(value);
  if (!Number.isFinite(n)) return 0;
  if (unit === "m") return n * 3.280839895;
  if (unit === "yd") return n * 3;
  return n;
};

export const fromSqft = (sqft) => ({
  sqft,
  sqm: sqft / 10.7639104167,
  decimal: sqft / SQFT_PER_DECIMAL,
  shotok: sqft / SQFT_PER_DECIMAL,
  katha: sqft / SQFT_PER_KATHA,
  bigha: sqft / SQFT_PER_BIGHA,
  acre: sqft / SQFT_PER_ACRE,
  hectare: sqft / SQFT_PER_HECTARE,
  chhatak: sqft / SQFT_PER_CHHATAK,
  kani: sqft / SQFT_PER_KANI,
  gonda: sqft / SQFT_PER_GONDA,
  kora: sqft / SQFT_PER_KORA
});

export const rectangle = (length, width, unit="ft") =>
  Math.max(0, toFeet(length, unit) * toFeet(width, unit));

export const square = (side, unit="ft") => {
  const s = toFeet(side, unit);
  return Math.max(0, s * s);
};

export const triangleBaseHeight = (base, height, unit="ft") =>
  Math.max(0, 0.5 * toFeet(base, unit) * toFeet(height, unit));

export const triangleSides = (a, b, c, unit="ft") => {
  const A = toFeet(a, unit), B = toFeet(b, unit), C = toFeet(c, unit);
  if (!(A > 0 && B > 0 && C > 0) || A + B <= C || A + C <= B || B + C <= A) return null;
  const s = (A + B + C) / 2;
  return Math.sqrt(s * (s-A) * (s-B) * (s-C));
};

export const fmt = (n, digits=2) =>
  Number.isFinite(n) ? Number(n).toLocaleString(undefined, { maximumFractionDigits: digits }) : "0";