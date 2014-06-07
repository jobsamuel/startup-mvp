(function () { // anomymous function.
'use strict';

angular.module('app', ['ui.router'])

.config(['$urlRouterProvider', '$stateProvider', '$locationProvider', function($urlRouterProvider, $stateProvider, $locationProvider) {

	$stateProvider

		.state('home', {
			url: '/',
			views: {
				'main': {
					templateUrl: 'partials/home.html',
					controller: 'appController'
				}
			},
			data: {
				pageTitle: 'Home'
			}
		})

		.state('register', {
			url: '/register',
			views: {
				'main': {
					templateUrl: 'partials/register.html',
					controller: 'appController'
				}
			},
			data: {
				pageTitle: 'Home'
			}
		})

	$urlRouterProvider.otherwise('/');

	$locationProvider.html5Mode(true);

}])

.controller('appController', ['$scope', function($scope) {

	//TODO

}]);

})(); // end of anomymous function.