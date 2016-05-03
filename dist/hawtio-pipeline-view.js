/// Copyright 2014-2015 Red Hat, Inc. and/or its affiliates
/// and other contributors as indicated by the @author tags.
///
/// Licensed under the Apache License, Version 2.0 (the "License");
/// you may not use this file except in compliance with the License.
/// You may obtain a copy of the License at
///
///   http://www.apache.org/licenses/LICENSE-2.0
///
/// Unless required by applicable law or agreed to in writing, software
/// distributed under the License is distributed on an "AS IS" BASIS,
/// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
/// See the License for the specific language governing permissions and
/// limitations under the License.
/// <reference path="../libs/hawtio-core-dts/defs.d.ts"/>
/// <reference path="../libs/hawtio-utilities/defs.d.ts"/>

/// <reference path="../../includes.ts"/>
var HawtioPipelineView;
(function (HawtioPipelineView) {
    var pluginName = 'hawtio-pipeline-view';
    var log = Logger.get(pluginName);
    var _module = angular.module(pluginName, []);
    hawtioPluginLoader.addModule(pluginName);
    var templatePath = 'plugins/pipelineView/html';
    _module.run(function () {
        log.debug("loaded");
    });
    function createBuildStatusBackgroundClass(result) {
        var $iconClass = "build-pending";
        if (result) {
            if (result === "FAILURE" || result === "FAILED") {
                $iconClass = "build-fail";
            }
            else if (result === "ABORTED" || result === "INTERUPTED") {
                $iconClass = "build-aborted";
            }
            else if (result === "SUCCESS" || result === "COMPLETE" || result === "COMPLETED") {
                $iconClass = "build-success";
            }
            else if (result === "NOT_STARTED") {
                $iconClass = "build-not-started";
            }
        }
        return $iconClass;
    }
    HawtioPipelineView.createBuildStatusBackgroundClass = createBuildStatusBackgroundClass;
    function createBuildStatusIconClass(result) {
        var $iconClass = "fa fa-spinner fa-spin";
        if (result) {
            if (result === "FAILURE" || result === "FAILED") {
                // TODO not available yet
                $iconClass = "fa fa-exclamation-circle red";
            }
            else if (result === "ABORTED" || result === "INTERUPTED") {
                $iconClass = "fa fa-circle grey";
            }
            else if (result === "SUCCESS" || result === "COMPLETE" || result === "COMPLETED") {
                $iconClass = "fa fa-check-circle green";
            }
            else if (result === "NOT_STARTED") {
                $iconClass = "fa fa-circle-thin grey";
            }
        }
        return $iconClass;
    }
    HawtioPipelineView.createBuildStatusIconClass = createBuildStatusIconClass;
    _module.directive("hawtioPipelineView", function () {
        return {
            restrict: 'EA',
            templateUrl: UrlHelpers.join(templatePath, 'pipelineView.html'),
            controller: ['$scope', '$element', '$attrs', function ($scope, $element, $attrs) {
                    // http://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
                    function componentToHex(c) {
                        var hex = c.toString(16);
                        return hex.length == 1 ? "0" + hex : hex;
                    }
                    function rgbToHex(r, g, b) {
                        return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
                    }
                    // set the top border color of each pipeline step
                    $scope.borderStyle = function (build, stage, $index) {
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
                    };
                    $scope.lastStage = function (build) {
                        if (build && build.stages && build.stages.length) {
                            return _.last(build.stages);
                        }
                        // cater for no build stages
                        if (build.building) {
                            return {};
                        }
                        else {
                            return {
                                status: build.result,
                                '$iconClass': createBuildStatusIconClass(build.result),
                                '$backgroundClass': createBuildStatusBackgroundClass(build.result)
                            };
                        }
                    };
                }]
        };
    });
})(HawtioPipelineView || (HawtioPipelineView = {}));

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluY2x1ZGVzLnRzIiwicGlwZWxpbmVWaWV3L3RzL3BpcGVsaW5lVmlld1BsdWdpbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSwyREFBMkQ7QUFDM0QsNERBQTREO0FBQzVELEdBQUc7QUFDSCxtRUFBbUU7QUFDbkUsb0VBQW9FO0FBQ3BFLDJDQUEyQztBQUMzQyxHQUFHO0FBQ0gsZ0RBQWdEO0FBQ2hELEdBQUc7QUFDSCx1RUFBdUU7QUFDdkUscUVBQXFFO0FBQ3JFLDRFQUE0RTtBQUM1RSx1RUFBdUU7QUFDdkUsa0NBQWtDO0FBRWxDLHlEQUF5RDtBQUN6RCwwREFBMEQ7O0FDaEIxRCx5Q0FBeUM7QUFFekMsSUFBTyxrQkFBa0IsQ0E2RnhCO0FBN0ZELFdBQU8sa0JBQWtCLEVBQUMsQ0FBQztJQUV6QixJQUFJLFVBQVUsR0FBRyxzQkFBc0IsQ0FBQztJQUN4QyxJQUFJLEdBQUcsR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ2pDLElBQUksT0FBTyxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQzdDLGtCQUFrQixDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUN6QyxJQUFJLFlBQVksR0FBRywyQkFBMkIsQ0FBQztJQUUvQyxPQUFPLENBQUMsR0FBRyxDQUFDO1FBQ1YsR0FBRyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUN0QixDQUFDLENBQUMsQ0FBQztJQUVILDBDQUFpRCxNQUFNO1FBQ3JELElBQUksVUFBVSxHQUFHLGVBQWUsQ0FBQztRQUNqQyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ1gsRUFBRSxDQUFDLENBQUMsTUFBTSxLQUFLLFNBQVMsSUFBSSxNQUFNLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQztnQkFDaEQsVUFBVSxHQUFHLFlBQVksQ0FBQztZQUM1QixDQUFDO1lBQUMsSUFBSSxDQUFDLEVB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QWxCLGtCQUFrQixRQTZGeEIiLCJmaWxlIjoiY29tcGlsZWQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLy8gQ29weXJpZ2h0IDIwMTQtMjAxNSBSZWQgSGF0LCBJbmMuIGFuZC9vciBpdHMgYWZmaWxpYXRlc1xuLy8vIGFuZCBvdGhlciBjb250cmlidXRvcnMgYXMgaW5kaWNhdGVkIGJ5IHRoZSBAYXV0aG9yIHRhZ3MuXG4vLy9cbi8vLyBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuLy8vIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbi8vLyBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbi8vL1xuLy8vICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4vLy9cbi8vLyBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4vLy8gZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuLy8vIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuLy8vIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbi8vLyBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cblxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL2xpYnMvaGF3dGlvLWNvcmUtZHRzL2RlZnMuZC50c1wiLz5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9saWJzL2hhd3Rpby11dGlsaXRpZXMvZGVmcy5kLnRzXCIvPlxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uLy4uL2luY2x1ZGVzLnRzXCIvPlxuXG5tb2R1bGUgSGF3dGlvUGlwZWxpbmVWaWV3IHtcblxuICB2YXIgcGx1Z2luTmFtZSA9ICdoYXd0aW8tcGlwZWxpbmUtdmlldyc7XG4gIHZhciBsb2cgPSBMb2dnZXIuZ2V0KHBsdWdpbk5hbWUpO1xuICB2YXIgX21vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKHBsdWdpbk5hbWUsIFtdKTtcbiAgaGF3dGlvUGx1Z2luTG9hZGVyLmFkZE1vZHVsZShwbHVnaW5OYW1lKTtcbiAgdmFyIHRlbXBsYXRlUGF0aCA9ICdwbHVnaW5zL3BpcGVsaW5lVmlldy9odG1sJztcblxuICBfbW9kdWxlLnJ1bigoKSA9PiB7XG4gICAgbG9nLmRlYnVnKFwibG9hZGVkXCIpO1xuICB9KTtcblxuICBleHBvcnQgZnVuY3Rpb24gY3JlYXRlQnVpbGRTdGF0dXNCYWNrZ3JvdW5kQ2xhc3MocmVzdWx0KSB7XG4gICAgdmFyICRpY29uQ2xhc3MgPSBcImJ1aWxkLXBlbmRpbmdcIjtcbiAgICBpZiAocmVzdWx0KSB7XG4gICAgICBpZiAocmVzdWx0ID09PSBcIkZBSUxVUkVcIiB8fCByZXN1bHQgPT09IFwiRkFJTEVEXCIpIHtcbiAgICAgICAgJGljb25DbGFzcyA9IFwiYnVpbGQtZmFpbFwiO1xuICAgICAgfSBlbHNlIGlmIChyZXN1bHQgPT09IFwiQUJPUlRFRFwiIHx8IHJlc3VsdCA9PT0gXCJJTlRFUlVQVEVEXCIpIHtcbiAgICAgICAgJGljb25DbGFzcyA9IFwiYnVpbGQtYWJvcnRlZFwiO1xuICAgICAgfSBlbHNlIGlmIChyZXN1bHQgPT09IFwiU1VDQ0VTU1wiIHx8IHJlc3VsdCA9PT0gXCJDT01QTEVURVwiIHx8IHJlc3VsdCA9PT0gXCJDT01QTEVURURcIikge1xuICAgICAgICAkaWNvbkNsYXNzID0gXCJidWlsZC1zdWNjZXNzXCI7XG4gICAgICB9IGVsc2UgaWYgKHJlc3VsdCA9PT0gXCJOT1RfU1RBUlRFRFwiKSB7XG4gICAgICAgICRpY29uQ2xhc3MgPSBcImJ1aWxkLW5vdC1zdGFydGVkXCI7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiAkaWNvbkNsYXNzO1xuICB9XG5cbiAgZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUJ1aWxkU3RhdHVzSWNvbkNsYXNzKHJlc3VsdCkge1xuICAgIHZhciAkaWNvbkNsYXNzID0gXCJmYSBmYS1zcGlubmVyIGZhLXNwaW5cIjtcbiAgICBpZiAocmVzdWx0KSB7XG4gICAgICBpZiAocmVzdWx0ID09PSBcIkZBSUxVUkVcIiB8fCByZXN1bHQgPT09IFwiRkFJTEVEXCIpIHtcbiAgICAgICAgLy8gVE9ETyBub3QgYXZhaWxhYmxlIHlldFxuICAgICAgICAkaWNvbkNsYXNzID0gXCJmYSBmYS1leGNsYW1hdGlvbi1jaXJjbGUgcmVkXCI7XG4gICAgICB9IGVsc2UgaWYgKHJlc3VsdCA9PT0gXCJBQk9SVEVEXCIgfHwgcmVzdWx0ID09PSBcIklOVEVSVVBURURcIikge1xuICAgICAgICAkaWNvbkNsYXNzID0gXCJmYSBmYS1jaXJjbGUgZ3JleVwiO1xuICAgICAgfSBlbHNlIGlmIChyZXN1bHQgPT09IFwiU1VDQ0VTU1wiIHx8IHJlc3VsdCA9PT0gXCJDT01QTEVURVwiIHx8IHJlc3VsdCA9PT0gXCJDT01QTEVURURcIikge1xuICAgICAgICAkaWNvbkNsYXNzID0gXCJmYSBmYS1jaGVjay1jaXJjbGUgZ3JlZW5cIjtcbiAgICAgIH0gZWxzZSBpZiAocmVzdWx0ID09PSBcIk5PVF9TVEFSVEVEXCIpIHtcbiAgICAgICAgJGljb25DbGFzcyA9IFwiZmEgZmEtY2lyY2xlLXRoaW4gZ3JleVwiO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gJGljb25DbGFzcztcbiAgfVxuXG4gIF9tb2R1bGUuZGlyZWN0aXZlKFwiaGF3dGlvUGlwZWxpbmVWaWV3XCIsICgpID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdFQScsXG4gICAgICB0ZW1wbGF0ZVVybDogVXJsSGVscGVycy5qb2luKHRlbXBsYXRlUGF0aCwgJ3BpcGVsaW5lVmlldy5odG1sJyksXG4gICAgICBjb250cm9sbGVyOiBbJyRzY29wZScsICckZWxlbWVudCcsICckYXR0cnMnLCAoJHNjb3BlLCAkZWxlbWVudCwgJGF0dHJzKSA9PiB7XG4gICAgICAgIC8vIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvNTYyMzgzOC9yZ2ItdG8taGV4LWFuZC1oZXgtdG8tcmdiXG4gICAgICAgIGZ1bmN0aW9uIGNvbXBvbmVudFRvSGV4KGMpIHtcbiAgICAgICAgICB2YXIgaGV4ID0gYy50b1N0cmluZygxNik7XG4gICAgICAgICAgcmV0dXJuIGhleC5sZW5ndGggPT0gMSA/IFwiMFwiICsgaGV4IDogaGV4O1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gcmdiVG9IZXgociwgZywgYikge1xuICAgICAgICAgIHJldHVybiBcIiNcIiArIGNvbXBvbmVudFRvSGV4KHIpICsgY29tcG9uZW50VG9IZXgoZykgKyBjb21wb25lbnRUb0hleChiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHNldCB0aGUgdG9wIGJvcmRlciBjb2xvciBvZiBlYWNoIHBpcGVsaW5lIHN0ZXBcbiAgICAgICAgJHNjb3BlLmJvcmRlclN0eWxlID0gKGJ1aWxkLCBzdGFnZSwgJGluZGV4KSA9PiB7XG4gICAgICAgICAgLy8gIzc4REFGNFxuICAgICAgICAgIHZhciByID0gMTIwO1xuICAgICAgICAgIHZhciBnID0gMjE4O1xuICAgICAgICAgIHZhciBiID0gMjQ0O1xuICAgICAgICAgIHIgPSBNYXRoLmFicyhyIC0gKCRpbmRleCAqIDEwKSk7XG4gICAgICAgICAgZyA9IE1hdGguYWJzKGcgLSAoJGluZGV4ICogMTApKTtcbiAgICAgICAgICBiID0gTWF0aC5hYnMoYiAtICgkaW5kZXggKiA1KSk7XG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICdib3JkZXItY29sb3InOiByZ2JUb0hleChyLCBnLCBiKVxuICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICAkc2NvcGUubGFzdFN0YWdlID0gKGJ1aWxkKTphbnkgPT4ge1xuICAgICAgICAgIGlmIChidWlsZCAmJiBidWlsZC5zdGFnZXMgJiYgYnVpbGQuc3RhZ2VzLmxlbmd0aCkge1xuICAgICAgICAgICAgcmV0dXJuIF8ubGFzdChidWlsZC5zdGFnZXMpO1xuICAgICAgICAgIH1cbiAgICAgICAgICAvLyBjYXRlciBmb3Igbm8gYnVpbGQgc3RhZ2VzXG4gICAgICAgICAgaWYgKGJ1aWxkLmJ1aWxkaW5nKSB7XG4gICAgICAgICAgICByZXR1cm4ge307XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgIHN0YXR1czogYnVpbGQucmVzdWx0LFxuICAgICAgICAgICAgICAnJGljb25DbGFzcyc6IGNyZWF0ZUJ1aWxkU3RhdHVzSWNvbkNsYXNzKGJ1aWxkLnJlc3VsdCksXG4gICAgICAgICAgICAgICckYmFja2dyb3VuZENsYXNzJzogY3JlYXRlQnVpbGRTdGF0dXNCYWNrZ3JvdW5kQ2xhc3MoYnVpbGQucmVzdWx0KVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgfV1cbiAgICB9O1xuICB9KTtcbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==

