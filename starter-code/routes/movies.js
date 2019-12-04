const express = require('express');
const router  = express.Router();
const Movie = require('../models/movie');
const Celebrity = require('../models/celebrity');

// Home page for movies
router.get('/movies', (req, res, next) => {
    Movie.find()
    .then((movies) => {
        res.render('movies/index', {movies: movies});
    })
    .catch((err) => {
        next(err);
    })
})

// Form to create a new movie
router.get('/movies/new', (req, res, next) => {
    Celebrity.find()
    .then((celebs) => {
        res.render('movies/new', {celebs: celebs})
    })
  })
  
  router.post('/movies/:movieId/delete', (req, res, next) => {
    let id = req.params.movieId;
    Movie.findByIdAndRemove(id)
    .then(() => {
      res.redirect('/movies');
    })
    .catch((err) => {
      next(err);
    })
  })
  
  router.get('/movies/:movieId/edit', (req, res, next) => {
    let id = req.params.movieId;
    Movie.findById(id)
    .then((movie) => {
      res.render('movies/edit', {movie: movie});
    })
    .catch((err) => {
      next(err);
    })
  })
  
  router.get('/movies/:movieId', (req, res, next) => {
    let id = req.params.movieId;
    Movie.findById(id)
    .then((movie) => {
      res.render('movies/show', {movie: movie})
    })
    .catch((err) => {
      next(err);
    })
  })
  
  router.post('/movies/:movieId', (req, res, next) => {
    let id = req.params.movieId;
    let update = {...req.body};
    Movie.findByIdAndUpdate(id, update)
    .then(()=>{
      res.redirect('/movies/'+id)
    })
    .catch((err)=>{
      next(err)
    })
  })
  
  router.post('/movies', (req, res, next) => {
    let newMovie = {
        title: req.body.title,
        genre: req.body.genre,
        plot: req.body.plot
    }
    if (typeof req.body.actors === 'string') {
        newMovie.actors = [req.body.actors]
    } else {
        newMovie.actors = req.body.actors;
    }   
    Movie.create(newMovie)
    .then(() => {
      res.redirect('/movies');
    })
    .catch((err) => {
      next(err);
    })
  })

module.exports = router;
