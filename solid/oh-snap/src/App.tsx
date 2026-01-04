import { v4 as uuidv4 } from 'uuid';
import { ReactiveMap } from '@solid-primitives/map';

import { createSignal, Show, type Component } from 'solid-js';
import {
  getMousePos,
  drawHighlight,
  clearHighlight,
  drawLine,
  drawCircle,
  Style,
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

const App: Component = () => {

  
  const leaveHandler = () => {
    selectionList.clear();
    clearAll();
  };
  const clearAll = () => {
      console.log('clearall');
      clearCanvas();
      redrawAll();
  };

  const showCoords = (e: MouseEvent | TouchEvent) => {
    clearAll();
      const resultPoint = getMousePos(e);

  
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
     drawSnapArea(new Circle(resultPoint.x, resultPoint.y, snapRange()));
  };

  const RED = '#FF0000';
  const BLUE = '#0000FF';
  const GREEN = '#00FF00';
  const PURPLE = '#FF00FF';
  const WHITE = '#FFFFFF';

  const [snapRange, setSnapRange] = createSignal(20);
  const [endpointSnap, setEndpointSnap] = createSignal(true);
  const [midpointSnap, setMidpointSnap] = createSignal(true);
  const [centerpointSnap, setCenterpointSnap] = createSignal(true);
  const [quadrantSnap, setQuadrantSnap] = createSignal(true);
  const lineStore = createMutable<Line[]>([]);
  const circleStore = createMutable<Circle[]>([]);
  const selectionList = new ReactiveMap<string, Point>();

  const addSelection = function (objectId: string, label: string, point: Point) {
    selectionList.set(`${objectId}_${label}`, point);
  };

  const removeSelection = function (objectId: string, label: string) {
    selectionList.delete(`${objectId}_${label}`);

    if (selectionList.size === 0 ) {
      clearAll();
    }
  };

  //(message: string) => void;
  const highlightOrClear = (
    geomPoint: Point,
    mousePoint: Point,
    redrawData: Line | Circle,
    redrawFunc: (obj: Circle | Line, style: Style | null) => void,
    label: string,
    color: string
  ) => {
    if (distance(geomPoint, mousePoint) < snapRange()) {
      drawHighlight(geomPoint, color);
      addSelection(redrawData.id, label, geomPoint);
      return redrawData.id;
    }
 //   clearHighlight(geomPoint);
  //  redrawFunc(redrawData, { color: WHITE, width: 2 });
   // redrawFunc(redrawData, null);
    removeSelection(redrawData.id, label);
    return null;
  };

  const nearAnyMidPoint = (mousePoint: Point) => {
    const lines = lineStore;
    for (let ii = 0; ii !== lines.length; ii++) {
      const lineMidpoint = midpoint(lines[ii]);
      highlightOrClear(lineMidpoint, mousePoint, lines[ii], drawLine, 'MP', RED);
    }
  };

  const nearAnyEndPoint = (mousePoint: Point) => {
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
      const finished = highlightOrClear(endpoint1, mousePoint, lines[ii], drawLine, 'EP1', GREEN);
      if (!finished) {
        highlightOrClear(endpoint2, mousePoint, lines[ii], drawLine, 'EP2', GREEN);
      }
    }
  };

  const nearAnyCenterPoint = (mousePoint: Point) => {
    const circles = circleStore;
    for (let ii = 0; ii !== circles.length; ii++) {
      const cp1 = {
        x: circles[ii].x,
        y: circles[ii].y,
      };
      highlightOrClear(cp1, mousePoint, circles[ii], drawCircle, 'CP', BLUE);
    }
  };

  const nearAnyQuadrantPoint = (mousePoint: Point) => {
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

      let finished = null;

      finished = highlightOrClear(q1, mousePoint, circles[ii], drawCircle, 'Q1', PURPLE);
      if (!finished) {
        finished = highlightOrClear(q2, mousePoint, circles[ii], drawCircle, 'Q2', PURPLE);
      }
      if (!finished) {
        finished = highlightOrClear(q3, mousePoint, circles[ii], drawCircle, 'Q3', PURPLE);
      }
      if (!finished) {
        finished = highlightOrClear(q4, mousePoint, circles[ii], drawCircle, 'Q4', PURPLE);
      }
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
    lineStore.forEach(line => drawLine(line, null));
    circleStore.forEach(circle => drawCircle(circle, null));
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

  const drawTestPattern = () => {
    const circle = new Circle(150, 150, 50);
    const line1 = new Line(75, 50, 225, 50);
    const line2 = new Line(250, 250, 250, 50);
    const line3 = new Line(50, 50, 50, 250);
    drawLine(line1, null);
    storeLine(line1);

    drawLine(line2, null);
    storeLine(line2);

    drawLine(line3, null);
    storeLine(line3);
    drawCircle(circle);
    storeCircle(circle);
  };

  return (
    <div class="content">
      <Show when={true}>
      <h1>Oh, snap!</h1>
      <h2>A simple object snap demo</h2>
      <div class="text">
        Create a few lines and circles, and mouse or touch over them to see potential snap points.
      </div>
</Show>
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
                  <Show when={false}>
          <button
            id="addTest"
            class="btn btn-primary"
            type="button"
            onClick={[drawTestPattern, null]}
          >      Test pattern
            </button>
        </Show>
             <button
            id="addTest"
            class="btn btn-primary"
            type="button"
            onClick={[clearAllGeo, null]}
          >
            Clear
          </button>

        </div>

        <div style="margin-bottom: 10px; margin-top: 10px;">
          <span style="font-weight: bold; margin-right: 10px;">Snap to:</span>
            <div>
          <label>
            Midpoint
            <input
              type="checkbox"
              checked={midpointSnap()}
              onChange={(e) => setMidpointSnap(e.currentTarget.checked)}
            ></input>
          </label>
          <label>
            Endpoint
            <input
              type="checkbox"
              checked={endpointSnap()}
              onChange={(e) => setEndpointSnap(e.currentTarget.checked)}
            ></input>
                  </label>
            </div>

    

          <div>
          <label>
            Centerpoint
            <input
              type="checkbox"
              checked={centerpointSnap()}
              onChange={(e) => setCenterpointSnap(e.currentTarget.checked)}
            ></input>
          </label>
          
          <label>
            Quadrant
            <input
              type="checkbox"
              checked={quadrantSnap()}
              onChange={(e) => setQuadrantSnap(e.currentTarget.checked)}
            ></input>
          </label>
          </div>
          </div>
        </div>

        <div style="margin-bottom: 10px; margin-top: 10px;">
          <label style="font-weight: bold;" class="topLabel">Snap range size:</label>
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
            <div class="col">
              <canvas
                class="ns item left"
                onMouseMove={showCoords}
                onTouchStart={showCoords}
                onTouchMove={showCoords}
                onTouchEnd={leaveHandler}
                onmouseleave={leaveHandler}
                width="300"
                height="300"
                id="drawingArea"
              ></canvas>
            </div>
            <div class="col">
              <details>
                <summary style='font-weight: bold;'>
              Line data
              </summary>
              <div>
              <textarea readonly cols="58" rows="3" id="lineData">
                {lineStore.map((line) => `L: ${line.id}: \n`)}
              </textarea>
              </div>
              </details>
       <details>
                    <summary  style='font-weight: bold;'>
              Circle data
              </summary>
              <div>
              <textarea readonly cols="58" rows="3" id="circleData">
                {circleStore.map((circle) => `C: ${circle.id}: \n`)}
              </textarea>
              </div>
            </details>
              <div>
                <details open>
               <summary style='font-weight: bold;'>
                Selection Data </summary>
              <textarea readonly cols="58" rows="4" id="selectionData">
                {Array.from(selectionList.entries()).map(
                  ([key, point]) => `${key}: (${point.x}, ${point.y})\n`
                )}
              </textarea>
              </details>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default App;
