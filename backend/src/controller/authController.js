const User = require('../model/userModel');
const Token = require('../model/tokenModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { createRefreshToken } = require('../help/tokenManager');

class AuthController {
    // [POST] /api/login {body}
    login(req, res) {
        User.find({ username: req.body.username })
            .then((doc) => {
                if (!doc.length) {
                    return res
                        .status(401)
                        .json({ status: false, data: 'Wrong username and password' });
                }
                bcrypt.compare(req.body.password, doc[0].password, async (_, result) => {
                    if (result) {
                        const profile = doc[0].toObject();
                        const data = { _id: doc[0]._id, role: doc[0].role };
                        delete profile.password;
                        //token
                        const refreshToken = await createRefreshToken(data);
                        profile.token = refreshToken;
                        //createAccessToken(data);

                        return res.status(200).json({ status: true, data: profile });
                    } else {
                        return res.status(401).json({
                            status: false,
                            data: 'Wrong username and password',
                        });
                    }
                });
            })
            .catch((err) => {
                return res.status(401).json({
                    status: false,
                    data: 'Error on finding',
                });
            });
    }
    // [POST] /api/signup {body}
    signup(req, res) {
        bcrypt.hash(req.body.password, 10, (err, pwCrypt) => {
            if (err)
                return res.status(401).json({
                    status: false,
                    data: 'Error on crypt',
                });
            new User({ ...req.body, password: pwCrypt })
                .save()
                .then((saveUser) => {
                    return res.status(201).json({
                        status: true,
                        data: {
                            _id: saveUser._id,
                            role: saveUser.role,
                        },
                    });
                })
                .catch((err) => {
                    return res.status(401).json({
                        status: false,
                        data: 'Username was registed.',
                    });
                });
        });
    }
    // [POST] /api/refresh/:id
    resfreshToken(req, res) {
        if (!req.headers.token) {
            return res.status(401).json({ status: false, data: 'Access without token.' });
        }
        const decode = jwt.decode(req.headers.token);

        Token.findOne({ token: req.headers.token })
            .then(async (doc) => {
                if (doc) {
                    const data = { _id: decode._id, role: decode.role };
                    const newToken = await createRefreshToken(data);
                    return res.status(200).json({ status: true, data: newToken });
                } else {
                    return res.status(401).json({
                        status: false,
                        data: 'Token invalid',
                    });
                }
            })
            .catch((_) => {
                return res.status(401).json({
                    status: false,
                    data: 'Token invalid',
                });
            });
    }
    // [POST] /api/logout/:id
    logout(req, res) {
        Token.findOneAndDelete({ userId: req.params.id })
            .then((res) => {
                if (res_id) console.log('logout.');
            })
            .catch((err) => console.log(err));
        return res.status(200).json('logout token');
    }
}

module.exports = new AuthController();
