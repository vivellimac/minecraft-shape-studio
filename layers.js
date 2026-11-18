// UI layer numbers are relative to the occupied bounding box, not the parent grid.
export function layerDomain(bounds, axis) {
  const [first, last] = bounds[axis];
  return { first, length: Math.max(1, last - first + 1) };
}
export function layerIndex(bounds, axis, displayLayer) {
  const {first, length} = layerDomain(bounds, axis);
  return first + Math.max(0, Math.min(length - 1, Math.round(displayLayer) - 1));
}
