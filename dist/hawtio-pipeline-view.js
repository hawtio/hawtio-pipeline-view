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
            templateUrl: 'plugins/pipelineView/html/pipelineView.html',
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
                        if (!build) {
                            return {};
                        }
                        if (build.stages && build.stages.length) {
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
    }).filter('relativeTime', function () {
        return function (date) {
            return humandate.relativeTime(date);
        };
    }).filter('humanizeDuration', function () {
        return function (duration) {
            return humanizeDuration(duration, { round: true });
        };
    });
})(HawtioPipelineView || (HawtioPipelineView = {}));

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluY2x1ZGVzLnRzIiwicGlwZWxpbmVWaWV3L3RzL3BpcGVsaW5lVmlld1BsdWdpbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSwyREFBMkQ7QUFDM0QsNERBQTREO0FBQzVELEdBQUc7QUFDSCxtRUFBbUU7QUFDbkUsb0VBQW9FO0FBQ3BFLDJDQUEyQztBQUMzQyxHQUFHO0FBQ0gsZ0RBQWdEO0FBQ2hELEdBQUc7QUFDSCx1RUFBdUU7QUFDdkUscUVBQXFFO0FBQ3JFLDRFQUE0RTtBQUM1RSx1RUFBdUU7QUFDdkUsa0NBQWtDO0FBRWxDLHlEQUF5RDs7QUNmekQseUNBQXlDO0FBS3pDLElBQU8sa0JBQWtCLENBd0d4QjtBQXhHRCxXQUFPLGtCQUFrQixFQUFDLENBQUM7SUFFekIsSUFBSSxVQUFVLEdBQUcsc0JBQXNCLENBQUM7SUFDeEMsSUFBSSxHQUFHLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUNqQyxJQUFJLE9BQU8sR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUM3QyxrQkFBa0IsQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDekMsSUFBSSxZQUFZLEdBQUcsMkJBQTJCLENBQUM7SUFFL0MsT0FBTyxDQUFDLEdBQUcsQ0FBQztRQUNWLEdBQUcsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDdEIsQ0FBQyxDQUFDLENBQUM7SUFFSCwwQ0FBaUQsTUFBTTtRQUNyRCxJQUFJLFVBQVUsR0FBRyxlQUFlLENBQUM7UUFDakMsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUNYLEVBQUUsQ0FBQyxDQUFDLE1BQU0sS0FBSyxTQUFTLElBQUksTUFBTSxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUM7Z0JBQ2hELFVBQVUsR0FBRyxZQUFZLENBQUM7WUFDNUIsQ0FBQztZQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxN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QUFNLENBQUMsY0FBYyxFQUFFO1FBQ3hCLE1BQU0sQ0FBQyxVQUFTLElBQUk7WUFDbEIsTUFBTSxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDdEMsQ0FBQyxDQUFDO0lBQ0osQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLGtCQUFrQixFQUFFO1FBQzVCLE1BQU0sQ0FBQyxVQUFVLFFBQVE7WUFDdkIsTUFBTSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsRUFBRSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO1FBQ3JELENBQUMsQ0FBQztJQUNKLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxFQXhHTSxrQkFBa0IsS0FBbEIsa0JBQWtCLFFBd0d4QiIsImZpbGUiOiJjb21waWxlZC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vLyBDb3B5cmlnaHQgMjAxNC0yMDE1IFJlZCBIYXQsIEluYy4gYW5kL29yIGl0cyBhZmZpbGlhdGVzXG4vLy8gYW5kIG90aGVyIGNvbnRyaWJ1dG9ycyBhcyBpbmRpY2F0ZWQgYnkgdGhlIEBhdXRob3IgdGFncy5cbi8vL1xuLy8vIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4vLy8geW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuLy8vIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuLy8vXG4vLy8gICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbi8vL1xuLy8vIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbi8vLyBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4vLy8gV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4vLy8gU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuLy8vIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vbGlicy9oYXd0aW8tY29yZS1kdHMvZGVmcy5kLnRzXCIvPlxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uLy4uL2luY2x1ZGVzLnRzXCIvPlxuXG5kZWNsYXJlIHZhciBodW1hbml6ZUR1cmF0aW9uOiBhbnk7XG5kZWNsYXJlIHZhciBodW1hbmRhdGU6IGFueTtcblxubW9kdWxlIEhhd3Rpb1BpcGVsaW5lVmlldyB7XG5cbiAgdmFyIHBsdWdpbk5hbWUgPSAnaGF3dGlvLXBpcGVsaW5lLXZpZXcnO1xuICB2YXIgbG9nID0gTG9nZ2VyLmdldChwbHVnaW5OYW1lKTtcbiAgdmFyIF9tb2R1bGUgPSBhbmd1bGFyLm1vZHVsZShwbHVnaW5OYW1lLCBbXSk7XG4gIGhhd3Rpb1BsdWdpbkxvYWRlci5hZGRNb2R1bGUocGx1Z2luTmFtZSk7XG4gIHZhciB0ZW1wbGF0ZVBhdGggPSAncGx1Z2lucy9waXBlbGluZVZpZXcvaHRtbCc7XG5cbiAgX21vZHVsZS5ydW4oKCkgPT4ge1xuICAgIGxvZy5kZWJ1ZyhcImxvYWRlZFwiKTtcbiAgfSk7XG5cbiAgZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUJ1aWxkU3RhdHVzQmFja2dyb3VuZENsYXNzKHJlc3VsdCkge1xuICAgIHZhciAkaWNvbkNsYXNzID0gXCJidWlsZC1wZW5kaW5nXCI7XG4gICAgaWYgKHJlc3VsdCkge1xuICAgICAgaWYgKHJlc3VsdCA9PT0gXCJGQUlMVVJFXCIgfHwgcmVzdWx0ID09PSBcIkZBSUxFRFwiKSB7XG4gICAgICAgICRpY29uQ2xhc3MgPSBcImJ1aWxkLWZhaWxcIjtcbiAgICAgIH0gZWxzZSBpZiAocmVzdWx0ID09PSBcIkFCT1JURURcIiB8fCByZXN1bHQgPT09IFwiSU5URVJVUFRFRFwiKSB7XG4gICAgICAgICRpY29uQ2xhc3MgPSBcImJ1aWxkLWFib3J0ZWRcIjtcbiAgICAgIH0gZWxzZSBpZiAocmVzdWx0ID09PSBcIlNVQ0NFU1NcIiB8fCByZXN1bHQgPT09IFwiQ09NUExFVEVcIiB8fCByZXN1bHQgPT09IFwiQ09NUExFVEVEXCIpIHtcbiAgICAgICAgJGljb25DbGFzcyA9IFwiYnVpbGQtc3VjY2Vzc1wiO1xuICAgICAgfSBlbHNlIGlmIChyZXN1bHQgPT09IFwiTk9UX1NUQVJURURcIikge1xuICAgICAgICAkaWNvbkNsYXNzID0gXCJidWlsZC1ub3Qtc3RhcnRlZFwiO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gJGljb25DbGFzcztcbiAgfVxuXG4gIGV4cG9ydCBmdW5jdGlvbiBjcmVhdGVCdWlsZFN0YXR1c0ljb25DbGFzcyhyZXN1bHQpIHtcbiAgICB2YXIgJGljb25DbGFzcyA9IFwiZmEgZmEtc3Bpbm5lciBmYS1zcGluXCI7XG4gICAgaWYgKHJlc3VsdCkge1xuICAgICAgaWYgKHJlc3VsdCA9PT0gXCJGQUlMVVJFXCIgfHwgcmVzdWx0ID09PSBcIkZBSUxFRFwiKSB7XG4gICAgICAgIC8vIFRPRE8gbm90IGF2YWlsYWJsZSB5ZXRcbiAgICAgICAgJGljb25DbGFzcyA9IFwiZmEgZmEtZXhjbGFtYXRpb24tY2lyY2xlIHJlZFwiO1xuICAgICAgfSBlbHNlIGlmIChyZXN1bHQgPT09IFwiQUJPUlRFRFwiIHx8IHJlc3VsdCA9PT0gXCJJTlRFUlVQVEVEXCIpIHtcbiAgICAgICAgJGljb25DbGFzcyA9IFwiZmEgZmEtY2lyY2xlIGdyZXlcIjtcbiAgICAgIH0gZWxzZSBpZiAocmVzdWx0ID09PSBcIlNVQ0NFU1NcIiB8fCByZXN1bHQgPT09IFwiQ09NUExFVEVcIiB8fCByZXN1bHQgPT09IFwiQ09NUExFVEVEXCIpIHtcbiAgICAgICAgJGljb25DbGFzcyA9IFwiZmEgZmEtY2hlY2stY2lyY2xlIGdyZWVuXCI7XG4gICAgICB9IGVsc2UgaWYgKHJlc3VsdCA9PT0gXCJOT1RfU1RBUlRFRFwiKSB7XG4gICAgICAgICRpY29uQ2xhc3MgPSBcImZhIGZhLWNpcmNsZS10aGluIGdyZXlcIjtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuICRpY29uQ2xhc3M7XG4gIH1cblxuICBfbW9kdWxlLmRpcmVjdGl2ZShcImhhd3Rpb1BpcGVsaW5lVmlld1wiLCAoKSA9PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiAnRUEnLFxuICAgICAgdGVtcGxhdGVVcmw6ICdwbHVnaW5zL3BpcGVsaW5lVmlldy9odG1sL3BpcGVsaW5lVmlldy5odG1sJyxcbiAgICAgIGNvbnRyb2xsZXI6IFsnJHNjb3BlJywgJyRlbGVtZW50JywgJyRhdHRycycsICgkc2NvcGUsICRlbGVtZW50LCAkYXR0cnMpID0+IHtcbiAgICAgICAgLy8gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy81NjIzODM4L3JnYi10by1oZXgtYW5kLWhleC10by1yZ2JcbiAgICAgICAgZnVuY3Rpb24gY29tcG9uZW50VG9IZXgoYykge1xuICAgICAgICAgIHZhciBoZXggPSBjLnRvU3RyaW5nKDE2KTtcbiAgICAgICAgICByZXR1cm4gaGV4Lmxlbmd0aCA9PSAxID8gXCIwXCIgKyBoZXggOiBoZXg7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiByZ2JUb0hleChyLCBnLCBiKSB7XG4gICAgICAgICAgcmV0dXJuIFwiI1wiICsgY29tcG9uZW50VG9IZXgocikgKyBjb21wb25lbnRUb0hleChnKSArIGNvbXBvbmVudFRvSGV4KGIpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gc2V0IHRoZSB0b3AgYm9yZGVyIGNvbG9yIG9mIGVhY2ggcGlwZWxpbmUgc3RlcFxuICAgICAgICAkc2NvcGUuYm9yZGVyU3R5bGUgPSAoYnVpbGQsIHN0YWdlLCAkaW5kZXgpID0+IHtcbiAgICAgICAgICAvLyAjNzhEQUY0XG4gICAgICAgICAgdmFyIHIgPSAxMjA7XG4gICAgICAgICAgdmFyIGcgPSAyMTg7XG4gICAgICAgICAgdmFyIGIgPSAyNDQ7XG4gICAgICAgICAgciA9IE1hdGguYWJzKHIgLSAoJGluZGV4ICogMTApKTtcbiAgICAgICAgICBnID0gTWF0aC5hYnMoZyAtICgkaW5kZXggKiAxMCkpO1xuICAgICAgICAgIGIgPSBNYXRoLmFicyhiIC0gKCRpbmRleCAqIDUpKTtcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgJ2JvcmRlci1jb2xvcic6IHJnYlRvSGV4KHIsIGcsIGIpXG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuXG4gICAgICAgICRzY29wZS5sYXN0U3RhZ2UgPSAoYnVpbGQpOmFueSA9PiB7XG4gICAgICAgICAgaWYgKCFidWlsZCkge1xuICAgICAgICAgICAgcmV0dXJuIHt9O1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoYnVpbGQuc3RhZ2VzICYmIGJ1aWxkLnN0YWdlcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJldHVybiBfLmxhc3QoYnVpbGQuc3RhZ2VzKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgLy8gY2F0ZXIgZm9yIG5vIGJ1aWxkIHN0YWdlc1xuICAgICAgICAgIGlmIChidWlsZC5idWlsZGluZykge1xuICAgICAgICAgICAgcmV0dXJuIHt9O1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICBzdGF0dXM6IGJ1aWxkLnJlc3VsdCxcbiAgICAgICAgICAgICAgJyRpY29uQ2xhc3MnOiBjcmVhdGVCdWlsZFN0YXR1c0ljb25DbGFzcyhidWlsZC5yZXN1bHQpLFxuICAgICAgICAgICAgICAnJGJhY2tncm91bmRDbGFzcyc6IGNyZWF0ZUJ1aWxkU3RhdHVzQmFja2dyb3VuZENsYXNzKGJ1aWxkLnJlc3VsdClcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgIH1dXG4gICAgfTtcbiAgfSkuZmlsdGVyKCdyZWxhdGl2ZVRpbWUnLCAoKSA9PiB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKGRhdGUpIHtcbiAgICAgIHJldHVybiBodW1hbmRhdGUucmVsYXRpdmVUaW1lKGRhdGUpO1xuICAgIH07XG4gIH0pLmZpbHRlcignaHVtYW5pemVEdXJhdGlvbicsICgpID0+IHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGR1cmF0aW9uKSB7XG4gICAgICByZXR1cm4gaHVtYW5pemVEdXJhdGlvbihkdXJhdGlvbiwgeyByb3VuZDogdHJ1ZSB9KTtcbiAgICB9O1xuICB9KTtcbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==

