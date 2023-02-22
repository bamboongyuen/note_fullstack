const authRoute = require('./authRoute');
const userRoute = require('./userRoute');
const authentication = require('../middleware/authentication');

module.exports = function (app) {
    app.use('/api/auth', authRoute);
    app.use('/api/user', authentication, userRoute);
};
