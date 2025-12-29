import * as bootstrap from "bootstrap";
import button from "bootstrap/js/dist/button";

import { v4 as uuidv4 } from "uuid";

import {
  createSignal,
  For,
  JSX,
  onMount,
  Show,
  type Component,
} from "solid-js";
import {
  getMousePos,
  drawHighlight,
  clearHighlight,
  drawLine,
  drawCircle,
} from "./drawUtil";
import {
  Circle,
  distance,
  Line,
  midpoint,
  Point,
  randomCircleData,
  randomLineData,
} from "./geomUtil";

import { createMutable } from "solid-js/store";

const App: Component = () => {
  const showCoords = (e: any) => {
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
  };

  const RED = "#FF0000";
  const BLUE = "#0000FF";
  const GREEN = "#00FF00";
  const PURPLE = "#FF00FF";
  const WHITE = "#FFFFFF";

  const [snapRange, setSnapRange] = createSignal(20);
  const [endpointSnap, setEndpointSnap] = createSignal(true);
  const [midpointSnap, setMidpointSnap] = createSignal(false);
  const [centerpointSnap, setCenterpointSnap] = createSignal(true);
  const [quadrantSnap, setQuadrantSnap] = createSignal(false);
  const lineStore = createMutable<Line[]>([]);
  const circleStore = createMutable<Circle[]>([]);
  const selectionList = createMutable<Map<String, Point>>(new Map());

  const addSelection = function (
    objectId: string,
    label: string,
    point: Point
  ) {
    selectionList.set(`${objectId}_${label}`, point);
  };

  const removeSelection = function (objectId: string, label: string) {
    selectionList.delete(`${objectId}_${label}`);
  };

  const highlightOrClear = (
    geomPoint: Point,
    mousePoint: Point,
    redrawData: Line | Circle,
    redrawFunc: any, // TOOD FIX
    label: string,
    color: string
  ) => {
    if (distance(geomPoint, mousePoint) < snapRange()) {
      drawHighlight(geomPoint, color);
      addSelection(redrawData.id, label, geomPoint);
      return redrawData.id;
    }
    clearHighlight(geomPoint);
    redrawFunc(redrawData, { color: WHITE, width: 2 });
    redrawFunc(redrawData);
    removeSelection(redrawData.id, label);
    return null;
  };

  const nearAnyMidPoint = (mousePoint: Point) => {
    const lines = lineStore;
    for (let ii = 0; ii !== lines.length; ii++) {
      const lineMidpoint = midpoint(lines[ii]);
      highlightOrClear(
        lineMidpoint,
        mousePoint,
        lines[ii],
        drawLine,
        "MP",
        RED
      );
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
      const finished = highlightOrClear(
        endpoint1,
        mousePoint,
        lines[ii],
        drawLine,
        "EP1",
        GREEN
      );
      if (!finished) {
        highlightOrClear(
          endpoint2,
          mousePoint,
          lines[ii],
          drawLine,
          "EP2",
          GREEN
        );
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
      highlightOrClear(cp1, mousePoint, circles[ii], drawCircle, "CP", BLUE);
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

      finished = highlightOrClear(
        q1,
        mousePoint,
        circles[ii],
        drawCircle,
        "Q1",
        PURPLE
      );
      if (!finished) {
        finished = highlightOrClear(
          q2,
          mousePoint,
          circles[ii],
          drawCircle,
          "Q2",
          PURPLE
        );
      }
      if (!finished) {
        finished = highlightOrClear(
          q3,
          mousePoint,
          circles[ii],
          drawCircle,
          "Q3",
          PURPLE
        );
      }
      if (!finished) {
        finished = highlightOrClear(
          q4,
          mousePoint,
          circles[ii],
          drawCircle,
          "Q4",
          PURPLE
        );
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
      <h1>Oh, snap!</h1>
      <h2>A simple object snap demo</h2>
      <div>
        Create a few lines and circles, and mouse over them to see potential
        snap points. Desktop browser only, currently.
      </div>

      <div>

        <div>
          <button
            id="addLine"
            class="btn btn-primary"
            type="button"
            onClick={[drawRandomLine, null]}
          >
            Random Line
          </button>
          <button
            id="addCircle"
            class="btn btn-primary"
            type="button"
            onClick={[drawRandomCircle, null]}
          >
            Random Circle
          </button>
          <button
            id="addTest"
            class="btn btn-primary"
            type="button"
            onClick={[drawTestPattern, null]}
          >
            Test pattern
          </button>
        </div>

        <p class="topLabel">Snap to:</p>
        <div>
          <label>
            Midpoint
            <input type="checkbox" checked={midpointSnap()} onChange={(e) => setMidpointSnap(e.currentTarget.checked)}></input>
          </label>
          <label>
            Endpoint
            <input type="checkbox" checked={endpointSnap()} onChange={(e) => setEndpointSnap(e.currentTarget.checked)}></input>
          </label>
          <label>
            Centerpoint
            <input type="checkbox" checked={centerpointSnap()} onChange={(e) => setCenterpointSnap(e.currentTarget.checked)}></input>
          </label>
          <label>
            Quadrant
            <input type="checkbox" checked={quadrantSnap()} onChange={(e) => setQuadrantSnap(e.currentTarget.checked)}></input>
          </label>
        </div>

        <div>
          <p class="topLabel">Snap range size:</p>
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
              class="item left"
              onMouseMove={showCoords}
              width="300"
              height="300"
              id="drawingArea"
            ></canvas>
          </div>
          <div class="col">
            <p class="topLabel">Line data</p>
            <textarea readonly cols="60" rows="3" id="lineData">
            {lineStore.map((line) => `L: ${line.id}: \n`)}
            </textarea>
            <p class="topLabel">Circle data</p>
            <textarea readonly cols="60" rows="3" id="circleData">
            {circleStore.map((circle) => `C: ${circle.id}: \n`)}
            </textarea>
            <p class="topLabel">Selection data</p>
            <textarea readonly cols="40" rows="2" id="selectionData">
      
            </textarea>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
