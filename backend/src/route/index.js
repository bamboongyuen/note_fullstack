const authRoute = require('./authRoute');
const noteRoute = require('./noteRoute');
const userRoute = require('./userRoute');
const verifyToken = require('../middleware/verifyToken');

module.exports = function router(app) {
    //
    app.use('/api/auth', authRoute);
    app.use('/api/note', noteRoute);
    app.use('/api/user', verifyToken, userRoute);
};
