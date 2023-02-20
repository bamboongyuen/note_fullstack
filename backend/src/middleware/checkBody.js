module.exports = function checkBody(type) {
    return (req, res, next) => {
        let id, username, password;
        switch (type) {
            case 'userpass':
                username = true;
                password = true;
                break;
            case 'id':
                id = true;
                break;
            case 'iduserpass':
                id = true;
                username = true;
                password = true;
                break;
        }
        if (id) {
            if (!req.body._id)
                return res.status(403).json({ status: false, data: 'Request is missing params.' });
        }
        if (username) {
            if (!req.body.username)
                return res.status(403).json({ status: false, data: 'Request is missing params.' });
        }
        if (password) {
            if (!req.body.password)
                return res.status(403).json({ status: false, data: 'Request is missing params.' });
        }
        next();
    };
};
