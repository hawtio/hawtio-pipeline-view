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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluY2x1ZGVzLnRzIiwicGlwZWxpbmVWaWV3L3RzL3BpcGVsaW5lVmlld1BsdWdpbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSwyREFBMkQ7QUFDM0QsNERBQTREO0FBQzVELEdBQUc7QUFDSCxtRUFBbUU7QUFDbkUsb0VBQW9FO0FBQ3BFLDJDQUEyQztBQUMzQyxHQUFHO0FBQ0gsZ0RBQWdEO0FBQ2hELEdBQUc7QUFDSCx1RUFBdUU7QUFDdkUscUVBQXFFO0FBQ3JFLDRFQUE0RTtBQUM1RSx1RUFBdUU7QUFDdkUsa0NBQWtDO0FBRWxDLHlEQUF5RDs7QUNmekQseUNBQXlDO0FBS3pDLElBQU8sa0JBQWtCLENBcUd4QjtBQXJHRCxXQUFPLGtCQUFrQixFQUFDLENBQUM7SUFFekIsSUFBSSxVQUFVLEdBQUcsc0JBQXNCLENBQUM7SUFDeEMsSUFBSSxHQUFHLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUNqQyxJQUFJLE9BQU8sR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUM3QyxrQkFBa0IsQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDekMsSUFBSSxZQUFZLEdBQUcsMkJBQTJCLENBQUM7SUFFL0MsT0FBTyxDQUFDLEdBQUcsQ0FBQztRQUNWLEdBQUcsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDdEIsQ0FBQyxDQUFDLENBQUM7SUFFSCwwQ0FBaUQsTUFBTTtRQUNyRCxJQUFJLFVBQVUsR0FBRyxlQUFlLENBQUM7UUFDakMsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUNYLEVBQUUsQ0FBQyxDQUFDLE1BQU0sS0FBSyxTQUFTLElBQUksTUFBTSxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUM7Z0JBQ2hELFVBQVUsR0FBRyxZQUFZLENBQUM7WUFDNUIsQ0FBQztZQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxNQUFNLEtBQUssU0FBUyxJQUFJLE1BQU0sS0FBSyxZQUFZLENBQUMsQ0FBQyxDQUFDO2dCQUMzRCxVQUFVLEdBQUcsZUFBZSxDQUFDO1lBQy9CLENBQUM7WUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsTUFBTSxLQUFLLFNBQVMsSUFBSSxNQUFNLEtBQUssVUFBVSxJQUFJLE1BQU0sS0FBSyxXQUFXLENBQUMsQ0FBQyxDQUFDO2dCQUNuRixVQUFVLEdBQUcsZUFBZSxDQUFDO1lBQy9CLENBQUM7WUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsTUFBTSxLQUFLLGFBQWEsQ0FBQyxDQUFDLENBQUM7Z0JBQ3BDLFVBQVUsR0FBRyxtQkFBbUIsQ0FBQztZQUNuQyxDQUFDO1FBQ0gsQ0FBQztRQUNELE1BQU0sQ0FBQyxVQUFVLENBQUM7SUFDcEIsQ0FBQztJQWRlLG1EQUFnQyxtQ0FjL0MsQ0FBQTtJQUVELG9DQUEyQyxNQUFNO1FBQy9DLElBQUksVUFBVSxHQUFHLHVCQUF1QixDQUFDO1FBQ3pDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDWCxFQUFFLENBQUMsQ0FBQyxNQUFNLEtBQUssU0FBUyxJQUFJLE1BQU0sS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDO2dCQUNoRCx5QkFBeUI7Z0JBQ3pCLFVBQVUsR0FBRyw4QkFBOEIsQ0FBQztZQUM5QyxDQUFDO1lBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sS0FBSyxTQUFTLElBQUksTUFBTSxLQUFLLFlBQVksQ0FBQyxDQUFDLENBQUM7Z0JBQzNELFVBQVUsR0FBRyxtQkFBbUIsQ0FBQztZQUNuQyxDQUFDO1lBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sS0FBSyxTQUFTLElBQUksTUFBTSxLQUFLLFVBQVUsSUFBSSxNQUFNLEtBQUssV0FBVyxDQUFDLENBQUMsQ0FBQztnQkFDbkYsVUFBVSxHQUFHLDBCQUEwQixDQUFDO1lBQzFDLENBQUM7WUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsTUFBTSxLQUFLLGFBQWEsQ0FBQyxDQUFDLENBQUM7Z0JBQ3BDLFVBQVUsR0FBRyx3QkFBd0IsQ0FBQztZQUN4QyxDQUFDO1FBQ0gsQ0FBQztRQUNELE1BQU0sQ0FBQyxVQUFVLENBQUM7SUFDcEIsQ0FBQztJQWZlLDZDQUEwQiw2QkFlekMsQ0FBQTtJQUVELE9BQU8sQ0FBQyxTQUFTLENBQUMsb0JBQW9CLEVBQUU7UUFDdEMsTUFBTSxDQUFDO1lBQ0wsUUFBUSxFQUFFLElBQUk7WUFDZCxXQUFXLEVBQUUsNkNBQTZDO1lBQzFELFVBQVUsRUFBRSxDQUFDLFFBQVEsRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLFVBQUMsTUFBTSxFQUFFLFFBQVEsRUFBRSxNQUFNO29CQUNwRSx1RUFBdUU7b0JBQ3ZFLHdCQUF3QixDQUFDO3dCQUN2QixJQUFJLEdBQUcsR0FBRyxDQUFDLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDO3dCQUN6QixNQUFNLENBQUMsR0FBRyxDQUFDLE1BQU0sSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUM7b0JBQzNDLENBQUM7b0JBRUQsa0JBQWtCLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQzt3QkFDdkIsTUFBTSxDQUFDLEdBQUcsR0FBRyxjQUFjLENBQUMsQ0FBQyxDQUFDLEdBQUcsY0FBYyxDQUFDLENBQUMsQ0FBQyxHQUFHLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDekUsQ0FBQztvQkFFRCxpREFBaUQ7b0JBQ2pELE1BQU0sQ0FBQyxXQUFXLEdBQUcsVUFBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLE1BQU07d0JBQ3hDLFVBQVU7d0JBQ1YsSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDO3dCQUNaLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQzt3QkFDWixJQUFJLENBQUMsR0FBRyxHQUFHLENBQUM7d0JBQ1osQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7d0JBQ2hDLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO3dCQUNoQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDL0IsTUFBTSxDQUFDOzRCQUNMLGNBQWMsRUFBRSxRQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7eUJBQ2xDLENBQUM7b0JBQ0osQ0FBQyxDQUFBO29CQUVELE1BQU0sQ0FBQyxTQUFTLEdBQUcsVUFBQyxLQUFLO3dCQUN2QixFQUFFLENBQUMsQ0FBQyxLQUFLLElBQUksS0FBSyxDQUFDLE1BQU0sSUFBSSxLQUFLLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7NEJBQ2pELE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQzt3QkFDOUIsQ0FBQzt3QkFDRCw0QkFBNEI7d0JBQzVCLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDOzRCQUNuQixNQUFNLENBQUMsRUFBRSxDQUFDO3dCQUNaLENBQUM7d0JBQUMsSUFBSSxDQUFDLENBQUM7NEJBQ04sTUFBTSxDQUFDO2dDQUNMLE1BQU0sRUFBRSxLQUFLLENBQUMsTUFBTTtnQ0FDcEIsWUFBWSxFQUFFLDBCQUEwQixDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUM7Z0NBQ3RELGtCQUFrQixFQUFFLGdDQUFnQyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUM7NkJBQ25FLENBQUM7d0JBQ0osQ0FBQztvQkFDSCxDQUFDLENBQUE7Z0JBRUgsQ0FBQyxDQUFDO1NBQ0gsQ0FBQztJQUNKLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxjQUFjLEVBQUU7UUFDeEIsTUFBTSxDQUFDLFVBQVMsSUFBSTtZQUNsQixNQUFNLENBQUMsU0FBUyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN0QyxDQUFDLENBQUM7SUFDSixDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsa0JBQWtCLEVBQUU7UUFDNUIsTUFBTSxDQUFDLFVBQVUsUUFBUTtZQUN2QixNQUFNLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxFQUFFLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7UUFDckQsQ0FBQyxDQUFDO0lBQ0osQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLEVBckdNLGtCQUFrQixLQUFsQixrQkFBa0IsUUFxR3hCIiwiZmlsZSI6ImNvbXBpbGVkLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8vIENvcHlyaWdodCAyMDE0LTIwMTUgUmVkIEhhdCwgSW5jLiBhbmQvb3IgaXRzIGFmZmlsaWF0ZXNcbi8vLyBhbmQgb3RoZXIgY29udHJpYnV0b3JzIGFzIGluZGljYXRlZCBieSB0aGUgQGF1dGhvciB0YWdzLlxuLy8vXG4vLy8gTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbi8vLyB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4vLy8gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4vLy9cbi8vLyAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuLy8vXG4vLy8gVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuLy8vIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbi8vLyBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbi8vLyBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4vLy8gbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9saWJzL2hhd3Rpby1jb3JlLWR0cy9kZWZzLmQudHNcIi8+XG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vLi4vaW5jbHVkZXMudHNcIi8+XG5cbmRlY2xhcmUgdmFyIGh1bWFuaXplRHVyYXRpb246IGFueTtcbmRlY2xhcmUgdmFyIGh1bWFuZGF0ZTogYW55O1xuXG5tb2R1bGUgSGF3dGlvUGlwZWxpbmVWaWV3IHtcblxuICB2YXIgcGx1Z2luTmFtZSA9ICdoYXd0aW8tcGlwZWxpbmUtdmlldyc7XG4gIHZhciBsb2cgPSBMb2dnZXIuZ2V0KHBsdWdpbk5hbWUpO1xuICB2YXIgX21vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKHBsdWdpbk5hbWUsIFtdKTtcbiAgaGF3dGlvUGx1Z2luTG9hZGVyLmFkZE1vZHVsZShwbHVnaW5OYW1lKTtcbiAgdmFyIHRlbXBsYXRlUGF0aCA9ICdwbHVnaW5zL3BpcGVsaW5lVmlldy9odG1sJztcblxuICBfbW9kdWxlLnJ1bigoKSA9PiB7XG4gICAgbG9nLmRlYnVnKFwibG9hZGVkXCIpO1xuICB9KTtcblxuICBleHBvcnQgZnVuY3Rpb24gY3JlYXRlQnVpbGRTdGF0dXNCYWNrZ3JvdW5kQ2xhc3MocmVzdWx0KSB7XG4gICAgdmFyICRpY29uQ2xhc3MgPSBcImJ1aWxkLXBlbmRpbmdcIjtcbiAgICBpZiAocmVzdWx0KSB7XG4gICAgICBpZiAocmVzdWx0ID09PSBcIkZBSUxVUkVcIiB8fCByZXN1bHQgPT09IFwiRkFJTEVEXCIpIHtcbiAgICAgICAgJGljb25DbGFzcyA9IFwiYnVpbGQtZmFpbFwiO1xuICAgICAgfSBlbHNlIGlmIChyZXN1bHQgPT09IFwiQUJPUlRFRFwiIHx8IHJlc3VsdCA9PT0gXCJJTlRFUlVQVEVEXCIpIHtcbiAgICAgICAgJGljb25DbGFzcyA9IFwiYnVpbGQtYWJvcnRlZFwiO1xuICAgICAgfSBlbHNlIGlmIChyZXN1bHQgPT09IFwiU1VDQ0VTU1wiIHx8IHJlc3VsdCA9PT0gXCJDT01QTEVURVwiIHx8IHJlc3VsdCA9PT0gXCJDT01QTEVURURcIikge1xuICAgICAgICAkaWNvbkNsYXNzID0gXCJidWlsZC1zdWNjZXNzXCI7XG4gICAgICB9IGVsc2UgaWYgKHJlc3VsdCA9PT0gXCJOT1RfU1RBUlRFRFwiKSB7XG4gICAgICAgICRpY29uQ2xhc3MgPSBcImJ1aWxkLW5vdC1zdGFydGVkXCI7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiAkaWNvbkNsYXNzO1xuICB9XG5cbiAgZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUJ1aWxkU3RhdHVzSWNvbkNsYXNzKHJlc3VsdCkge1xuICAgIHZhciAkaWNvbkNsYXNzID0gXCJmYSBmYS1zcGlubmVyIGZhLXNwaW5cIjtcbiAgICBpZiAocmVzdWx0KSB7XG4gICAgICBpZiAocmVzdWx0ID09PSBcIkZBSUxVUkVcIiB8fCByZXN1bHQgPT09IFwiRkFJTEVEXCIpIHtcbiAgICAgICAgLy8gVE9ETyBub3QgYXZhaWxhYmxlIHlldFxuICAgICAgICAkaWNvbkNsYXNzID0gXCJmYSBmYS1leGNsYW1hdGlvbi1jaXJjbGUgcmVkXCI7XG4gICAgICB9IGVsc2UgaWYgKHJlc3VsdCA9PT0gXCJBQk9SVEVEXCIgfHwgcmVzdWx0ID09PSBcIklOVEVSVVBURURcIikge1xuICAgICAgICAkaWNvbkNsYXNzID0gXCJmYSBmYS1jaXJjbGUgZ3JleVwiO1xuICAgICAgfSBlbHNlIGlmIChyZXN1bHQgPT09IFwiU1VDQ0VTU1wiIHx8IHJlc3VsdCA9PT0gXCJDT01QTEVURVwiIHx8IHJlc3VsdCA9PT0gXCJDT01QTEVURURcIikge1xuICAgICAgICAkaWNvbkNsYXNzID0gXCJmYSBmYS1jaGVjay1jaXJjbGUgZ3JlZW5cIjtcbiAgICAgIH0gZWxzZSBpZiAocmVzdWx0ID09PSBcIk5PVF9TVEFSVEVEXCIpIHtcbiAgICAgICAgJGljb25DbGFzcyA9IFwiZmEgZmEtY2lyY2xlLXRoaW4gZ3JleVwiO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gJGljb25DbGFzcztcbiAgfVxuXG4gIF9tb2R1bGUuZGlyZWN0aXZlKFwiaGF3dGlvUGlwZWxpbmVWaWV3XCIsICgpID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdFQScsXG4gICAgICB0ZW1wbGF0ZVVybDogJ3BsdWdpbnMvcGlwZWxpbmVWaWV3L2h0bWwvcGlwZWxpbmVWaWV3Lmh0bWwnLFxuICAgICAgY29udHJvbGxlcjogWyckc2NvcGUnLCAnJGVsZW1lbnQnLCAnJGF0dHJzJywgKCRzY29wZSwgJGVsZW1lbnQsICRhdHRycykgPT4ge1xuICAgICAgICAvLyBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzU2MjM4MzgvcmdiLXRvLWhleC1hbmQtaGV4LXRvLXJnYlxuICAgICAgICBmdW5jdGlvbiBjb21wb25lbnRUb0hleChjKSB7XG4gICAgICAgICAgdmFyIGhleCA9IGMudG9TdHJpbmcoMTYpO1xuICAgICAgICAgIHJldHVybiBoZXgubGVuZ3RoID09IDEgPyBcIjBcIiArIGhleCA6IGhleDtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIHJnYlRvSGV4KHIsIGcsIGIpIHtcbiAgICAgICAgICByZXR1cm4gXCIjXCIgKyBjb21wb25lbnRUb0hleChyKSArIGNvbXBvbmVudFRvSGV4KGcpICsgY29tcG9uZW50VG9IZXgoYik7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBzZXQgdGhlIHRvcCBib3JkZXIgY29sb3Igb2YgZWFjaCBwaXBlbGluZSBzdGVwXG4gICAgICAgICRzY29wZS5ib3JkZXJTdHlsZSA9IChidWlsZCwgc3RhZ2UsICRpbmRleCkgPT4ge1xuICAgICAgICAgIC8vICM3OERBRjRcbiAgICAgICAgICB2YXIgciA9IDEyMDtcbiAgICAgICAgICB2YXIgZyA9IDIxODtcbiAgICAgICAgICB2YXIgYiA9IDI0NDtcbiAgICAgICAgICByID0gTWF0aC5hYnMociAtICgkaW5kZXggKiAxMCkpO1xuICAgICAgICAgIGcgPSBNYXRoLmFicyhnIC0gKCRpbmRleCAqIDEwKSk7XG4gICAgICAgICAgYiA9IE1hdGguYWJzKGIgLSAoJGluZGV4ICogNSkpO1xuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAnYm9yZGVyLWNvbG9yJzogcmdiVG9IZXgociwgZywgYilcbiAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgJHNjb3BlLmxhc3RTdGFnZSA9IChidWlsZCk6YW55ID0+IHtcbiAgICAgICAgICBpZiAoYnVpbGQgJiYgYnVpbGQuc3RhZ2VzICYmIGJ1aWxkLnN0YWdlcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJldHVybiBfLmxhc3QoYnVpbGQuc3RhZ2VzKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgLy8gY2F0ZXIgZm9yIG5vIGJ1aWxkIHN0YWdlc1xuICAgICAgICAgIGlmIChidWlsZC5idWlsZGluZykge1xuICAgICAgICAgICAgcmV0dXJuIHt9O1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICBzdGF0dXM6IGJ1aWxkLnJlc3VsdCxcbiAgICAgICAgICAgICAgJyRpY29uQ2xhc3MnOiBjcmVhdGVCdWlsZFN0YXR1c0ljb25DbGFzcyhidWlsZC5yZXN1bHQpLFxuICAgICAgICAgICAgICAnJGJhY2tncm91bmRDbGFzcyc6IGNyZWF0ZUJ1aWxkU3RhdHVzQmFja2dyb3VuZENsYXNzKGJ1aWxkLnJlc3VsdClcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgIH1dXG4gICAgfTtcbiAgfSkuZmlsdGVyKCdyZWxhdGl2ZVRpbWUnLCAoKSA9PiB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKGRhdGUpIHtcbiAgICAgIHJldHVybiBodW1hbmRhdGUucmVsYXRpdmVUaW1lKGRhdGUpO1xuICAgIH07XG4gIH0pLmZpbHRlcignaHVtYW5pemVEdXJhdGlvbicsICgpID0+IHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGR1cmF0aW9uKSB7XG4gICAgICByZXR1cm4gaHVtYW5pemVEdXJhdGlvbihkdXJhdGlvbiwgeyByb3VuZDogdHJ1ZSB9KTtcbiAgICB9O1xuICB9KTtcbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==

