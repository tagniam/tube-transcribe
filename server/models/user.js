const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    transcriptions: [{
        videoId: { type: String },
        markers: { type: [Number] }
    }]
});

const User = module.exports = mongoose.model('User', userSchema);

module.exports.getUserById = function(id, callback) {
    User.findById(id, callback);
}

module.exports.getUserByEmail = function(email, callback) {
    const query = { email: email };
    User.findOne(query, callback);
}

module.exports.addUser = function(newUser, callback) {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hashedPassword) => {
            if (err) throw err;
            newUser.password = hashedPassword;
            newUser.save(callback);
        });
    });
}

module.exports.comparePassword = function(candidatePassword, hash, callback) {
    bcrypt.compare(candidatePassword, hash, (err, isMatch)=> {
        if (err) throw err;
        callback(null, isMatch);
    });
}

module.exports.saveVideo = function(user, videoId, callback) {
    // TODO ensure no duplicates
    user.transcriptions.push({ videoId: videoId });
    user.save(callback);
}

module.exports.updateVideoMarkers = function(user, videoId, markers, callback) {
    // Search for video and update markers
    for (var i = 0; i < user.transcriptions.length; i++) {
        if (user.transcriptions[i].videoId == videoId) {
            user.transcriptions[i].markers = markers; 
            break;
        }
    }
    // TODO handle when video not found

    user.save(callback);
}