const mongoose = require('mongoose');

const feedSchema = new mongoose.Schema({
    creator: {
        type: mongoose.Schema.Types.ObjectId
    },
    college: {
        type: mongoose.Schema.Types.ObjectId
    },
    tag: String,
    heading: String,
    description: String,
    deadline:Number,
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'comments'
    }]
}, {
    timestamps: true
});


const Feed = mongoose.model('feeds', feedSchema);
module.exports = Feed;