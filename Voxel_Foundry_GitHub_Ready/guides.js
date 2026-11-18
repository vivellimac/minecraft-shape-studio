// Coordinates are block-center offsets from the full parent shape center.
// A half-block tolerance preserves symmetry for even and mixed-parity sizes.
export function guideKind(u, v, axes, diagonals) {
  const a = axes && (Math.abs(u) <= 0.5001 || Math.abs(v) <= 0.5001);
  const d = diagonals && Math.abs(Math.abs(u) - Math.abs(v)) <= 0.5001;
  return (a ? 1 : 0) + (d ? 2 : 0);
}
export const guideColors = ['','#ffd179','#7cc6ff','#d9a4ff'];
export function planeAxes(axis) { return axis === 1 ? [0,2] : axis === 0 ? [2,1] : [0,1]; }