angular.module("hawtio-pipeline-view-templates", []).run(["$templateCache", function($templateCache) {$templateCache.put("plugins/pipelineView/html/pipelineView.html","<div class=\"panel-group\">\n  <div class=\"panel panel-default\">\n    <div class=\"panel-heading\">\n      <h2 class=\"panel-title\">\n        <a data-toggle=\"collapse\" data-parent=\".panel-group\" href=\"#build-{{build.id}}\">\n          Build {{build.displayName}}\n          </a><span class=\"build-links\" ng-show=\"listView\">\n          <span class=\"line-spacer\">|</span>\n          <a ng-href=\"{{build.$logLink}}\">Build Results <i class=\"fa fa-caret-right\"></i></a>\n          </span>\n        <span ng-show=\"build.building\" class=\"pull-right\" title=\"This build started at {{build.$timestamp}}\">\n          <span ng-show=\"lastStage(build).stageName\"> {{lastStage(build).stageName}} | </span>Started {{build.$timestamp | relativeTime}}\n        </span>\n        <span ng-hide=\"build.building\" class=\"pull-right\" title=\"This build started at {{build.$timestamp}}\">\n          <i class=\"{{lastStage(build).$iconClass}}\"></i>&nbsp;\n          <span ng-switch on=\"lastStage(build).status\">\n            <!-- TODO add more cases -->\n            <span ng-switch-when=\"SUCCESS\">Complete!</span>\n            <span ng-switch-when=\"ABORTED\">Aborted</span>\n            <span ng-switch-when=\"INTERUPTED\">Aborted</span>\n            <span ng-switch-default>Failed</span>\n          </span>\n          &nbsp;| Started {{build.$timestamp | relativeTime}}\n        </span>\n      </h2>\n    </div>\n\n    <div id=\"build-{{build.id}}\" class=\"panel-collapse collapse in\">\n      <div class=\"panel-body pipeline-panel\">\n\n        <div class=\"row\">\n          <div class=\"col-md-12\">\n\n            <div class=\"pipeline-view\">\n              <div ng-repeat=\"stage in build.stages | filter:model.filterText track by $index\" class=\"pipeline-deploy inline-block {{build.result}}\" ng-style=\"borderStyle(build, stage, $index)\" title=\"This stage started {{stage.$startTime | relativeTime}}\" >\n                <div class=\"pipeline-deploy-box\">\n                  <div class=\"text-center stageName\" title=\"{{stage.status}}\">\n                    <a href=\"{{stage.$viewLink}}\" target=\"jenkins\">\n                      <b>{{stage.stageName}}</b>\n                    </a>\n                  </div>\n                  <div class=\"text-center stage-status\">\n                    <div>\n                      <i class=\"fa-2x {{stage.$iconClass}} stage-icon\"></i>\n                    </div>\n                    <div class=\"stage-bar {{stage.$backgroundClass}}\"></div>\n                  </div>\n                  <div class=\"text-center stageStartTime\">\n                    <a href=\"{{stage.$logLink}}\" title=\"View the logs of this stage\">\n                      <span ng-show=\"stage.duration >= 0\">{{stage.duration | humanizeDuration}}</span>\n                      <span ng-hide=\"stage.duration < 0\">&nbsp;</span>\n                    </a>\n                  </div>\n                </div>\n              </div>\n              <div ng-show=\"!build.building\" class=\"pipeline-deploy inline-block pipeline-end {{lastStage(build).$backgroundClass}} {{build.result}}\">\n                <div class=\"pipeline-deploy-box\">\n                  <div>&nbsp;</div>\n                  <div class=\"text-center pipeline-result\">\n                    <b ng-switch on=\"build.result\">\n                      Build #{{build.number}}\n                      <!-- TODO add more cases -->\n                      <span ng-switch-when=\"SUCCESS\">Complete!</span>\n                      <span ng-switch-when=\"ABORTED\">Aborted</span>\n                      <span ng-switch-default>Failed</span>\n                    </b>\n                  </div>\n                  <div>&nbsp;</div>\n                </div>\n              </div>\n            </div>\n\n          </div>\n        </div>\n\n        <!-- handy for debugging -->\n        <!--\n        <div class=\"row\">\n          <div class=\"col-md-12\">\n            <pre>\n              {{build | json}}\n            </pre>\n          </div>\n        </div>\n        -->\n\n        <div class=\"row\" ng-show=\"!listView && hideLogs && !build.building\">\n          <div class=\"col-md-12 log-section\">\n            <a href=\"{{build.$logLink}}\" class=\"pull-right\">View Full Log</a>\n          </div>\n        </div>\n        <div class=\"row\" ng-hide=\"hideLogs && !build.building\">\n          <div class=\"col-md-12 log-section\">\n            <h4 class=\"inline-block\">Logs</h4>\n            <a href=\"{{build.$logLink}}\" class=\"pull-right log-link\">View Full Log</a>\n            <hawtio-build-log-panel></hawtio-build-log-panel>\n          </div>\n        </div>\n\n      </div>\n    </div>\n\n\n  </div>\n</div>\n");}]); hawtioPluginLoader.addModule("hawtio-pipeline-view-templates");