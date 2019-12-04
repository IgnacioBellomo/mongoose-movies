const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const userSchema = new Schema({
    email: String,
    name: String,
    password: String
})

const User = mongoose.model("User", userSchema)
// name of the model should ALWAYS be capitalized and ALWAYS be singular
// this will create a collection called 'users'


module.exports = User;