const express = require('express');
const mongoose     = require('mongoose');
const Movie    = require('../models/movie');
const Celebrity = require('../models/celebrity');
const dbName = 'mongoose-celebrities';
mongoose.connect(`mongodb://localhost/${dbName}`);

let id = '5de92717dca0032acdabcc88'
let update = {
    image: 'https://img.apmcdn.org/79fb6c8c8777d8d387aa170989ee69cae9151b0d/normal/ed0616-20160505-shining.jpg'
}

Movie.findByIdAndUpdate(id, update)
.then(()=>{
  console.log('updated');
})



