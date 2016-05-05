/// <reference path="../../includes.ts"/>

declare var humanizeDuration: any;
declare var humandate: any;

module HawtioPipelineView {

  var pluginName = 'hawtio-pipeline-view';
  var log = Logger.get(pluginName);
  var _module = angular.module(pluginName, []);
  hawtioPluginLoader.addModule(pluginName);
  var templatePath = 'plugins/pipelineView/html';

  _module.run(() => {
    log.debug("loaded");
  });

  export function createBuildStatusBackgroundClass(result) {
    var $iconClass = "build-pending";
    if (result) {
      if (result === "FAILURE" || result === "FAILED") {
        $iconClass = "build-fail";
      } else if (result === "ABORTED" || result === "INTERUPTED") {
        $iconClass = "build-aborted";
      } else if (result === "SUCCESS" || result === "COMPLETE" || result === "COMPLETED") {
        $iconClass = "build-success";
      } else if (result === "NOT_STARTED") {
        $iconClass = "build-not-started";
      }
    }
    return $iconClass;
  }

  export function createBuildStatusIconClass(result) {
    var $iconClass = "fa fa-spinner fa-spin";
    if (result) {
      if (result === "FAILURE" || result === "FAILED") {
        // TODO not available yet
        $iconClass = "fa fa-exclamation-circle red";
      } else if (result === "ABORTED" || result === "INTERUPTED") {
        $iconClass = "fa fa-circle grey";
      } else if (result === "SUCCESS" || result === "COMPLETE" || result === "COMPLETED") {
        $iconClass = "fa fa-check-circle green";
      } else if (result === "NOT_STARTED") {
        $iconClass = "fa fa-circle-thin grey";
      }
    }
    return $iconClass;
  }

  _module.directive("hawtioPipelineView", () => {
    return {
      restrict: 'EA',
      templateUrl: 'plugins/pipelineView/html/pipelineView.html',
      controller: ['$scope', '$element', '$attrs', ($scope, $element, $attrs) => {
        // http://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
        function componentToHex(c) {
          var hex = c.toString(16);
          return hex.length == 1 ? "0" + hex : hex;
        }

        function rgbToHex(r, g, b) {
          return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
        }

        // set the top border color of each pipeline step
        $scope.borderStyle = (build, stage, $index) => {
          // #78DAF4
          var r = 120;
          var g = 218;
          var b = 244;
          r = Math.abs(r - ($index * 10));
          g = Math.abs(g - ($index * 10));
          b = Math.abs(b - ($index * 5));
          return {
            'border-color': rgbToHex(r, g, b)
          };
        }

        $scope.lastStage = (build):any => {
          if (build && build.stages && build.stages.length) {
            return _.last(build.stages);
          }
          // cater for no build stages
          if (build.building) {
            return {};
          } else {
            return {
              status: build.result,
              '$iconClass': createBuildStatusIconClass(build.result),
              '$backgroundClass': createBuildStatusBackgroundClass(build.result)
            };
          }
        }

      }]
    };
  }).filter('relativeTime', () => {
    return function(date) {
      return humandate.relativeTime(date);
    };
  }).filter('humanizeDuration', () => {
    return function (duration) {
      return humanizeDuration(duration, { round: true });
    };
  });
}
