const User = require('../model/userModel');
const response = require('../help/response');

module.exports = {
    // [GET] /api/user/search?q=xx
    search: (req, res) => {
        const qr = req.query.q ? { username: { $regex: req.query.q } } : {};
        User.find(qr)
            .then((doc) => {
                if (doc.length) {
                    const data = '';
                    return res.status(200).json(response(true, doc));
                } else {
                    return res.status(203).json(response(false, 'Cant find'));
                }
            })
            .catch((err) => {
                return res.status(500).json(response(false, 'DB error'));
            });
    },
    // [DELETE] /api/user/delete/:id
    delete: (req, res) => {
        User.findByIdAndDelete(req.params.id)
            .then((doc) => {
                if (doc) return res.status(200).json(response(true, 'OK. deleted'));
                return res.status(203).json(response(false, 'No user'));
            })
            .catch((err) => {
                console.log(err);
                return res.status(500).json(response(false, 'DB error'));
            });
    },
};
