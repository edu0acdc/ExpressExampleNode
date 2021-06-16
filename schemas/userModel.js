const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true, dropDups: true },
    age: { type: Number, required: true },
    email: { type: String, required: true, unique: true, dropDups: true },
    password: { type: String, required: true }
})

const User = mongoose.model('User', UserSchema)
module.exports = User;