angular.module("hawtio-pipeline-view-templates", []).run(["$templateCache", function($templateCache) {$templateCache.put("plugins/pipelineView/html/pipelineView.html","<div class=\"panel-group\">\n  <div class=\"panel panel-default\">\n    <div class=\"panel-heading\">\n      <h2 class=\"panel-title\">\n        <a data-toggle=\"collapse\" data-parent=\".panel-group\" href=\"#build-{{build.id}}\">\n          Build {{build.displayName}}\n          </a><span class=\"build-links\" ng-show=\"listView\">\n          <span class=\"line-spacer\">|</span>\n          <a ng-href=\"{{build.$logLink}}\">Build Results <i class=\"fa fa-caret-right\"></i></a>\n          </span>\n        <span ng-show=\"build.building\" class=\"pull-right\" title=\"This build started at {{build.$timestamp}}\">\n          <span ng-show=\"lastStage(build).stageName\"> {{lastStage(build).stageName}} | </span>Started {{build.$timestamp | relativeTime}}\n        </span>\n        <span ng-hide=\"build.building\" class=\"pull-right\" title=\"This build started at {{build.$timestamp}}\">\n          <i class=\"{{lastStage(build).$iconClass}}\"></i>&nbsp;\n          <span ng-switch on=\"lastStage(build).status\">\n            <!-- TODO add more cases -->\n            <span ng-switch-when=\"SUCCESS\">Complete!</span>\n            <span ng-switch-when=\"ABORTED\">Aborted</span>\n            <span ng-switch-when=\"INTERUPTED\">Aborted</span>\n            <span ng-switch-default>Failed</span>\n          </span>\n          &nbsp;| Started {{build.$timestamp | relativeTime}}\n        </span>\n      </h2>\n    </div>\n\n    <div id=\"build-{{build.id}}\" class=\"panel-collapse collapse in\">\n      <div class=\"panel-body pipeline-panel\">\n\n        <div class=\"row\">\n          <div class=\"col-md-12\">\n\n            <div class=\"pipeline-view\">\n              <div ng-repeat=\"stage in build.stages | filter:model.filterText track by $index\" class=\"pipeline-deploy inline-block {{build.result}}\" ng-style=\"borderStyle(build, stage, $index)\" title=\"This stage started {{stage.$startTime | relativeTime}}\" >\n                <div class=\"pipeline-deploy-box\">\n                  <div class=\"text-center stageName\" title=\"{{stage.status}}\">\n                    <a href=\"{{stage.$viewLink}}\" target=\"jenkins\">\n                      <b>{{stage.stageName}}</b>\n                    </a>\n                  </div>\n                  <div class=\"text-center stage-status\">\n                    <div>\n                      <i class=\"fa-2x {{stage.$iconClass}} stage-icon\"></i>\n                    </div>\n                    <div class=\"stage-bar {{stage.$backgroundClass}}\"></div>\n                  </div>\n                  <div class=\"text-center stageStartTime\">\n                    <a href=\"{{stage.$logLink}}\" title=\"View the logs of this stage\">\n                      <span ng-show=\"stage.duration >= 0\">{{stage.duration | humanizeDuration}}</span>\n                      <span ng-hide=\"stage.duration < 0\">&nbsp;</span>\n                    </a>\n                  </div>\n                </div>\n              </div>\n              <div ng-show=\"!build.building\" class=\"pipeline-deploy inline-block pipeline-end {{lastStage(build).$backgroundClass}} {{build.result}}\">\n                <div class=\"pipeline-deploy-box\">\n                  <div>&nbsp;</div>\n                  <div class=\"text-center pipeline-result\">\n                    <b ng-switch on=\"build.result\">\n                      Build #{{build.number}}\n                      <!-- TODO add more cases -->\n                      <span ng-switch-when=\"SUCCESS\">Complete!</span>\n                      <span ng-switch-when=\"ABORTED\">Aborted</span>\n                      <span ng-switch-default>Failed</span>\n                    </b>\n                  </div>\n                  <div>&nbsp;</div>\n                </div>\n              </div>\n            </div>\n\n          </div>\n        </div>\n\n        <!-- handy for debugging -->\n        <!--\n        <div class=\"row\">\n          <div class=\"col-md-12\">\n            <pre>\n              {{build | json}}\n            </pre>\n          </div>\n        </div>\n        -->\n\n        <div class=\"row\" ng-show=\"!listView && hideLogs && !build.building\">\n          <div class=\"col-md-12 log-section\">\n            <a href=\"{{build.$logLink}}\" class=\"pull-right\">View Full Log</a>\n          </div>\n        </div>\n        <div class=\"row\" ng-hide=\"hideLogs && !build.building\">\n          <div class=\"col-md-12 log-section\">\n            <h4 class=\"inline-block\">Logs</h4>\n            <a href=\"{{build.$logLink}}\" class=\"pull-right log-link\">View Full Log</a>\n            <hawtio-build-log-panel></hawtio-build-log-panel>\n          </div>\n        </div>\n\n      </div>\n    </div>\n\n\n  </div>\n</div>\n");}]); hawtioPluginLoader.addModule("hawtio-pipeline-view-templates");