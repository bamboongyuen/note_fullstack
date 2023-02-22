const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        content: { type: String },
        userId: { type: mongoose.Schema.Types.ObjectId },
    },
    { timestamps: true },
);

module.exports = mongoose.model('Note', noteSchema);
