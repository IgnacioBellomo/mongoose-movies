const express = require('express');
const router  = express.Router();
const Movie = require('../models/movie');
const Celebrity = require('../models/celebrity');


/* 
  GET requests
*/


// GET home page for movies
router.get('/movies', (req, res, next) => {
    Movie.find()
    .then((movies) => {
        res.render('movies/index', {movies: movies});
    })
    .catch((err) => {
        next(err);
    })
})

// GET create a new movie page
router.get('/movies/new', (req, res, next) => {
  if(!req.session.currentUser){
    res.redirect('/login');
    return;
  }
    Celebrity.find()
    .then((celebs) => {
        res.render('movies/new', {celebs: celebs})
    })
})
  
// GET edit a movie page
router.get('/movies/:movieId/edit', async (req, res, next) => {
  if(!req.session.currentUser){
    res.redirect('/login');
    return;
  }
  let id = req.params.movieId;
  let movie = await Movie.findById(id).catch((err) => console.log(err))
  let celebs = await Celebrity.find().catch((err) => console.log(err))
  res.render('movies/edit', {celebs: celebs, movie: movie})
})
  
// GET movie info page
router.get('/movies/:movieId', async (req, res, next) => {
  let id = req.params.movieId;
  let actors = [];
  let movie = await Movie.findById(id).populate('actors').catch((err) => console.log(err))
  res.render('movies/show', {movie});
})


/* 
  POST requests
*/


// POST delete a movie
router.post('/movies/:movieId/delete', (req, res, next) => {
  if(!req.session.currentUser){
    res.redirect('/login');
    return;
  }
  let id = req.params.movieId;
  Movie.findByIdAndRemove(id)
  .then(() => {
    res.redirect('/movies');
  })
  .catch((err) => {
    next(err);
  })
})

// POST edit a movie
router.post('/movies/:movieId', (req, res, next) => {
  if(!req.session.currentUser){
    res.redirect('/login');
    return;
  }
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

// POST create a movie
router.post('/movies', (req, res, next) => {
  if(!req.session.currentUser){
    res.redirect('/login');
    return;
  }
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
