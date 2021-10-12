const mongoose = require('mongoose');
const passportLocalMonngoose = require('passport-local-mongoose');

const UserSchema = new  mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true
    }
})

UserSchema.plugin(passportLocalMonngoose);

module.exports = mongoose.model('User',UserSchema);