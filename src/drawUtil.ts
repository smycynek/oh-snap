import { TRANSPARENT_GREY } from './App';
import { randomLineData, randomCircleData, Point, Circle, Line } from './geomUtil';

export class Style {
  constructor(
    public width: number,
    public color: string
  ) {}
}

const mainCanvasId = 'drawingArea';

export const getCanvas = (canvasId: string): HTMLCanvasElement => {
  const canvas: HTMLCanvasElement = document.getElementById(canvasId) as HTMLCanvasElement;
  return canvas;
};

const getNumberFromPx = (px: string): number => {
  const numeric = px.substr(0, px.length - 2);
  return Number(numeric);
};

export const getCurrentPosition = (moveEvent: MouseEvent | TouchEvent) => {
  const canvas: HTMLCanvasElement = getCanvas(mainCanvasId) as HTMLCanvasElement;
  const rect = canvas.getBoundingClientRect();

  const style = window.getComputedStyle(canvas);
  // TODO -- calculate offset once at startup.
  const offset = getNumberFromPx(style.marginTop) + getNumberFromPx(style.paddingTop);

  if (moveEvent instanceof MouseEvent) {
    return {
      x: moveEvent.clientX - (rect.left + offset),
      y: moveEvent.clientY - (rect.top + offset),
    };
  } else {
    const touchOffset = 30; // to account for finger size
    return {
      x: moveEvent.touches[0].clientX - (rect.left + offset) + touchOffset,
      y: moveEvent.touches[0].clientY - (rect.top + offset) - touchOffset,
    };
  }
};

export const getContext = (): CanvasRenderingContext2D =>
  getCanvas(mainCanvasId).getContext('2d') as CanvasRenderingContext2D;

export const clearCanvas = () => {
  const context = getContext();
  context.clearRect(0, 0, 300, 300);
};

export const drawSnapArea = (circle: Circle) => {
  const context = getContext();
  context.save();
  context.strokeStyle = '#00000000';
  context.fillStyle = TRANSPARENT_GREY;
  context.lineWidth = 1;
  context.beginPath();
  context.moveTo(circle.x + circle.r, circle.y);
  context.arc(circle.x, circle.y, circle.r, 0, 2 * Math.PI);
  context.stroke();
  context.fill();
  context.closePath();
  context.restore();
};
export const drawCircle = (circle: Circle, style: Style | null = null) => {
  const context = getContext();
  if (style) {
    context.save();
    context.lineWidth = style.width;
    context.strokeStyle = style.color;
  }
  context.lineWidth = 2;
  context.beginPath();
  context.arc(circle.x, circle.y, circle.r, 0, 2 * Math.PI);
  context.stroke();
  context.closePath();
  context.restore();
};

export const drawLine = (line: Line, style: Style | null) => {
  const context = getContext();
  if (style) {
    context.save();
    context.lineWidth = style.width;
    context.strokeStyle = style.color;
  }
  context.beginPath();
  context.lineWidth = 2;
  context.moveTo(line.x1, line.y1);
  context.lineTo(line.x2, line.y2);
  context.stroke();
  context.closePath();
  context.restore();
};

export const highlightPoint = (x: number, y: number, color: string) => {
  drawCircle(new Circle(x, y, 5), { width: 1, color });
};

export const drawRandomLine = () => {
  const line = randomLineData();
  drawLine(line, null);
  return line;
};

export const drawRandomCircle = () => {
  const circle = randomCircleData();
  drawCircle(circle, null);
  return circle;
};

export const drawHighlight = (point: Point, color: string) => {
  highlightPoint(point.x, point.y, color);
};
