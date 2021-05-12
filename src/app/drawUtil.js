
const canvas_id = 'line_area';
const overlay_id = 'line_area_overlay';

import {randomCircleData, randomLineData, midpoint, quadrants} from './geomUtil';

export const getCanvas = (canvas_id) => {
  return document.getElementById(canvas_id);
};

export const getContext = () => {
  return getCanvas(canvas_id).getContext("2d");
}

export const getOverlayContext = () => {
  return getCanvas(overlay_id).getContext("2d");
};

const drawCircle = (x, y, r, style, overlay) => {

  var context = getContext();
  if (overlay) {
    context = getOverlayContext();
  };

  if (style) {
    context.save();
    context.lineWidth=style.width;
    context.strokeStyle = style.color;
  }
  context.beginPath();
  context.arc(x, y, r, 0, 2 * Math.PI);
  context.stroke();
  context.restore();
};

const drawLine = (x1, y1, x2, y2) => {
  const context = getContext();
  context.beginPath();
  context.moveTo(x1, y1);
  context.lineTo(x2, y2);
  context.stroke();
};

export const highlightPoint = (x,y) => {
  drawCircle(x, y, 5, {width:2, color:'#FF0000'}, true);
}

export const drawRandomCircle = (showCenter=true, showQuadrants=true) => {
  var circle = randomCircleData();
  drawCircle(circle.x, circle.y, circle.radius);
  if (showCenter) {
    highlightPoint(circle.x, circle.y);
  }

  if (showQuadrants) {
    const circleQuads = quadrants(circle.x, circle.y, circle.radius);
    console.log(circleQuads);
    highlightPoint(circleQuads[0].x, circleQuads[0].y);
    highlightPoint(circleQuads[1].x, circleQuads[1].y);
    highlightPoint(circleQuads[2].x, circleQuads[2].y);
    highlightPoint(circleQuads[3].x, circleQuads[3].y);
  }
  
}

export const drawRandomLine = (showEndpoints=true, showMidPoint=true) => {
  var line = randomLineData();
  drawLine(line.x1, line.y1, line.x2, line.y2);
  if (showEndpoints) {
    highlightPoint(line.x1, line.y1);
    highlightPoint(line.x2, line.y2);
  }
  if (showMidPoint) {
    const linemp = midpoint(line.x1, line.y1, line.x2, line.y2);
    highlightPoint(linemp.x, linemp.y);
  }

}

