const mongoose = require('mongoose');

const collegeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    city: { type: String, required: true },
    students: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    }],
    feeds: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'feeds'
    }]
}, {
    timestamps: true
});


const College = mongoose.model('colleges', collegeSchema);
module.exports = College;