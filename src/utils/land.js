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

export const parallelogramBaseHeight = (base, height, unit="ft") =>
  Math.max(0, toFeet(base, unit) * toFeet(height, unit));

export const parallelogramSidesAngle = (sideA, sideB, angleDeg, unit="ft") => {
  const A = toFeet(sideA, unit), B = toFeet(sideB, unit), ang = Number(angleDeg);
  if (!(A > 0 && B > 0) || !(ang > 0 && ang < 180)) return 0;
  return Math.max(0, A * B * Math.sin((ang * Math.PI) / 180));
};

export const trapezium = (parallelSideA, parallelSideB, height, unit="ft") => {
  const A = toFeet(parallelSideA, unit), B = toFeet(parallelSideB, unit), H = toFeet(height, unit);
  if (!(A > 0 && B > 0 && H > 0)) return 0;
  return Math.max(0, 0.5 * (A + B) * H);
};

export const rhombusDiagonals = (diagonal1, diagonal2, unit="ft") =>
  Math.max(0, 0.5 * toFeet(diagonal1, unit) * toFeet(diagonal2, unit));

export const rhombusSideHeight = (side, height, unit="ft") =>
  Math.max(0, toFeet(side, unit) * toFeet(height, unit));

export const circleRadius = (radius, unit="ft") => {
  const r = toFeet(radius, unit);
  return Math.max(0, Math.PI * r * r);
};

export const circleDiameter = (diameter, unit="ft") => {
  const d = toFeet(diameter, unit);
  return Math.max(0, Math.PI * (d / 2) * (d / 2));
};

// ---- Ellipse ----
export const ellipseAxes = (semiMajor, semiMinor, unit="ft") =>
  Math.max(0, Math.PI * toFeet(semiMajor, unit) * toFeet(semiMinor, unit));

export const ellipseDiameters = (majorAxis, minorAxis, unit="ft") =>
  Math.max(0, Math.PI * (toFeet(majorAxis, unit)/2) * (toFeet(minorAxis, unit)/2));

// ---- Semicircle ----
export const semicircleRadius = (radius, unit="ft") =>
  Math.max(0, 0.5 * Math.PI * toFeet(radius, unit) ** 2);

export const semicircleDiameter = (diameter, unit="ft") => {
  const r = toFeet(diameter, unit) / 2;
  return Math.max(0, 0.5 * Math.PI * r * r);
};

// ---- Quarter circle ----
export const quarterCircleRadius = (radius, unit="ft") =>
  Math.max(0, 0.25 * Math.PI * toFeet(radius, unit) ** 2);

export const quarterCircleDiameter = (diameter, unit="ft") => {
  const r = toFeet(diameter, unit) / 2;
  return Math.max(0, 0.25 * Math.PI * r * r);
};

// ---- Circular sector (pie slice) ----
export const circularSector = (radius, angleDeg, unit="ft") => {
  const r = toFeet(radius, unit), ang = Number(angleDeg);
  if (!(r > 0) || !(ang > 0 && ang <= 360)) return 0;
  return Math.max(0, (ang / 360) * Math.PI * r * r);
};

// ---- Circular segment (area between chord and arc) ----
export const circularSegment = (radius, angleDeg, unit="ft") => {
  const r = toFeet(radius, unit), ang = Number(angleDeg);
  if (!(r > 0) || !(ang > 0 && ang < 360)) return 0;
  const rad = (ang * Math.PI) / 180;
  return Math.max(0, 0.5 * r * r * (rad - Math.sin(rad)));
};

// ---- Isosceles trapezium ----
export const isoscelesTrapeziumHeight = (parallelSideA, parallelSideB, height, unit="ft") =>
  trapezium(parallelSideA, parallelSideB, height, unit);

export const isoscelesTrapeziumLeg = (parallelSideA, parallelSideB, leg, unit="ft") => {
  const A = toFeet(parallelSideA, unit), B = toFeet(parallelSideB, unit), L = toFeet(leg, unit);
  const half = Math.abs(A - B) / 2;
  if (!(A > 0 && B > 0 && L > half)) return 0;
  const h = Math.sqrt(L * L - half * half);
  return Math.max(0, 0.5 * (A + B) * h);
};

