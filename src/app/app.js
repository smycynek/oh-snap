import angular from 'angular';

import '../style/app.css';
import 'bootstrap/dist/css/bootstrap.css';

const canvas_id = 'line_area';

function getContext() {
  const canvas = document.getElementById(canvas_id);
  const context = canvas.getContext("2d");
  return context;
}

const LINE_MIN = 50;
const LINE_MAX = 450;

const CIRCLE_CENTER_MIN=100;
const CIRCLE_CENTER_MAX=400;

const CIRCLE_RADIUS_MIN = 50;
const CIRCLE_RADIUS_MAX = 90;

function randomIntBounds(min, max) {
  var value = Math.floor(Math.random() * (max-min)) + min;
  console.log(value);
  return value;
}

const randomCirclePosition = function () {
    return randomIntBounds(CIRCLE_CENTER_MIN, CIRCLE_CENTER_MAX);
};

const randomCircleRadius = function () {
  return randomIntBounds(CIRCLE_RADIUS_MIN, CIRCLE_RADIUS_MAX)
};

const randomLinePosition = function () {
  return randomIntBounds(LINE_MIN, LINE_MAX);
};

const randomCircleData = function() {
  return {
    x: randomCirclePosition(),
    y: randomCirclePosition(),
    radius: randomCircleRadius()
  };
};


const randomLineData = function() {
  return {
    x1: randomLinePosition(),
    y1: randomLinePosition(),
    x2: randomLinePosition(),
    y2: randomLinePosition()
  };
};


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

    $scope.mainRender = function () {
      console.log("Main render");
    };
  
    $scope.getContext = function() {
      const canvas = document.getElementById(canvas_id);
      const context = canvas.getContext("2d");
      return context;
      };
      
    $scope.drawRandomCircle = function () {
      var circle = randomCircleData();
      $scope.drawCircle(circle.x, circle.y, circle.radius);
    }
  
    $scope.drawRandomLine = function () {
      var line = randomLineData();
      $scope.drawLine(line.x1, line.y1, line.x2, line.y2);
    }
  
    $scope.drawCircle = function (x, y, r) {
      const context = getContext()
      context.beginPath();
      context.arc(x, y, r, 0, 2 * Math.PI);
      context.stroke();
    };
  
    $scope.drawLine = function (x1, y1, x2, y2) {
      const context = getContext()
      context.beginPath();
      context.moveTo(x1, y1);
      context.lineTo(x2, y2);
      context.stroke();
    };
  
  });

export default MODULE_NAME;



