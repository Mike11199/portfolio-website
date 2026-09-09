const clamp = (value: number, max: number) => Math.max(0, Math.min(max, value));

export const getMinimapGeometry = (trackHeight: number, viewportHeight: number, scrollHeight: number, scrollTop: number, lineHeight = 20) => {
  const maxScroll = Math.max(0, scrollHeight - viewportHeight);
  // Fit short files; keep long files at two pixels per source line. Cap the
  // scale only when necessary to keep the editor viewport inside the track.
  const scale = Math.min(trackHeight / Math.max(1, viewportHeight),
    Math.max(trackHeight / Math.max(1, scrollHeight), 2 / Math.max(1, lineHeight)));
  const contentHeight = Math.max(viewportHeight, scrollHeight) * scale;
  const height = Math.min(trackHeight, viewportHeight * scale);
  const travel = trackHeight - height;
  const progress = maxScroll ? clamp(scrollTop, maxScroll) / maxScroll : 0;
  const offset = Math.max(0, contentHeight - trackHeight) * progress;
  const top = travel * progress;
  return { height, top, travel, maxScroll, scale, contentHeight, offset };
};

/** A click centers the source position currently drawn under the pointer. */
export const scrollFromMinimapPoint = (y: number, geometry: ReturnType<typeof getMinimapGeometry>) =>
  geometry.scale > 0 ? clamp((y + geometry.offset - geometry.height / 2) / geometry.scale, geometry.maxScroll) : 0;

/** Dragging in track space includes the content's simultaneous panning. */
export const scrollFromMinimap = (top: number, geometry: ReturnType<typeof getMinimapGeometry>) =>
  geometry.travel > 0 ? clamp(top / geometry.travel, 1) * geometry.maxScroll : 0;
