import { randomLineData, randomCircleData, Point, Circle, Line } from './geomUtil';

export class Style {
  constructor (public width: number, public color: string) {}
}

const mainCanvasId = 'drawingArea';

export const getCanvas = (canvasId: string): HTMLCanvasElement => {
  const canvas: HTMLCanvasElement = document.getElementById(canvasId) as HTMLCanvasElement ;
  return canvas;
};

const getNumberFromPx = (px: string): number => {
  const numeric = px.substr(0, px.length - 2);
  return Number(numeric);
};

export const getMousePos = (moveEvent: { clientX: number; clientY: number; }) => {
  const canvas: HTMLCanvasElement = getCanvas(mainCanvasId) as HTMLCanvasElement;
  const rect = canvas.getBoundingClientRect();

  const style  = window.getComputedStyle(canvas);
  // TODO -- calculate offset once at startup.
  const offset = (getNumberFromPx(style.marginTop) + getNumberFromPx(style.paddingTop));
  return {
    x: moveEvent.clientX - (rect.left + offset),
    y: moveEvent.clientY - (rect.top + offset),
  };
};

export const getContext = (): CanvasRenderingContext2D => getCanvas(mainCanvasId).getContext('2d') as CanvasRenderingContext2D;

export const drawCircle = (circle: Circle, style: Style | null = null) => {
  const context = getContext();
  if (style) {
    context.save();
    context.lineWidth = style.width;
    context.strokeStyle = style.color;
  }
  context.beginPath();
  context.arc(circle.x, circle.y, circle.r, 0, 2 * Math.PI);
  context.stroke();
  context.restore();
};

export const drawLine = (line: Line, style: Style |null) => {
  const context = getContext();
  if (style) {
    context.save();
    context.lineWidth = style.width;
    context.strokeStyle = style.color;
  }
  context.beginPath();
  context.moveTo(line.x1, line.y1);
  context.lineTo(line.x2, line.y2);
  context.stroke();
  context.restore();
};

export const highlightPoint = (x: number, y: number, color: string) => {
  drawCircle( new Circle(x,y,5), { width: 1, color });
};

export const clearPointHighlight = (x: number, y: number) => {
  drawCircle(new Circle(x,y,5), { width: 1, color: '#FFFFFF' });
};

export const drawRandomLine = () => {
  const line = randomLineData();
  drawLine(line, null);
  return line;
};

export const drawRandomCircle = () => {
  const circle = randomCircleData();
  drawCircle(circle);
  return circle;
};

export const drawHighlight = (point: Point, color: string) => {
  highlightPoint(point.x, point.y, color);
};

export const clearHighlight = ( point: Point) => {
  clearPointHighlight(point.x, point.y);
};
