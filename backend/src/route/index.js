module.exports = function (app) {
    app.use('/', (req, res) => res.json('ok'));
};
