
import { randomLineData, randomCircleData } from './geomUtil';

const canvas_id = 'line_area';

export const getCanvas = (canvas_id) => {
  const canvas = document.getElementById(canvas_id);
  return canvas;
};

const getNumberFromPx = (px) => {
    let numeric = px.substr(0, px.length-2);
    return Number(numeric);
};

export const getMousePos = (moveEvent) => {
  const canvas = getCanvas(canvas_id);
  const rect = canvas.getBoundingClientRect();

  const style = canvas.currentStyle || window.getComputedStyle(canvas);
  // TODO -- calculate offset once at startup.
  const offset = (getNumberFromPx(style.marginTop) + getNumberFromPx(style.paddingTop));
  return {
    x: moveEvent.clientX - (rect.left + offset),
    y: moveEvent.clientY - (rect.top + offset),
  };
};

export const getContext = () => {
  return getCanvas(canvas_id).getContext("2d");
};

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

export const drawLine = (x1, y1, x2, y2) => {
  const context = getContext();
  context.lineWidth = 1;
  context.beginPath();
  context.moveTo(x1, y1);
  context.lineTo(x2, y2);
  context.stroke();
};

export const highlightPoint = (x, y) => {
  drawCircle(x, y, 5, {width: 1, color: '#FF0000'});
};

export const clearPointHighlight = (x, y) => {
  drawCircle(x, y, 5, {width: 1, color: '#FFFFFF'});
};

export const drawRandomLine = () => {
  const line = randomLineData();
  drawLine(line.x1, line.y1, line.x2, line.y2);
  drawLine(line.x1, line.y1, line.x2, line.y2); // odd antialiasing issue workaround
  return line;
};

export const drawRandomCircle = () => {
  const circle = randomCircleData();
  drawCircle(circle.x, circle.y, circle.r);
  drawCircle(circle.x, circle.y, circle.r); // odd antialiasing issue workaround
  return circle;
};

export const drawHighlight = (point) => {
  highlightPoint(point.x, point.y);
};

export const clearHighlight = (point) => {
  clearPointHighlight(point.x, point.y);
};
