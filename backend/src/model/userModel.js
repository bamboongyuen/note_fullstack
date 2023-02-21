const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        username: { type: String, uniqued: true },
        password: { type: String, required: true },
        email: { type: String },
        role: { type: String, default: 'employer' },
    },
    { timestamps: true },
);

module.exports = mongoose.model('User', userSchema);
