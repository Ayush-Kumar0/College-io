const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    commenter: {
        type: mongoose.Schema.Types.ObjectId
    },
    feed: {
        type: mongoose.Schema.Types.ObjectId
    },
    comment: String
}, {
    timestamps: true
});


const Comment = mongoose.model('comments', commentSchema);
module.exports = Comment;