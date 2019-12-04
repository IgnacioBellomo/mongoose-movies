const express = require('express');
const mongoose     = require('mongoose');
const Movie    = require('../models/movie');
const dbName = 'mongoose-celebrities';
mongoose.connect(`mongodb://localhost/${dbName}`);


const movies = [
    {
        title: 'Teenage Mutant Ninja Coders',
        genre: 'Horror',
        actors: ['5de7dfcea7463f2323588a42'],
        plot: 'A man leaves his job to pursue a career as a web developer by joining a coding bootcamp.'
    },
    {
        title: 'By the Seashore',
        genre: 'Comedy',
        actors: ['5de7dfcea7463f2323588a43'],
        plot: 'A beachside market starts to lose clientelle to the neighboring establishments, and starts to implement unorthodox methods to win it back.'
    },
    {
        title: 'The Girl Nestor',
        genre: 'Romance',
        actors: ['5de7dfcea7463f2323588a44'],
        plot: 'A young carpenter falls for his neighbor after becoming her handyman.'
    }
]

Movie.create(movies)
.then((res) => {
    console.log('movies created')
})
.catch((err) => {
    console.log(err)
})



