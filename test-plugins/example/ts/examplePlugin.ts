/// <reference path="../../includes.ts"/>

module PipelineExample {

  var pluginName = 'hawtio-pipeline-example';
  var log = Logger.get(pluginName);
  var _module = angular.module(pluginName, []);

  _module.config(['$routeProvider', ($routeProvider) => {
    $routeProvider.when('/', {
      templateUrl: 'test-plugins/example/html/examplePlugin.html'
    });
  }]);

  _module.controller('PipelineExample.Controller', ['$scope', '$timeout', ($scope, $timeout) => {
    $scope.model = {
      // can filter the stages via this guy
      filterText: ''
    };
    var logLink = 'http://myjenkins/logs/blah';
    var builds = [];
    var startTime = Date.now() / 100000000 * -1;
    // failed build
    builds.push({
      displayName: "#1",
      id: 1,
      number: 1,
      building: false,
      $logLink: logLink,
      $timestamp: startTime,
      result: 'FAILED',
      stages: [
        {
          stageName: 'foo',
          status: 'SUCCESS',
          duration: 20000,
          $startTime: startTime,
          $logLink: logLink
        },
        {
          stageName: 'bar',
          status: 'FAILED',
          duration: 3000,
          $startTime: startTime,
          $logLink: logLink
        }
      ]
    });

    // successful build
    builds.push({
      displayName: "#2",
      id: 2,
      number: 2,
      building: false,
      result: 'SUCCESS',
      $logLink: logLink,
      $timestamp: startTime + 4000,
      stages: [
        {
          stageName: 'foo',
          status: 'SUCCESS',
          duration: 20000,
          $startTime: startTime + 4000,
          $logLink: logLink
        },
        {
          stageName: 'bar',
          status: 'SUCCESS',
          duration: 30000,
          $startTime: startTime + 4000,
          $logLink: logLink
        }
      ]
    });

    // pending build
    builds.push({
      displayName: "#3",
      id: 3,
      number: 3,
      building: true,
      $logLink: logLink,
      $timestamp: startTime + 1000,
      stages: [
        {
          stageName: 'foo',
          status: 'SUCCESS',
          duration: 20000,
          $startTime: startTime + 1000,
          $logLink: logLink
        },
        {
          stageName: 'bar',
          status: 'RUNNING',
          duration: 15000,
          $startTime: startTime + 1000,
          $logLink: logLink
        }
      ]
    });

    // hide the log panel
    $scope.hideLogs = true;
    // Show the log link in the header
    $scope.listView = false;

    // Set the appropriate icon and background class
    builds.forEach((build:any) => {
      build.stages.forEach((stage:any) => {
        stage.$iconClass = HawtioPipelineView.createBuildStatusIconClass(stage.status);
        stage.$backgroundClass = HawtioPipelineView.createBuildStatusBackgroundClass(stage.status);
      });
    });

    $timeout(() => {
      $scope.builds = builds;
    }, 10);

  }]);

  hawtioPluginLoader.addModule(pluginName);

}
