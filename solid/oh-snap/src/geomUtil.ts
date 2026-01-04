export class Point {
  constructor(
    public x: number,
    public y: number
  ) {}
}

export class Line {
  public id: string = '';
  constructor(
    public x1: number,
    public y1: number,
    public x2: number,
    public y2: number
  ) {}
}

export class Circle {
  public id: string = '';
  constructor(
    public x: number,
    public y: number,
    public r: number
  ) {}
}

export const distance = (point1: Point, point2: Point): number => {
  return Math.sqrt((point2.x - point1.x) ** 2 + (point2.y - point1.y) ** 2);
};

export const midpoint = (line: Line): Point => ({
  x: (line.x2 + line.x1) / 2,
  y: (line.y2 + line.y1) / 2,
});

const LINE_MIN = 50;
const LINE_MAX = 250;
const CIRCLE_MIN = 100;
const CIRCLE_MAX = 200;
const CIRCLE_R_MIN = 50;
const CIRCLE_R_MAX = 150;

export const randomIntBounds = (min: number, max: number): number => {
  const value = Math.floor(Math.random() * (max - min)) + min;
  return value;
};

export const randomLinePosition = () => randomIntBounds(LINE_MIN, LINE_MAX);

export const randomCirclePosition = () => randomIntBounds(CIRCLE_MIN, CIRCLE_MAX);

export const randomCircleRadius = () => randomIntBounds(CIRCLE_R_MIN, CIRCLE_R_MAX);

export const randomLineData = (): Line => {
  return new Line(
    randomLinePosition(),
    randomLinePosition(),
    randomLinePosition(),
    randomLinePosition()
  );
};

export const randomCircleData = (): Circle => {
  return new Circle(randomCirclePosition(), randomCirclePosition(), randomCircleRadius());
};
