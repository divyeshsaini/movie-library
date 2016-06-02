(function() {

	"use strict";

	angular.module('movieLibrary')
		.directive('ngEnter', function () {
		    return function (scope, element, attrs) {
		        element.bind("keydown keypress", function (event) {
		            if(event.which === 13) {
		                scope.$apply(function (){
		                    scope.$eval(attrs.ngEnter);
		                });

		                event.preventDefault();
		            }
		        });
		    };
		})
		.controller('MovieCtrl', function($scope, $http, $localStorage, $sessionStorage){

			$scope.$storage = $localStorage.$default({
				movies: [ 
				{
					"id" : "1",
					"title" : "Avengers: Age of Ultron",
					"poster" : "http://ia.media-imdb.com/images/M/MV5BMTM4OGJmNWMtOTM4Ni00NTE3LTg3MDItZmQxYjc4N2JhNmUxXkEyXkFqcGdeQXVyNTgzMDMzMTg@._V1_SX300.jpg",
					"released" : "01 May 2015",
					"genre" : "Action, Adventure, Sci-Fi ",
					"director": "Joss Whedon",
					"actors" : "Robert Downey Jr., Chris Hemsworth, Mark Ruffalo, Chris Evans",
					"plot" : "When Tony Stark and Bruce Banner try to jump-start a dormant peacekeeping program called Ultron, things go horribly wrong and it's up to Earth's Mightiest Heroes to stop the villainous Ultron from enacting his terrible plans."
				},
				{
					"id" : "2",
					"title" : "Batman Begins",
					"poster" : "http://ia.media-imdb.com/images/M/MV5BNTM3OTc0MzM2OV5BMl5BanBnXkFtZTYwNzUwMTI3._V1_SX300.jpg",
					"released" : "15 Jun 2005",
					"genre" : "Action, Adventure",
					"director": "Christopher Nolan",
					"actors" : "Christian Bale, Michael Caine, Liam Neeson, Katie Holmes",
					"plot" : "After training with his mentor, Batman begins his war on crime to free the crime-ridden Gotham City from corruption that the Scarecrow and the League of Shadows have cast upon it."
				},
				{
					"id" : "3",
					"title" : "The Fault in Our Stars",
					"poster" : "http://ia.media-imdb.com/images/M/MV5BMjA4NzkxNzc5Ml5BMl5BanBnXkFtZTgwNzQ3OTMxMTE@._V1_SX300.jpg",
					"released" : "06 Jun 2014",
					"genre" : "Drama, Romance",
					"director": "Josh Boone",
					"actors" : "Shailene Woodley, Ansel Elgort, Nat Wolff, Laura Dern",
					"plot" : "Two teenage cancer patients begin a life-affirming journey to visit a reclusive author in Amsterdam."
				},
				{
					"id" : "4",
					"title" : "Captain America: Civil War",
					"poster" : "http://ia.media-imdb.com/images/M/MV5BMjQ0MTgyNjAxMV5BMl5BanBnXkFtZTgwNjUzMDkyODE@._V1_SX300.jpg",
					"released" : "06 May 2016",
					"genre" : "Action, Adventure, Sci-Fi",
					"director": "Anthony Russo, Joe Russo",
					"actors" : "Chris Evans, Robert Downey Jr., Scarlett Johansson, Sebastian Stan",
					"plot" : "Political interference in the Avengers' activities causes a rift between former allies Captain America and Iron Man."
				},
				{
					"id" : "5",
					"title" : "Kung Fu Panda",
					"poster" : "http://ia.media-imdb.com/images/M/MV5BMTIxOTY1NjUyN15BMl5BanBnXkFtZTcwMjMxMDk1MQ@@._V1_SX300.jpg",
					"released" : "06 Jun 2008",
					"genre" : "Animation, Action, Adventure",
					"director": "Mark Osborne, John Stevenson",
					"actors" : "Jack Black, Dustin Hoffman, Angelina Jolie, Ian McShane",
					"plot" : "In the Valley of Peace, Po the Panda finds himself chosen as the Dragon Warrior despite the fact that he is obese and a complete novice at martial arts."
				}
			]});
			
			$scope.movies = $scope.$storage.movies;
			$scope.fetchMovie = function(title) {
					title = title.toLowerCase();
				angular.forEach($scope.movies, function(item) {
					var title2 = item.title.toLowerCase();
					if(title2 == title)
						$scope.check = false;
				});
				if($scope.check) {
					$scope.url = 'http://www.omdbapi.com/?t='+ title +'&plot=short&r=json'
					$http.get($scope.url).then(function(response) {
						$scope.data = response.data;
						console.log($scope.data);
						$scope.saveMovie($scope.data);
					});
				}
			};
			$scope.saveMovie = function(data) {
				$scope.movie = {
					id : $scope.movies.length + 1,
					title : data.Title,
					poster : data.Poster,
					released: data.Released,
					genre: data.Genre,
					director: data.Director,
					actors: data.Actors,
					plot: data.Plot
				}
				$scope.$storage.movies.push($scope.movie);	
			};

			$scope.saveEdit = function(movie) {
				$scope.movie = movie;
			};

			$scope.getGenre = function() {
				var genres = [];
				angular.forEach($scope.movies, function(item) {					
					var genre = item.genre.split(', ');	
					//console.log(genre);
					genre.forEach(function(g) {
						genres.push(g);
					});
					
				});
				$scope.filters = _.uniq(genres);
			};
			$scope.getGenre();
		});
})();