const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const userSchema = new mongoose.Schema({
    //Login fields
    username: { type: String, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    salt: { type: String, required: true },
    name: { type: String, required: true },
    // Activity related fields
    college_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    feeds: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'feeds'
    }],
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'comments'
    }]
}, {
    timestamps: true
});

userSchema.methods.setUsername = function (email) {
    this.username = email.substring(0, email.indexOf('@'));
}

userSchema.methods.setPassword = async function (password) {
    // Creating a unique salt for a particular user
    this.salt = await bcrypt.genSalt(10);
    // Hashing user's password
    this.password = await bcrypt.hash(password, this.salt);
};

userSchema.methods.checkPassword = async function (password) {
    return (await bcrypt.compare(password, this.password));
};


const User = mongoose.model('users', userSchema);
module.exports = User;