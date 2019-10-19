var mongoose = require('mongoose');

var postsSchema = new mongoose.Schema({
    username: {
        type: String,
    },
    post: {
        type: String,
        required: true
    },
    ipAddress: {
        type: String,
        required: true
    },
    isAllowed: {
        type: Boolean,
        required: true,
        default: false
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('posts', postsSchema);