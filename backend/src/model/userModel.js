const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');

const userSchema = new mongoose.Schema(
    {
        username: { type: String, required: true },
        email: { type: String },
        password: { type: String },
        role: { type: String, default: 'employer' },
        todos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Todo' }],
    },
    { timestamps: true },
);

userSchema.plugin(mongooseDelete, { overrideMethods: 'all', deletedAt: true });

module.exports = mongoose.model('User', userSchema);
