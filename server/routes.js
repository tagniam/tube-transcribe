const express = require('express');
const router = express.Router();

const User = require('./models/user');

// Register
router.post('/register', (req, res, next) => {
    let newUser = new User({
        email: req.body.email,
        password: req.body.password,
        transcriptions: []
    });

    User.addUser(newUser, (err, user) => {
        if (err) {
            res.json({ success: false, msg: 'Failed to register user' });
        }

        else {
            res.json({ success: true, msg: 'User registered' });
        }
    });
});

module.exports = router;