// ---- Right trapezium (height is the perpendicular leg) ----
export const rightTrapezium = (parallelSideA, parallelSideB, height, unit="ft") =>
  trapezium(parallelSideA, parallelSideB, height, unit);

// ---- Kite ----
export const kiteDiagonals = (diagonal1, diagonal2, unit="ft") =>
  rhombusDiagonals(diagonal1, diagonal2, unit);

export const kiteSidesAngle = (sideA, sideB, angleDeg, unit="ft") => {
  const A = toFeet(sideA, unit), B = toFeet(sideB, unit), ang = Number(angleDeg);
  if (!(A > 0 && B > 0) || !(ang > 0 && ang < 180)) return 0;
  return Math.max(0, A * B * Math.sin((ang * Math.PI) / 180));
};

// ---- Irregular quadrilateral: both diagonals + angle between them ----
export const irregularQuadrilateral = (diagonal1, diagonal2, angleDeg, unit="ft") => {
  const D1 = toFeet(diagonal1, unit), D2 = toFeet(diagonal2, unit), ang = Number(angleDeg);
  if (!(D1 > 0 && D2 > 0) || !(ang > 0 && ang < 180)) return 0;
  return Math.max(0, 0.5 * D1 * D2 * Math.sin((ang * Math.PI) / 180));
};

// ---- Irregular polygon: Shoelace formula on vertex coordinates ----
export const irregularPolygon = (points, unit="ft") => {
  if (!Array.isArray(points) || points.length < 3) return 0;
  const pts = points.map(p => [toFeet(p.x, unit), toFeet(p.y, unit)]);
  let sum = 0;
  for (let i = 0; i < pts.length; i++) {
    const [x1, y1] = pts[i];
    const [x2, y2] = pts[(i + 1) % pts.length];
    if (!Number.isFinite(x1) || !Number.isFinite(y1)) return 0;
    sum += x1 * y2 - x2 * y1;
  }
  return Math.max(0, Math.abs(sum) / 2);
};

// ---- Composite: bounding rectangle minus one rectangular notch (L / U / C shapes) ----
export const rectMinusNotch = (outerLength, outerWidth, notchLength, notchWidth, unit="ft") => {
  const OL = toFeet(outerLength, unit), OW = toFeet(outerWidth, unit);
  const NL = toFeet(notchLength, unit), NW = toFeet(notchWidth, unit);
  if (!(OL > 0 && OW > 0)) return 0;
  const outer = OL * OW;
  const notch = Math.max(0, NL) * Math.max(0, NW);
  return Math.max(0, outer - notch);
};

// ---- T-shape: top bar rectangle + stem rectangle ----
export const tShape = (topLength, topWidth, stemLength, stemWidth, unit="ft") => {
  const top = rectangle(topLength, topWidth, unit);
  const stem = rectangle(stemLength, stemWidth, unit);
  if (!(top > 0 && stem > 0)) return 0;
  return Math.max(0, top + stem);
};

// ---- Composite shape: rectangle + semicircle on one side (semicircle diameter = rectangle width) ----
export const compositeRectSemicircle = (length, width, unit="ft") => {
  const rect = rectangle(length, width, unit);
  if (!(rect > 0)) return 0;
  const r = toFeet(width, unit) / 2;
  return Math.max(0, rect + 0.5 * Math.PI * r * r);
};

// ---- Combined/composite land: sum of any number of rectangular parts ----
export const combinedParts = (parts, unit="ft") => {
  if (!Array.isArray(parts) || parts.length === 0) return 0;
  let total = 0;
  for (const p of parts) {
    total += rectangle(p.length, p.width, unit);
  }
  return Math.max(0, total);
};

export const fmt = (n, digits=2) =>
  Number.isFinite(n) ? Number(n).toLocaleString(undefined, { maximumFractionDigits: digits }) : "0";