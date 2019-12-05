const express = require('express');
const router  = express.Router();
const Celebrity = require('../models/celebrity');


/* 
  GET requests
*/


//GET home page
router.get('/', (req, res, next) => {
  res.render('index');
});

// GET celebrities home page
router.get('/celebrities', (req, res, next) => {
  Celebrity.find()
  .then((celebrities) => {
    res.render('celebrities/index', {celebs: celebrities})
  })
  .catch((err) => {
    next(err);
  })
})

// GET create new celebrity page
router.get('/celebrities/new', (req, res, next) => {
  if(!req.session.currentUser){
    res.redirect('/login');
    return;
  }
  res.render('celebrities/new')
})

// GET edit a celebrity page
router.get('/celebrities/:celebId/edit', (req, res, next) => {
  if(!req.session.currentUser){
    res.redirect('/login');
    return;
  }
  let id = req.params.celebId;
  Celebrity.findById(id)
  .then((celeb) => {
    res.render('celebrities/edit', {celeb: celeb});
  })
  .catch((err) => {
    next(err);
  })
})

// GET celebrity info page
router.get('/celebrities/:celebId', (req, res, next) => {
  let id = req.params.celebId;
  Celebrity.findById(id)
  .then((celeb) => {
    res.render('celebrities/show', {celeb: celeb})
  })
  .catch((err) => {
    next(err);
  })
})


/* 
  POST requests
*/


// POST delete a celebrity
router.post('/celebrities/:celebId/delete', (req, res, next) => {
  if(!req.session.currentUser){
    res.redirect('/login');
    return;
  }
  let id = req.params.celebId;
  Celebrity.findByIdAndRemove(id)
  .then(() => {
    res.redirect('/celebrities');
  })
  .catch((err) => {
    next(err);
  })
})

// POST update a celebrity
router.post('/celebrities/:celebId', (req, res, next) => {
  if(!req.session.currentUser){
    res.redirect('/login');
    return;
  }
  let id = req.params.celebId;
  let update = {...req.body};
  Celebrity.findByIdAndUpdate(id, update)
  .then(()=>{
    res.redirect('/celebrities/'+id)
  })
  .catch((err)=>{
    next(err)
  })
})


// POST create a celebrity
router.post('/celebrities', (req, res, next) => {
  if(!req.session.currentUser){
    res.redirect('/login');
    return;
  }
  Celebrity.create(req.body)
  .then(() => {
    res.redirect('/celebrities');
  })
  .catch((err) => {
    next(err);
  })
})


module.exports = router;
