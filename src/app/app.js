import angular from 'angular';


import 'bootstrap/dist/css/bootstrap.css';
import '../style/app.css';
import { v4 as uuidv4 } from 'uuid';

import { drawLine, drawRandomLine, getMousePos, drawHighlight, clearHighlight} from './drawUtil';
import { midpoint, distance} from './geomUtil';

let app = () => {
  return {
    template: require('./app.html'),
    controller: 'RenderCtrl',
    //controllerAs: 'app'
  }
};

const MODULE_NAME = 'app';

angular.module(MODULE_NAME, [])
  .directive('app', app)
  .controller("RenderCtrl", function ($scope, $window, $http) {

    $scope.showCoords = function (e) {
        const resultPoint = getMousePos(e);
        if ($scope.midpointSnap) {
          $scope.nearAnyMidPoint(resultPoint);

        }
        if ($scope.endpointSnap) {
          $scope.nearAnyEndPoint(resultPoint);
        }
    };

    $scope.snapRange = 12;

    $scope.endpointSnap = false;
    $scope.midpointSnap = false;

    $scope.toggleEndpoint = function () {
      $scope.endpointSnap = !$scope.endpointSnap;
    };

    $scope.toggleMidpoint = function () {
      $scope.midpointSnap = !$scope.midpointSnap;
    };

    $scope.mainRender = function () {
      console.log("Main render");
    };
    $scope.lineStore = {};
    $scope.nearAnyMidPoint = (point) => {
        var lines = Object.values($scope.lineStore)
        for (var ii = 0; ii != lines.length; ii++) {
          const mp = midpoint(lines[ii].x1, lines[ii].y1, lines[ii].x2, lines[ii].y2);
          if (distance(mp.x, mp.y, point.x, point.y) < $scope.snapRange) {
            drawHighlight(mp);
          }
          else {
            clearHighlight(mp);
            drawLine(lines[ii].x1, lines[ii].y1, lines[ii].x2, lines[ii].y2);
          }
        }
    };

    $scope.nearAnyEndPoint = (point) => {
      var lines = Object.values($scope.lineStore)
      for (var ii = 0; ii != lines.length; ii++) {
        const ep1 = {
          x: lines[ii].x1,
          y: lines[ii].y1,
        }
        const ep2 = {
          x: lines[ii].x2,
          y: lines[ii].y2,
        }
        if (distance(ep1.x, ep1.y, point.x, point.y) < $scope.snapRange) {
          drawHighlight(ep1);
        }
        else {
          clearHighlight(ep1);
          drawLine(lines[ii].x1, lines[ii].y1, lines[ii].x2, lines[ii].y2);
        }
        if (distance(ep2.x, ep2.y, point.x, point.y) < $scope.snapRange) {
          drawHighlight(ep2);
        }
        else {
          clearHighlight(ep2);
          drawLine(lines[ii].x1, lines[ii].y1, lines[ii].x2, lines[ii].y2);
        }
      }
  };

    $scope.storeLine = function(x1, y1, x2, y2) {
        const line = {
          id : uuidv4(),
          x1,
          y1,
          x2,
          y2,
        }
      $scope.lineStore[line.id] = line;
      console.log($scope.lineStore[line.id]);
    };

    $scope.drawRandomLine = function () {
      const line = drawRandomLine();
      $scope.storeLine(line.x1, line.y1, line.x2, line.y2);
    }
  
  });

export default MODULE_NAME;



