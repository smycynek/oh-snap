import angular from 'angular';


import 'bootstrap/dist/css/bootstrap.css';
import '../style/app.css';

import {drawRandomCircle, drawRandomLine, getMousePos, drawHighlight} from './drawUtil';
import {uuidv4 , midpoint, distance} from './geomUtil';

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
    $scope.overlay = "visible";

    $scope.toggleOverlay = function () {
      $scope.overlay = ($scope.overlay == "none") ? "visible" : "none";
    };

    $scope.showCoords = function (e) {
        const resultPoint = getMousePos(e);
        $scope.nearAnyMidPoint(resultPoint);
    };

    $scope.test = () => {
      alert("TEST");
    };

    $scope.mainRender = function () {
      console.log("Main render");
    };
    $scope.lineStore = {};
    $scope.nearAnyMidPoint = (point) => {
        console.log(point);
        var lines = Object.values($scope.lineStore)
        for (var ii = 0; ii != lines.length; ii++) {
          const mp = midpoint(lines[ii].x1, lines[ii].y1, lines[ii].x2, lines[ii].y2);
          console.log(mp);
          console.log("--")
          if (distance(mp.x, mp.y, point.x, point.y) < 50) {
            drawHighlight(mp);
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

    $scope.drawRandomCircle = function () {
      drawRandomCircle();
    }
  
    $scope.drawRandomLine = function () {
      const line = drawRandomLine();
      $scope.storeLine(line.x1, line.y1, line.x2, line.y2);

  
    }
  
  });

export default MODULE_NAME;



