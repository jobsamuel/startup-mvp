(function () { // anomymous function.
'use strict';

angular.module('app', ['ui.router', 'ngAnimate'])

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
				pageTitle: 'Startup'
			}
		})

		.state('register', {
			url: '/signup',
			views: {
				'main': {
					templateUrl: 'partials/register.html',
					controller: 'appController'
				}
			},
			data: {
				pageTitle: 'Signup'
			}
		})

	$urlRouterProvider.otherwise('/');

	$locationProvider.html5Mode(true);

}])

.factory('send', ['$http', function($http) {

	var factory = {};

	factory.registration = function (email) {

		var data = {email: email}; 

		return $http.post('http://127.0.0.1:8080/signup', data) // Change URL before deploy.
			.success(function(callback) {
				console.log("%c Startup: " + callback, "background: #33cc59; color: #fff"); 
				return callback;
			}).error(function(error) {
				console.log("%c Startup: Signup failed.", "background: #fd4e5a; color: #fff");
				var serverError = { 
					error: error,
					ip_address: "${keen.ip}",
		  			user_agent: "${keen.user_agent}"
				};

				client.addEvent("serverError", serverError);
		});
	
	}

	return factory;

}])

.run(['$rootScope', '$state', function($rootScope, $state) {

	$rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
		
		// Change the page title according the current view.
		if (angular.isDefined(toState.data.pageTitle)) {
			$rootScope.pageTitle = $state.current.data.pageTitle;
		}
		
		// Record whether users interact with the site after have registered their emails
		// or have saw the registration page. 
		if (fromState.name === "register" ) {
			
			// create an event as a JS object
			var curious = { 
				backward: true,
				ip_address: "${keen.ip}",
	  			user_agent: "${keen.user_agent}"
			};

			// add it to the "curious" collection
			client.addEvent("curious", curious);
		}
	});

}])

.controller('appController', ['$scope', '$state', 'send', function($scope, $state, send) {

	$scope.pattern = /^[A-Za-z0-9._-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/; // Valid characters in an email address.
	$scope.registered = false; // Hide 'alert success' notification until an user complete a registration.

	// Record each visit to the site.

	// create an event as a JS object
	var visitor = { 
		ip_address: "${keen.ip}",
		user_agent: "${keen.user_agent}"
	};

	// add it to the "visitor" collection
	client.addEvent("visitor", visitor);

	// Record whether users are interested in the startup idea.
	$scope.interested = function () {

		// create an event as a JS object
		var interested = { 
			user_interested: true,
			ip_address: "${keen.ip}",
  			user_agent: "${keen.user_agent}"
		};

		// add it to the "interested" collection
		client.addEvent("interested", interested);
	}

	// Handle registration process.
	$scope.register = function (email) { 

		if ($scope.input.email.$valid) { // Validate e-mail before call POST service.

			// Save email in a database.
			send.registration(email).then(function(c) {
				$scope.registered = true;
			});

			// create an event as a JS object
			var convinced = {
			    posible_client: true,
			    ip_address: "${keen.ip}",
  				user_agent: "${keen.user_agent}"
			};

			// add it to the "convinced" collection
			client.addEvent("convinced", convinced);
		
		} else {

			// Record errors during entry submitions.

			// create an event as a JS object
			var wrongEntry = { 
				valid_email: false,
				ip_address: "${keen.ip}",
  				user_agent: "${keen.user_agent}"
			};

			// add it to the "wrongEntry" collection
			client.addEvent("wrongEntry", wrongEntry);
		}
	
	}

}]);

})(); // end of anomymous function.