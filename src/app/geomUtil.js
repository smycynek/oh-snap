// eslint-disable-next-line arrow-body-style
export const distance = (point1, point2) => {
  return Math.sqrt(((point2.x - point1.x) ** 2) + ((point2.y - point1.y) ** 2));
};

export const midpoint = (line) => ({
  x: (line.x2 + line.x1) / 2,
  y: (line.y2 + line.y1) / 2,
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
