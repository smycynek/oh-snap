import { randomLineData, randomCircleData } from './geomUtil';

const mainCanvas = 'line_area';

export const getCanvas = (canvasId) => {
  const canvas = document.getElementById(canvasId);
  return canvas;
};

const getNumberFromPx = (px) => {
  const numeric = px.substr(0, px.length - 2);
  return Number(numeric);
};

export const getMousePos = (moveEvent) => {
  const canvas = getCanvas(mainCanvas);
  const rect = canvas.getBoundingClientRect();

  const style = canvas.currentStyle || window.getComputedStyle(canvas);
  // TODO -- calculate offset once at startup.
  const offset = (getNumberFromPx(style.marginTop) + getNumberFromPx(style.paddingTop));
  return {
    x: moveEvent.clientX - (rect.left + offset),
    y: moveEvent.clientY - (rect.top + offset),
  };
};

export const getContext = () => getCanvas(mainCanvas).getContext('2d');

export const drawCircle = (x, y, r, style) => {
  const context = getContext();
  if (style) {
    context.save();
    context.lineWidth = style.width;
    context.strokeStyle = style.color;
  }
  context.beginPath();
  context.arc(x, y, r, 0, 2 * Math.PI);
  context.stroke();
  context.restore();
};

export const drawLine = (x1, y1, x2, y2, style) => {
  const context = getContext();
  if (style) {
    context.save();
    context.lineWidth = style.width;
    context.strokeStyle = style.color;
  }
  context.beginPath();
  context.moveTo(x1, y1);
  context.lineTo(x2, y2);
  context.stroke();
  context.restore();
};

export const highlightPoint = (x, y, color) => {
  drawCircle(x, y, 5, { width: 1, color });
};

export const clearPointHighlight = (x, y) => {
  drawCircle(x, y, 5, { width: 1, color: '#FFFFFF' });
};

export const drawRandomLine = () => {
  const line = randomLineData();
  drawLine(line.x1, line.y1, line.x2, line.y2);
  return line;
};

export const drawRandomCircle = () => {
  const circle = randomCircleData();
  drawCircle(circle.x, circle.y, circle.r);
  return circle;
};

export const drawHighlight = (point, color) => {
  highlightPoint(point.x, point.y, color);
};

export const clearHighlight = (point) => {
  clearPointHighlight(point.x, point.y);
};
