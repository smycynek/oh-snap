/* eslint-disable func-names */
/* eslint no-plusplus: ["error", { "allowForLoopAfterthoughts": true }] */

import angular from 'angular';

import 'bootstrap/dist/css/bootstrap.css';
import '../style/app.css';
import { v4 as uuidv4 } from 'uuid';

import {
  drawLine, drawCircle, drawRandomLine, drawRandomCircle,
  getMousePos, drawHighlight, clearHighlight,
} from './drawUtil';
import { midpoint, distance } from './geomUtil';

const app = () => ({
  // eslint-disable-next-line global-require
  template: require('./app.html'),
  controller: 'RenderCtrl',
});

const MODULE_NAME = 'app';

const RED = '#FF0000';
const BLUE = '#0000FF';
const GREEN = '#00FF00';
const PURPLE = '#FF00FF';
const WHITE = '#FFFFFF';

angular.module(MODULE_NAME, [])
  .directive('app', app)
  .controller('RenderCtrl', ($scope) => {
    $scope.showCoords = function (e) {
      const resultPoint = getMousePos(e);
      if ($scope.midpointSnap) {
        $scope.nearAnyMidPoint(resultPoint);
      }
      if ($scope.endpointSnap) {
        $scope.nearAnyEndPoint(resultPoint);
      }

      if ($scope.centerpointSnap) {
        $scope.nearAnyCenterPoint(resultPoint);
      }

      if ($scope.quadrantSnap) {
        $scope.nearAnyQuadrantPoint(resultPoint);
      }
    };

    $scope.snapRange = 20;
    $scope.endpointSnap = true;
    $scope.midpointSnap = false;
    $scope.centerpointSnap = true;
    $scope.quadrantSnap = false;

    $scope.lineStore = {};
    $scope.circleStore = {};

    $scope.mainRender = function () {
    };

    $scope.highlightOrClear = (geomPoint, mousePoint, redrawData, redrawFunc, color) => {
      if (distance(geomPoint, mousePoint) < $scope.snapRange) {
        drawHighlight(geomPoint, color);
        return redrawData.id;
      }
      clearHighlight(geomPoint);
      redrawFunc(redrawData, { color: WHITE, width: 2 });
      redrawFunc(redrawData);
    };

    $scope.nearAnyMidPoint = (mousePoint) => {
      const lines = Object.values($scope.lineStore);
      for (let ii = 0; ii !== lines.length; ii++) {
        const lineMidpoint = midpoint(lines[ii]);
        $scope.highlightOrClear(lineMidpoint, mousePoint, lines[ii], drawLine, RED);
      }
    };

    $scope.nearAnyEndPoint = (mousePoint) => {
      const lines = Object.values($scope.lineStore);
      for (let ii = 0; ii !== lines.length; ii++) {
        const endpoint1 = {
          x: lines[ii].x1,
          y: lines[ii].y1,
        };
        const endpoint2 = {
          x: lines[ii].x2,
          y: lines[ii].y2,
        };
        const finished = $scope.highlightOrClear(endpoint1, mousePoint, lines[ii], drawLine, '#00FF00');
        if (!finished) {
          $scope.highlightOrClear(endpoint2, mousePoint, lines[ii], drawLine, GREEN);
        }
      }
    };

    $scope.nearAnyCenterPoint = (mousePoint) => {
      const circles = Object.values($scope.circleStore);
      for (let ii = 0; ii !== circles.length; ii++) {
        const cp1 = {
          x: circles[ii].x,
          y: circles[ii].y,
        };
        $scope.highlightOrClear(cp1, mousePoint, circles[ii], drawCircle, BLUE);
      }
    };

    $scope.nearAnyQuadrantPoint = (mousePoint) => {
      const circles = Object.values($scope.circleStore);
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

        finished = $scope.highlightOrClear(q1, mousePoint, circles[ii], drawCircle, PURPLE);
        if (!finished) {
          finished = $scope.highlightOrClear(q2, mousePoint, circles[ii], drawCircle, PURPLE);
        }
        if (!finished) {
          finished = $scope.highlightOrClear(q3, mousePoint, circles[ii], drawCircle, PURPLE);
        }
        if (!finished) {
          finished = $scope.highlightOrClear(q4, mousePoint, circles[ii], drawCircle, PURPLE);
        }
      }
    };

    $scope.storeLine = function (line) {
      const lineData = {
        id: uuidv4(),
        x1: line.x1,
        y1: line.y1,
        x2: line.x2,
        y2: line.y2,
      };
      $scope.lineStore[lineData.id] = lineData;
    };

    $scope.storeCircle = function (circle) {
      const circleData = {
        id: uuidv4(),
        x: circle.x,
        y: circle.y,
        r: circle.r,
      };
      $scope.circleStore[circleData.id] = circleData;
    };

    $scope.drawRandomLine = function () {
      const line = drawRandomLine();
      $scope.storeLine(line);
    };

    $scope.drawRandomCircle = function () {
      const circle = drawRandomCircle();
      $scope.storeCircle(circle);
    };

    $scope.drawTestPattern = function () {
      const circle = { x: 250, y: 250, r: 50 };
      const line1 = {
        x1: 200, y1: 400, x2: 300, y2: 400,
      };
      drawLine(line1);
      $scope.storeLine(line1);
      const line2 = {
        x1: 200, y1: 380, x2: 200, y2: 300,
      };
      drawLine(line2);
      $scope.storeLine(line2);
      const line3 = {
        x1: 300, y1: 380, x2: 300, y2: 300,
      };
      drawLine(line3);
      $scope.storeLine(line3);
      drawCircle(circle);
      $scope.storeCircle(circle);
    };
  });

export default MODULE_NAME;
