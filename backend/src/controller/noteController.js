const Note = require('../model/noteModel');

class NoteController {
    // [GET] /api/note/search?q=userId&ti=xx
    search(req, res) {
        const qr = { userId: req.query.q };
        if (req.query.ti) qr.title = { $regex: req.query.ti };

        Note.find(qr)
            .then((doc) => {
                const notes = doc.map((note) => note.toObject());
                return res.status(200).json({ status: true, data: notes });
            })
            .catch((err) => {
                return res.status(500).json({ status: false, data: 'Error when searching..' });
            });
    }
    // [POST] /api/note/create {body}
    create(req, res) {
        new Note(req.body)
            .save()
            .then((saveNote) => {
                return res.status(200).json({ status: true, data: saveNote });
            })
            .catch((err) => {
                return res.status(500).json({ status: false, data: 'Error when create..' });
            });
    }
    // [POST] /api/note/save/:id {body}
    save(req, res) {
        Note.findByIdAndUpdate(req.params.id, req.body)
            .then((doc) => {
                if (doc._id) {
                    return res.status(200).json({ status: true, data: 'updated' });
                }
            })
            .catch((err) => {
                return res.status(500).json({ status: false, data: 'Error when save' });
            });
    }
}

module.exports = new NoteController();
