const mongoose = require('mongoose');

const collegeSchema = new mongoose.Schema({
    //Login fields
    name: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});


const College = mongoose.model('colleges', collegeSchema);
module.exports = College;