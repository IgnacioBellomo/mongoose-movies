const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const movieSchema = new Schema({
    title: String,
    genre: String,
    image: String,
    actors: [{type: Schema.Types.ObjectId, ref: "Celebrity"}],
    plot: String
})

const Movie = mongoose.model("Movie", movieSchema)
// name of the model should ALWAYS be capitalized and ALWAYS be singular
// this will create a collection called 'movies'


module.exports = Movie;