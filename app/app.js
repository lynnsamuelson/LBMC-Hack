'use strict';

const app = angular.module('tnaComm', ['ngRoute']);


app.config(($routeProvider) => {
	$routeProvider
	.when('/', {
		templateUrl: 'partials/landing.html',
		controller: 'userCtrl'
	})
	.when('/search', {
		templateUrl: 'partials/search-view.html',
		controller: 'searchViewCtrl'
	})
	.when('/upload', {
		templateUrl: 'partials/upload-view.html',
		controller: 'uploadCtrl'
	});
});