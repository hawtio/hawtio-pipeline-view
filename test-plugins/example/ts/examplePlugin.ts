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

  _module.controller('PipelineExample.Controller', ['$scope', ($scope) => {
    $scope.model = {
      // can filter the stages via this guy
      filterText: ''
    };
    var logLink = 'http://myjenkins/logs/blah';
    var builds = [];
    // failed build
    builds.push({
      displayName: "#1",
      id: 1,
      number: 1,
      building: false,
      $logLink: logLink,
      $timestamp: new Date().getTime(),
      result: 'FAILED',
      stages: [
        {
          stageName: 'foo',
          status: 'SUCCESS',
          duration: 300,
          $startTime: new Date().getTime(),
          $logLink: logLink
        },
        {
          stageName: 'bar',
          status: 'FAILED',
          duration: 300,
          $startTime: new Date().getTime(),
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
      $timestamp: new Date().getTime(),
      stages: [
        {
          stageName: 'foo',
          status: 'SUCCESS',
          duration: 300,
          $startTime: new Date().getTime(),
          $logLink: logLink
        },
        {
          stageName: 'bar',
          status: 'SUCCESS',
          duration: 300,
          $startTime: new Date().getTime(),
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
      $timestamp: new Date().getTime(),
      stages: [
        {
          stageName: 'foo',
          status: 'SUCCESS',
          duration: 300,
          $startTime: new Date().getTime(),
          $logLink: logLink
        },
        {
          stageName: 'bar',
          status: 'RUNNING',
          duration: 300,
          $startTime: new Date().getTime(),
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

    setTimeout(() => {
      $scope.builds = builds;
      Core.$apply($scope);
    }, 10);

  }]);

  hawtioPluginLoader.addModule(pluginName);

}
