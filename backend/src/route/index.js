const authRoute = require('./authRoute');

module.exports = function (app) {
    app.use('/api/auth', authRoute);
};
