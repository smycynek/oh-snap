import angular from 'angular';


import 'bootstrap/dist/css/bootstrap.css';
import '../style/app.css';

import {drawRandomCircle, drawRandomLine} from './drawUtil';

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
    $scope.showEndpoints = false;

    $scope.toggleEndpoints = function () {
      $scope.showEndpoints = ! $scope.showEndpoints;
    };

    $scope.mainRender = function () {
      console.log("Main render");
    };
    $scope.lineStore = [];
    $scope.storeLine = function(x1, y1, x2, y2) {
        const line = {
          x1,
          y1,
          x2,
          y2,
        }
      lineStore.push(line);
    };

    $scope.drawRandomCircle = function () {
      drawRandomCircle();
    }
  
    $scope.drawRandomLine = function () {
      drawRandomLine();
    }
  
  });

export default MODULE_NAME;



