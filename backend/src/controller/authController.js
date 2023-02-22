const bcrypt = require('bcrypt');
const User = require('../model/userModel');
const response = require('../help/response');
const { createToken, decodeToken } = require('../help/token');

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
                    const payload = { _id: doc._id, role: doc.role };
                    const accessToken = createToken(payload, true);
                    const refreshToken = createToken(payload);
                    arr.push(refreshToken);
                    res.cookie('token', 'Bearer ' + refreshToken, {
                        httpOnly: true,
                        secure: false,
                        sameSite: 'strict',
                    });
                    const data = { ...doc.toObject(), token: 'Bearer ' + accessToken };
                    return res.status(200).json(response(true, data));
                });
            })
            .catch((err) => {
                return res.status(500).json(response(false, 'DB error'));
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
        const token = req.cookies.token?.split(' ')[1];
        const decode = decodeToken(token);
        if (!decode) {
            return res.status(400).json(response(false, 'Request no authentication.'));
        }
        arr = arr.filter((tk) => tk !== token);
        const payload = { _id: decode?._id, role: decode?.role };
        const accessToken = createToken(payload, true);
        const refreshToken = createToken(payload);
        arr.push(refreshToken);

        res.cookie('token', 'Bearer ' + refreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: 'strict',
        });
        const data = { ...payload, token: 'Bearer ' + accessToken };
        return res.status(200).json(response(true, data));
    },
    logout: (req, res) => {
        //
        const token = req.cookies.token?.split(' ')[1];
        arr = arr.filter((tk) => tk !== token);
        res.clearCookie('token');
        res.status(200).json(response(true, 'logout.'));
    },
};
