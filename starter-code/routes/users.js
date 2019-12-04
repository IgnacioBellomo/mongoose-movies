const express = require('express');
const router  = express.Router();
const User = require('../models/user');

router.get('/login', (req, res, next) => {
    res.render('users/login');
})

router.post('/login', (req, res, next) => {
    let email = req.body.email;
    let password = req.body.password;

    User.findOne({"email": email})
    .then((user) => {
        if (!user) {
            console.log('User does not exist')
            res.redirect('/login');
            return;
        }
        if (bcrypt.compareSync(password, user.password)) {
            // Save the login in the session!
            req.session.currentUser = user;// this is the line of code that actually logs us in
            res.redirect("/");
            } else {
                console.log('Incorrect password')
                res.redirect('/login');
            }
        })
    .catch(error => {
    next(error);
    })
})


