(function() {

	"use strict";

	angular
		.module('movieLibrary', ['ngMaterial','ngStorage'])
		.config(function($mdThemingProvider) {
			$mdThemingProvider
				.theme('default')
				.primaryPalette('red')
				.accentPalette('orange');
		});
})();