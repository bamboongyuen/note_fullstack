const authRoute = require('./authRoute');
const userRoute = require('./userRoute');
const noteRoute = require('./noteRoute');
const authentication = require('../middleware/authentication');

module.exports = function (app) {
    app.use('/api/auth', authRoute);
    app.use('/api/user', authentication, userRoute);
    app.use('/api/notes', authentication, noteRoute);
};
