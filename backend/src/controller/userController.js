const User = require('../model/userModel');

class UserController {
    // [GET] /api/user/search?q=xx
    search(req, res) {
        const qr = req.query.q ? { username: req.query.q } : {};
        User.find(qr)
            .then((doc) => {
                const users = doc.map((item) => {
                    const user = item.toObject();
                    delete user.password;
                    delete user.token;
                    return user;
                });
                return res.status(200).json({ status: true, data: users });
            })
            .catch((err) => {
                return res.status(500).json({ status: false, data: 'Error when search..' });
            });
    }
    // [DELETE] /api/user/delete/:id {}
    delete(req, res) {
        if (!req.params.id) {
            return res.status(401).json({ status: false, data: 'Request invalid' });
        }
        User.findByIdAndDelete(req.params.id)
            .then(() => {
                return res.status(200).json({ status: true, data: `Deleted ${req.params.id}` });
            })
            .catch((err) => {
                return res.status(500).json({ status: false, data: 'Error on delete..' });
            });
    }
}

module.exports = new UserController();
