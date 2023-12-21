const express = require("express");
const router = express.Router();

const Movie = require("../models/Movie.model");

router.get("/", (req, res, next) => {
  res.render("index");
});

router.get("/movies", (req, res, next) => {
    Movie.find()
      .then((moviesFromDB) => {
        console.log(moviesFromDB); // Log to see what is returned from the database
        if (!moviesFromDB.length) {
          console.log("No movies found in the database"); // Log if no movies are found
        }
        res.render("movies", { movies: moviesFromDB });
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
        next(error);
      });
  });
  

router.get("/movie/:id", (req, res, next) => {
  Movie.findById(req.params.id)
    .then((movieDetails) => {
      res.render("movie-details", { movie: movieDetails });
    })
    .catch((error) => next(error));
});

module.exports = router;
