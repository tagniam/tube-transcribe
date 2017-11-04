const express = require('express');
const router = express.Router();

const User = require('./models/user');

// Register profile
router.post('/user', (req, res, next) => {
    let newUser = new User({
        email: req.body.email,
        password: req.body.password,
        transcriptions: []
    });

    User.addUser(newUser, (err, user) => {
        if (err) return res.json({ success: false, msg: 'Failed to register user' });
        return res.json({ success: true, msg: 'User registered' });
    });
});

// Get profile
router.get('/user', (req, res, next) => {
    User.getUserByEmail(req.body.email, (err, user) => {
        if (err) throw err;
        if (!user) return res.json({ success: false, msg: 'Failed to find user' });
        user.password = undefined;
        return res.json({ success: true, user: user });
    });
});

// Update profile
router.put('/user', (req, res, next) => {
    const user = req.body.user;
    User.updateUser(user, (err) => {
        if (err) throw err;
        return res.json({ success: true, msg: 'Updated user' });
    });
});

module.exports = router;