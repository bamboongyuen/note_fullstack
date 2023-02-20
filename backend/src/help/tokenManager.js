const Token = require('../model/tokenModel');
const jwt = require('jsonwebtoken');

function createRefreshToken(data) {
    const token = jwt.sign(data, process.env.REFRESH_JWT, { expiresIn: 60 });
    const userId = data._id;
    Token.findOneAndUpdate({ userId }, { token })
        .then((res) => {
            if (!res) {
                new Token({ token, userId }).save();
                console.log('user login.');
            } else console.log('relogin.');
        })
        .catch((err) => console.log(err));
    return token;
}
function createAccessToken(data) {
    const token = jwt.sign(data, process.env.ACCESS_JWT, { expiresIn: 90 });
    return token;
}

module.exports = {
    createRefreshToken,
    createAccessToken,
};
