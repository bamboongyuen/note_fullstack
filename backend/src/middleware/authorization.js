const response = require('../help/response');

module.exports = function authorization(role) {
    const roleLevel = role === 'admin' ? 3 : role === 'manager' ? 2 : 1;

    return (req, res, next) => {
        role = req.role;
        const reqRoleLevel = role === 'admin' ? 3 : role === 'manager' ? 2 : 1;
        if (reqRoleLevel < roleLevel)
            return res.status(403).json(response(false, 'Request forbindden.'));
        next();
    };
};
