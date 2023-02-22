const Note = require('../model/noteModel');
const response = require('../help/response');

module.exports = {
    // [POST] /api/notes
    create: (req, res) => {
        if (!req.body.title || !req.body.userId)
            return res.status(400).json(response(false, 'Request miss params'));
        new Note(req.body)
            .save()
            .then((doc) => {
                return res.status(201).json(response(true, doc));
            })
            .catch((err) => {
                return res.status(500).json(response(false, 'Save error.'));
            });
    },
    // [GET] /api/notes?q=xx
    search: (req, res) => {
        const qr = req.query.q ? { title: { $regex: req.query.q } } : {};
        Note.find(qr)
            .then((doc) => {
                return res.status(201).json(response(true, doc));
            })
            .catch((err) => {
                return res.status(500).json(response(false, 'Save error.'));
            });
    },
    // [PUT] /api/notes/:id
    update: (req, res) => {
        if (!req.params.id || !req.body.title)
            return res.status(404).json(response(false, 'Request miss params'));
        Note.findByIdAndUpdate(req.params.id, req.body)
            .then((doc) => {
                if (doc) return res.status(200).json(response(true, 'OK. update'));
                return res.status(203).json(response(false, 'No note on DB'));
            })
            .catch((err) => {
                return res.status(500).json(response(false, 'DB error'));
            });
    },
    // [DELETE] /api/notes/:id
    destroy: (req, res) => {
        if (!req.params.id) return res.status(404).json(response(false, 'Request miss params'));
        Note.findByIdAndDelete(req.params.id)
            .then((doc) => {
                if (doc) return res.status(200).json(response(true, 'OK. deleted'));
                return res.status(203).json(response(false, 'No note on DB'));
            })
            .catch((err) => {
                return res.status(500).json(response(false, 'DB error'));
            });
    },
};
