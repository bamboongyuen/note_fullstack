const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');

const noteSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        userId: { type: mongoose.Schema.Types.ObjectId },
        content: { type: String },
    },
    { timestamps: true },
);

noteSchema.plugin(mongooseDelete, { overrideMethods: true, deletedAt: true });

module.exports = mongoose.model('Note', noteSchema);
