import { v4 as uuidv4 } from 'uuid';
import { ReactiveMap } from '@solid-primitives/map';

import { createSignal, type Component } from 'solid-js';
import {
  getCurrentPosition,
  drawHighlight,
  drawLine,
  drawCircle,
  clearCanvas,
  drawSnapArea,
} from './drawUtil';
import {
  Circle,
  distance,
  Line,
  midpoint,
  Point,
  randomCircleData,
  randomLineData,
} from './geomUtil';

import { createMutable } from 'solid-js/store';

const RED = '#FF0000';
const BLUE = '#0000FF';
const GREEN = '#00FF00';
const PURPLE = '#FF00FF';
export const TRANSPARENT_GREY = '#0000001f';

const App: Component = () => {
  const [snapRange, setSnapRange] = createSignal(60);
  const [endpointSnap, setEndpointSnap] = createSignal(true);
  const [midpointSnap, setMidpointSnap] = createSignal(true);
  const [centerpointSnap, setCenterpointSnap] = createSignal(true);
  const [quadrantSnap, setQuadrantSnap] = createSignal(true);
  const lineStore = createMutable<Line[]>([]);
  const circleStore = createMutable<Circle[]>([]);
  const selectionList = new ReactiveMap<string, Point>();

  const contextMenuHandler = (e: MouseEvent) => {
    console.log('contextMenu');
    e.preventDefault();
  };

  const leaveHandler = () => {
    console.log('leave');
    selectionList.clear();
    clearAll();
  };

  const clearAll = () => {
    console.log('clearall');
    clearCanvas();
    redrawAll();
  };

  let lastTouch = false;

  const mouseEnterHandler = () => {
    lastTouch = false;
  };
  const mouseLeaveHandler = () => {
    lastTouch = false;
    leaveHandler();
  };

  const showCoords = (e: MouseEvent | TouchEvent) => {
    console.log(e.type);
    if (e.type === 'touchstart') {
      lastTouch = true;
    }
    clearAll();
    const resultPoint = getCurrentPosition(e);

    if (endpointSnap()) {
      nearAnyEndPoint(resultPoint);
    }

    if (midpointSnap()) {
      nearAnyMidPoint(resultPoint);
    }

    if (centerpointSnap()) {
      nearAnyCenterPoint(resultPoint);
    }

    if (quadrantSnap()) {
      nearAnyQuadrantPoint(resultPoint);
    }
    if (e.type === 'mousemove' && lastTouch) {
      e.preventDefault();
      leaveHandler();
      return;
    }
    drawSnapArea(new Circle(resultPoint.x, resultPoint.y, snapRange()));
  };

  const addSelection = function (objectId: string, label: string, point: Point) {
    selectionList.set(`${objectId}_${label}`, point);
  };

  const removeSelection = function (objectId: string, label: string) {
    selectionList.delete(`${objectId}_${label}`);

    if (selectionList.size === 0) {
      clearAll();
    }
  };

  const selectAndHighlightIfNear = (
    geomPoint: Point,
    selectionPoint: Point,
    geomObject: Line | Circle,
    label: string,
    color: string
  ) => {
    if (distance(geomPoint, selectionPoint) < snapRange()) {
      drawHighlight(geomPoint, color);
      addSelection(geomObject.id, label, geomPoint);
      return geomObject.id;
    }
    removeSelection(geomObject.id, label);
    return geomObject.id;
  };

  const nearAnyMidPoint = (selectionPoint: Point) => {
    const lines = lineStore;
    for (let ii = 0; ii !== lines.length; ii++) {
      const lineMidpoint = midpoint(lines[ii]);
      selectAndHighlightIfNear(lineMidpoint, selectionPoint, lines[ii], 'MP', RED);
    }
  };

  const nearAnyEndPoint = (selectionPoint: Point) => {
    const lines = lineStore;
    for (let ii = 0; ii !== lines.length; ii++) {
      const endpoint1 = {
        x: lines[ii].x1,
        y: lines[ii].y1,
      };
      const endpoint2 = {
        x: lines[ii].x2,
        y: lines[ii].y2,
      };
      selectAndHighlightIfNear(endpoint1, selectionPoint, lines[ii], 'EP1', GREEN);
      selectAndHighlightIfNear(endpoint2, selectionPoint, lines[ii], 'EP2', GREEN);
    }
  };

  const nearAnyCenterPoint = (selectionPoint: Point) => {
    const circles = circleStore;
    for (let ii = 0; ii !== circles.length; ii++) {
      const cp1 = {
        x: circles[ii].x,
        y: circles[ii].y,
      };
      selectAndHighlightIfNear(cp1, selectionPoint, circles[ii], 'CP', BLUE);
    }
  };

  const nearAnyQuadrantPoint = (selectionPoint: Point) => {
    const circles = circleStore;
    for (let ii = 0; ii !== circles.length; ii++) {
      const q1 = {
        x: circles[ii].x + circles[ii].r,
        y: circles[ii].y,
      };
      const q2 = {
        x: circles[ii].x,
        y: circles[ii].y + circles[ii].r,
      };
      const q3 = {
        x: circles[ii].x - circles[ii].r,
        y: circles[ii].y,
      };

      const q4 = {
        x: circles[ii].x,
        y: circles[ii].y - circles[ii].r,
      };

      selectAndHighlightIfNear(q1, selectionPoint, circles[ii], 'Q1', PURPLE);
      selectAndHighlightIfNear(q2, selectionPoint, circles[ii], 'Q2', PURPLE);
      selectAndHighlightIfNear(q3, selectionPoint, circles[ii], 'Q3', PURPLE);
      selectAndHighlightIfNear(q4, selectionPoint, circles[ii], 'Q4', PURPLE);
    }
  };

  const storeLine = (line: Line) => {
    line.id = uuidv4();
    lineStore.push(line);
  };

  const storeCircle = (circle: Circle) => {
    circle.id = uuidv4();
    circleStore.push(circle);
  };

  const redrawAll = () => {
    lineStore.forEach((line) => drawLine(line, null));
    circleStore.forEach((circle) => drawCircle(circle, null));
  };

  const drawRandomLine = () => {
    const line = randomLineData();
    drawLine(line, null);
    storeLine(line);
  };

  const drawRandomCircle = () => {
    const circle = randomCircleData();
    drawCircle(circle, null);
    storeCircle(circle);
  };

  const clearAllGeo = () => {
    const lc = lineStore.length;
    const cc = circleStore.length;

    for (let idx = 0; idx != lc; idx++) {
      lineStore.pop();
    }

    for (let idx = 0; idx != cc; idx++) {
      circleStore.pop();
    }

    clearAll();
  };

  return (
    <div class="content">
      <h1>Oh, snap!</h1>
      <h2>A simple object snap demo</h2>
      <span class="instructions">Add lines and circles. Drag or touch to see snap points.</span>
      <div>
        <div>
          <button
            id="addLine"
            class="btn btn-primary"
            type="button"
            onClick={[drawRandomLine, null]}
          >
            Line
          </button>
          <button
            id="addCircle"
            class="btn btn-primary"
            type="button"
            onClick={[drawRandomCircle, null]}
          >
            Circle
          </button>
          <button
            id="clearButton"
            class="btn btn-primary"
            type="button"
            onClick={[clearAllGeo, null]}
          >
            Clear
          </button>
        </div>
        <div style="margin-bottom: 0px; margin-top: 0px; padding-bottom: 0px; padding-top: 0px;">
          <label class="snapHeader" style="margin-right: 10px; margin-bottom: 0px;">
            Snap to
          </label>
          <div style="margin-bottom: 0px; margin-top: 0px; padding-bottom: 0px; padding-top: 0px;">
            <label class="snapLabel">Midpoint</label>
            <input
              type="checkbox"
              checked={midpointSnap()}
              onChange={(e) => setMidpointSnap(e.currentTarget.checked)}
            ></input>

            <label class="snapLabel">Endpoint</label>
            <input
              type="checkbox"
              checked={endpointSnap()}
              onChange={(e) => setEndpointSnap(e.currentTarget.checked)}
            ></input>
          </div>

          <div style="margin-bottom: 0px; margin-top: 0px; padding-bottom: 0px; padding-top: 0px;">
            <label class="snapLabel">Centerpoint</label>
            <input
              type="checkbox"
              checked={centerpointSnap()}
              onChange={(e) => setCenterpointSnap(e.currentTarget.checked)}
            ></input>

            <label class="snapLabel">Quadrant</label>
            <input
              type="checkbox"
              checked={quadrantSnap()}
              onChange={(e) => setQuadrantSnap(e.currentTarget.checked)}
            ></input>
          </div>
        </div>
      </div>

      <div style="margin-bottom: 5px; margin-top: 5px;">
        <label class="snapHeader" style="margin-right: 1em;">
          Snap radius {snapRange()} px
        </label>
        <input
          id="snapRangeControl"
          type="range"
          value={snapRange()}
          onInput={(e) => setSnapRange(parseInt(e.currentTarget.value))}
          min="15"
          max="100"
        ></input>
      </div>

      <div class="container">
        <div class="row">
          <div class="col-md-4">
            <canvas
              class="ns"
              onMouseMove={showCoords}
              onTouchStart={showCoords}
              onTouchMove={showCoords}
              onTouchEnd={leaveHandler}
              onmouseleave={mouseLeaveHandler}
              onmouseenter={mouseEnterHandler}
              oncontextmenu={contextMenuHandler}
              width="300"
              height="300"
              id="drawingArea"
            ></canvas>
          </div>
        </div>
        <div class="row">
          <div class="col-md-4">
            <details>
              <summary>Line data</summary>
              <div>
                <textarea readonly cols="58" rows="3" id="lineData">
                  {lineStore.map((line) => `L: ${line.id}\n`)}
                </textarea>
              </div>
            </details>
            <details>
              <summary>Circle data</summary>
              <div>
                <textarea readonly cols="58" rows="3" id="circleData">
                  {circleStore.map((circle) => `C: ${circle.id}\n`)}
                </textarea>
              </div>
            </details>
            <div>
              <details open>
                <summary>Selection Data </summary>
                <textarea readonly cols="58" rows="3" id="selectionData">
                  {Array.from(selectionList.entries()).map(
                    ([key, point]) => `${key}: (${point.x}, ${point.y})\n`
                  )}
                </textarea>
              </details>
            </div>
          </div>
        </div>
      </div>
      <a href="https://github.com/smycynek/oh-snap">https://github.com/smycynek/oh-snap</a>
    </div>
  );
};

export default App;
