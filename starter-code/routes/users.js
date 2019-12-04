const express = require('express');
const router  = express.Router();
const User    = require('../models/User');
const bcrypt  = require('bcryptjs');

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

router.get('/signup', (req, res, next) => {
    res.render('users/signup');
})

router.post('/signup', (req, res, next)=>{

    const salt  = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const email = req.body.email;
    const name = req.body.name;

    User.findOne({"email": email})
    .then((user) => {
        if (!user) {
            User.create({email: email, password: hash, name: name})
            .then(()=>{
                res.redirect('/')
            })
            .catch((err)=>{
                next(err)
            })
        } else {
            console.log('Email already in use')
            res.redirect('/signup');
            return;
        }
    })
})

router.post('/logout', (req, res, next)=>{
    req.session.destroy()
    res.redirect('/')
})

module.exports = router;

