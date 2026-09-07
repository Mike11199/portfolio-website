export const getSlideIndex = (current: number, step: number, count: number, loop: boolean) => {
  if (count === 0) return 0;
  const next = current + step;
  return loop ? ((next % count) + count) % count : Math.min(count - 1, Math.max(0, next));
};
