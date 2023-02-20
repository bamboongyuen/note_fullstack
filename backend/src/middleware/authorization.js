module.exports = function authorization(role) {
    return (req, res, next) => {
        const roleLevel = role === 'admin' ? 3 : role === 'manager' ? 2 : 1;
        const requestLevel = req.tokenRole === 'admin' ? 3 : req.tokenRole === 'manager' ? 2 : 1;
    };
};
