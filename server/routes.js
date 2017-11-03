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
        if (err) return res.json({ success: false, msg: 'Failed to register user' });
        return res.json({ success: true, msg: 'User registered' });
    });
});

// Add video
router.post('/save-video', (req, res, next) => {
    const email = req.body.email;
    const videoId = req.body.videoId;

    User.getUserByEmail(email, (err, user) => {
        if (err) throw err;
        if (!user) return res.json({ success: false, msg: 'User not found' });

        User.saveVideo(user, videoId, (err, user) => {
            if (err) return res.json({ success: false, msg: '' + err });
            return res.json({ success: true, msg: 'Video saved' });
        })
    });
});

module.exports = router;