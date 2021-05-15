export const distance = (x1, y1, x2, y2) => Math.sqrt(Math.pow((x2 - x1), 2) + Math.pow((y2 - y1), 2));

export const midpoint = (x1, y1, x2, y2) => ({
  x: (x2 + x1) / 2,
  y: (y2 + y1) / 2,
});

const LINE_MIN = 50;
const LINE_MAX = 450;

const CIRCLE_MIN = 100;
const CIRCLE_MAX = 400;
const CIRCLE_R_MIN = 50;
const CIRCLE_R_MAX = 150;

export const randomIntBounds = (min, max) => {
  const value = Math.floor(Math.random() * (max - min)) + min;
  return value;
};

export const randomLinePosition = () => randomIntBounds(LINE_MIN, LINE_MAX);

export const randomCirclePosition = () => randomIntBounds(CIRCLE_MIN, CIRCLE_MAX);

export const randomCircleRadius = () => randomIntBounds(CIRCLE_R_MIN, CIRCLE_R_MAX);

export const randomLineData = () => ({
  x1: randomLinePosition(),
  y1: randomLinePosition(),
  x2: randomLinePosition(),
  y2: randomLinePosition(),
});

export const randomCircleData = () => ({
  x: randomCirclePosition(),
  y: randomCirclePosition(),
  r: randomCircleRadius(),
});
