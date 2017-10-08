'use strict';

const app = angular.module('tnaComm', ['ngRoute']);

let isAuth = (userFactory) => new Promise ((resolve, reject) => {
	userFactory.checkAuthenticated()
		.then((userExists) => {
			if (userExists) {
				resolve();
			} else {
				reject();
			}
		});
});

let isAdmin = (userFactory) => new Promise ((resolve, reject) => {
	userFactory.checkAdmin()
		.then((userIsAdmin) => {
			if (userIsAdmin) {
				console.log('isAdmin is resolving');
				resolve();
			} else {
				console.log('isAdmin is rejecting');
				reject();
			}
		});
});


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
		templateUrl: 'partials/home.html',
		controller: 'purgeCtrl',
		resolve: {isAuth}
  })
	.when('/search', {
		templateUrl: 'partials/search-view.html',
		controller: 'searchViewCtrl'
  })
	.when('/upload', {
		templateUrl: 'partials/upload-view.html',
		controller: 'uploadCtrl',
		resolve: {isAuth}
	})
	.when('/results',{
		templateUrl: 'partials/search-results.html',
		controller: 'resultsCtrl'
	})
	.otherwise('/');
});