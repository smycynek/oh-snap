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

    $scope.snapRange = 15;
    $scope.endpointSnap = true;
    $scope.midpointSnap = false;
    $scope.centerpointSnap = true;
    $scope.quadrantSnap = false;

    $scope.lineStore = {};
    $scope.circleStore = {};

    $scope.mainRender = function () {
    };

    $scope.highlightOrClear = (geomPoint, mousePoint, line) => {
      if (distance(geomPoint.x, geomPoint.y, mousePoint.x, mousePoint.y) < $scope.snapRange) {
        drawHighlight(geomPoint);
        return true;
      }
      clearHighlight(geomPoint);
      drawLine(line.x1, line.y1, line.x2, line.y2, { color: '#FFFFFF', width: 2 });
      drawLine(line.x1, line.y1, line.x2, line.y2);
      return false;
    };

    $scope.highlightOrClearC = (geomPoint, mousePoint, circle) => {
      if (distance(geomPoint.x, geomPoint.y, mousePoint.x, mousePoint.y) < $scope.snapRange) {
        drawHighlight(geomPoint);
        return true;
      }

      clearHighlight(geomPoint);
      drawCircle(circle.x, circle.y, circle.r, { color: '#FFFFFF', width: 2 });
      drawCircle(circle.x, circle.y, circle.r);
      return false;
    };

    $scope.nearAnyMidPoint = (mousePoint) => {
      const lines = Object.values($scope.lineStore);
      for (let ii = 0; ii !== lines.length; ii++) {
        const midp = midpoint(lines[ii].x1, lines[ii].y1, lines[ii].x2, lines[ii].y2);
        $scope.highlightOrClear(midp, mousePoint, lines[ii]);
      }
    };

    $scope.nearAnyEndPoint = (mousePoint) => {
      const lines = Object.values($scope.lineStore);
      for (let ii = 0; ii !== lines.length; ii++) {
        const ep1 = {
          x: lines[ii].x1,
          y: lines[ii].y1,
        };
        // TODO -- consistent interface of point vs x,y params
        const ep2 = {
          x: lines[ii].x2,
          y: lines[ii].y2,
        };
        $scope.highlightOrClear(ep1, mousePoint, lines[ii]);
        $scope.highlightOrClear(ep2, mousePoint, lines[ii]);
      }
    };

    $scope.nearAnyCenterPoint = (mousePoint) => {
      const circles = Object.values($scope.circleStore);
      for (let ii = 0; ii !== circles.length; ii++) {
        const cp1 = {
          x: circles[ii].x,
          y: circles[ii].y,
        };
        $scope.highlightOrClearC(cp1, mousePoint, circles[ii]);
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

        let finished = false;

        finished = $scope.highlightOrClearC(q1, mousePoint, circles[ii]);
        if (!finished) {
          finished = $scope.highlightOrClearC(q2, mousePoint, circles[ii]);
        }
        if (!finished) {
          finished = $scope.highlightOrClearC(q3, mousePoint, circles[ii]);
        }
        if (!finished) {
          finished = $scope.highlightOrClearC(q4, mousePoint, circles[ii]);
        }
      }
    };

    $scope.storeLine = function (x1, y1, x2, y2) {
      const line = {
        id: uuidv4(),
        x1,
        y1,
        x2,
        y2,
      };
      $scope.lineStore[line.id] = line;
    };

    $scope.storeCircle = function (x, y, r) {
      const circle = {
        id: uuidv4(),
        x,
        y,
        r,
      };
      $scope.circleStore[circle.id] = circle;
    };

    $scope.drawRandomLine = function () {
      const line = drawRandomLine();
      $scope.storeLine(line.x1, line.y1, line.x2, line.y2);
    };

    $scope.drawRandomCircle = function () {
      const circle = drawRandomCircle();
      $scope.storeCircle(circle.x, circle.y, circle.r);
    };
  });

export default MODULE_NAME;
