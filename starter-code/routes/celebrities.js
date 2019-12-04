const express = require('express');
const router  = express.Router();
const Celebrity = require('../models/celebrity');

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

router.get('/celebrities', (req, res, next) => {
  Celebrity.find()
  .then((celebrities) => {
    res.render('celebrities/index', {celebs: celebrities})
  })
  .catch((err) => {
    next(err);
  })
})

router.get('/celebrities/new', (req, res, next) => {
  res.render('celebrities/new')
})

router.post('/celebrities/:celebId/delete', (req, res, next) => {
  let id = req.params.celebId;
  Celebrity.findByIdAndRemove(id)
  .then(() => {
    res.redirect('/celebrities');
  })
  .catch((err) => {
    next(err);
  })
})

router.get('/celebrities/:celebId/edit', (req, res, next) => {
  let id = req.params.celebId;
  Celebrity.findById(id)
  .then((celeb) => {
    res.render('celebrities/edit', {celeb: celeb});
  })
  .catch((err) => {
    next(err);
  })
})

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

router.post('/celebrities/:celebId', (req, res, next) => {
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

router.post('/celebrities', (req, res, next) => {
  Celebrity.create(req.body)
  .then(() => {
    res.redirect('/celebrities');
  })
  .catch((err) => {
    next(err);
  })
})


module.exports = router;
