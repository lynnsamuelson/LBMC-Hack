'use strict';

const app = angular.module('tnaComm', ['ngRoute']);


app.config(($routeProvider) => {
	$routeProvider
	.when('/', {
		templateUrl: 'partials/landing.html',
		controller: 'userCtrl'
	})
	.when('/upload', {
		templateUrl: 'partials/upload-view.html',
		controller: 'uploadCtrl'
	});
});