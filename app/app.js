'use strict';

const app = angular.module('tnaComm', ['ngRoute']);

//checks to see if user is authorized before routing to internal views.
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

//checks to see if user is an administratoe before routing to administrator views.
let isAdmin = (userFactory) => new Promise ((resolve, reject) => {
	userFactory.checkAdmin()
		.then((userIsAdmin) => {
			if (userIsAdmin) {
				resolve();
			} else {
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
		controller: 'homeCtrl',
		resolve: {isAuth}
  })
	.when('/search', {
		templateUrl: 'partials/search-view.html',
		controller: 'searchViewCtrl',
		resolve: {isAuth}
  })
	.when('/upload', {
		templateUrl: 'partials/upload-view.html',
		controller: 'uploadCtrl',
		resolve: {isAuth}
	})
	.when('/results',{
		templateUrl: 'partials/search-results.html',
		controller: 'resultsCtrl',
		resolve: {isAuth}
	})
	.when('/user-admin', {
		templateUrl: 'partials/user-admin.html',
		controller: 'userAdminCtrl'
		// resolve: {isAdmin}   //temporarily disabled
	})
	.when('/user-add', {
		templateUrl: 'partials/user-add-edit.html',
		controller: 'userAddCtrl'
		// resolve: {isAdmin}  // temporarily disabled
	})
	.when('/user-edit/:userId', {
		templateUrl: 'partials/user-add-edit.html',
		controller: 'userEditCtrl'
		// resolve: {isAdmin}   //temporarily disabled
	})
	.when('/details',{
		templateUrl: 'partials/results-detail.html',
		controller: 'detailCtrl'
	})
	.otherwise('/');
});