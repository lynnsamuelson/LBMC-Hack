'use strict';

const app = angular.module('tnaComm', ['ngRoute']);


app.config(($routeProvider) => {
	$routeProvider
	.when('/', {
		templateUrl: 'partials/landing.html'
	})
	.when('/login', {
		templateUrl: 'partials/login.html',
		controller: 'userCtrl'
	})
	.when('/home', {
		templateUrl: 'partials/home.html'
	})
	.when('/upload', {
		templateUrl: 'partials/upload-view.html',
		controller: 'uploadCtrl'
	});
});