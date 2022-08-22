// https://www.npmjs.com/package/jsonwebtoken
const jwt = require('jsonwebtoken');
/**
 *
 * @param {express.Request} req Request
 * @param {express.Response} res Response
 * @param {*} next
 */
const jwtValidator = (req, res, next) => {
    const token = req.header('x-token');
    // Token not exists
    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'Token not found in the request.',
        });
    }

    try {
        const { uid, name } = jwt.verify(token, process.env.SECRET_JWT_SEED);
        req.user = { uid, name };
        next();
    } catch (error) {
        // Invalid token
        console.log(error);
        return res.status(401).json({
            ok: false,
            msg: 'Invalid token.',
        });
    }
};

module.exports = {
    jwtValidator,
};
