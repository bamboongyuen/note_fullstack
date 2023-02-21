const User = require('../model/userModel');
const bcrypt = require('bcrypt');
const response = require('../help/response');
const { createToken } = require('../help/token');

let arr = [];

module.exports = {
    // [POST] /api/auth/login
    login: (req, res) => {
        User.find({ username: req.body.username })
            .then(([doc]) => {
                if (!doc) {
                    return res.status(400).json(response(false, 'Wrong username and password.'));
                }
                bcrypt.compare(req.body.password, doc.password, (_, result) => {
                    if (!result) {
                        return res
                            .status(400)
                            .json(response(false, 'Wrong username and password.'));
                    }
                    const accessToken = createToken({ _id: doc._id, role: doc.role }, true);
                    const refreshToken = createToken({ _id: doc._id, role: doc.role });
                    arr.push(refreshToken);
                    res.cookie('token', 'Bearer ' + accessToken, {
                        httpOnly: true,
                        secure: false,
                        sameSite: 'strict',
                    });
                    const data = { ...doc.toObject(), token: 'Bearer ' + refreshToken };
                    res.status(200).json(response(true, data));
                });
            })
            .catch((err) => {
                return res.status(400).json(response(false, 'DB error'));
            });
    },
    signup: (req, res) => {
        //
        const password = bcrypt.hashSync(req.body.password, 10);
        new User({ ...req.body, password })
            .save()
            .then((newUser) => {
                //
                return res.status(201).json(response(true, newUser));
            })
            .catch((err) => {
                //
                if (err.code === 11000)
                    return res.status(400).json(response(false, 'Username in using.'));
                else return res.status(500).json(response(false, 'DB error.'));
            });
    },
    refresh: (req, res) => {
        //
    },
    logout: (req, res) => {
        //
        res.clearCookie('token');
        arr = arr.filter((tk) => tk !== req.headers.token);
        res.status(200).json(response(true, 'logout.'));
    },
};
