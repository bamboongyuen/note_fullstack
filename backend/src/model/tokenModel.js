const mongoose = require('mongoose');

const tokenSchema = new mongoose.Schema(
    {
        token: { type: String, required: true },
        userId: { type: mongoose.Schema.Types.ObjectId, required: true },
    },
    { timestamps: true },
);

module.exports = new mongoose.model('Token', tokenSchema);