angular.module("hawtio-pipeline-view-templates", []).run(["$templateCache", function($templateCache) {$templateCache.put("plugins/pipelineView/html/pipelineView.html","<div class=\"panel-group\">\n  <div class=\"panel panel-default\">\n    <div class=\"panel-heading\">\n      <h2 class=\"panel-title\">\n        <a data-toggle=\"collapse\" data-parent=\".panel-group\" href=\"#build-{{build.id}}\">\n          Build {{build.displayName}}\n          </a><span class=\"build-links\" ng-show=\"listView\">\n          <span class=\"line-spacer\">|</span>\n          <a ng-href=\"{{build.$logLink}}\">Build Results <i class=\"fa fa-caret-right\"></i></a>\n          </span>\n        <span class=\"hidden-xs\">\n        <span ng-show=\"build.building\" class=\"pull-right\" title=\"This build started at {{build.$timestamp}}\">\n          <span ng-show=\"lastStage(build).stageName\"> {{lastStage(build).stageName}} | </span>Started {{build.$timestamp | relativeTime}}\n        </span>\n        <span ng-hide=\"build.building\" class=\"pull-right\" title=\"This build started at {{build.$timestamp}}\">\n          <i class=\"{{lastStage(build).$iconClass}}\"></i>&nbsp;\n          <span ng-switch on=\"lastStage(build).status\">\n            <!-- TODO add more cases -->\n            <span ng-switch-when=\"SUCCESS\">Complete!</span>\n            <span ng-switch-when=\"ABORTED\">Aborted</span>\n            <span ng-switch-when=\"INTERUPTED\">Aborted</span>\n            <span ng-switch-default>Failed</span>\n          </span>\n          &nbsp;| Started {{build.$timestamp | relativeTime}}\n          </span>\n        </span>\n      </h2>\n    </div>\n\n    <div id=\"build-{{build.id}}\" class=\"panel-collapse collapse in\">\n      <div class=\"panel-body pipeline-panel\">\n\n            <div class=\"pipeline-view\">\n              <div class=\"pipeline-deploy inline-block pipeline-start {{lastStage(build).$backgroundClass}} {{build.result}}\">\n                <div class=\"pipeline-deploy-box\">\n                  <div ng-switch on=\"build.result\" class=\"text-center pipeline-result\">\n                    <div class=\"pipeline-summary\">\n                      <div>Build #{{build.number}}</div>\n                      <div>\n                        <!-- TODO add more cases -->\n                        <span ng-switch-when=\"SUCCESS\">Complete!</span>\n                        <span ng-switch-when=\"ABORTED\">Aborted</span>\n                        <span ng-switch-default>Failed</span>\n                      </div>\n                    </div>\n                    <div>\n                      <a href=\"{{build.$logLink}}\">View Full Log</a>\n                    </div>\n                  </div>\n                </div>\n              </div><!--\n           --><div ng-repeat=\"stage in build.stages | filter:model.filterText track by $index\" class=\"pipeline-deploy inline-block {{build.result}}\" ng-style=\"borderStyle(build, stage, $index)\" title=\"This stage started {{stage.$startTime | relativeTime}}\" >\n                <div class=\"pipeline-deploy-box\">\n                  <div class=\"text-center stage-name\" title=\"{{stage.status}}\">\n                    <a href=\"{{stage.$viewLink}}\" target=\"jenkins\">{{stage.stageName}}</a>\n                  </div>\n                  <div class=\"text-center stage-status\">\n                    <div>\n                      <i class=\"fa-2x {{stage.$iconClass}} stage-icon\"></i>\n                    </div>\n                    <div class=\"stage-bar {{stage.$backgroundClass}}\"></div>\n                  </div>\n                  <div class=\"text-center stageStartTime\">\n                    <a href=\"{{stage.$logLink}}\" title=\"View the logs of this stage\">\n                      <span ng-show=\"stage.duration >= 0\">{{stage.duration | humanizeDuration}}</span>\n                      <span ng-hide=\"stage.duration < 0\">&nbsp;</span>\n                    </a>\n                  </div>\n                </div>\n              </div>\n            </div>\n\n          </div>\n        </div>\n\n        <!-- handy for debugging -->\n        <!--\n        <pre>\n          {{build | json}}\n        </pre>\n        -->\n        </div>\n    </div>\n  </div>\n</div>\n");}]); hawtioPluginLoader.addModule("hawtio-pipeline-view-templates");