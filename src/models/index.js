const Actor = require("./Actor");
const Director = require("./Director");
const Genre = require("./Genre");
const Movie = require("./Movie");

Actor.belongsToMany(Movie, {through: "ActorsMovies"});
Movie.belongsToMany(Actor, {through:"ActorsMovies"});

Movie.belongsToMany(Director, {through: "MoviesDirectors"});
Director.belongsToMany(Movie, {through: "MoviesDirectors"});

Movie.belongsToMany(Genre, {through: "MoviesGenres"});
Genre.belongsToMany(Movie, {through: "MoviesGenres"});