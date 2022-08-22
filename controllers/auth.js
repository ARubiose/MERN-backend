const { response } = require('express');
const bcrypt = require('bcryptjs');

const User = require('../models/UserModel');
const { generateJWT } = require('../helpers/jwt');

/**
 * Controller for /api/auth/new
 * @param {express.Request} req
 * @param {express.Response} res
 */
const createUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        // User validation - User does exist
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                ok: false,
                msg: 'User already exists',
            });
        }

        // Create user object
        user = new User(req.body);

        // Encrypt user password
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);

        // Save user
        await user.save();

        // Generate JWT
        const token = await generateJWT(user.id, user.name);

        // Sucess
        res.status(201).json({
            ok: true,
            uid: user.id,
            name: user.name,
            token,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Please, talk to the administrator',
        });
    }
};

const loginUser = async (req, res = response) => {
    const { email, password } = req.body;

    try {
        // User validation - User does exist
        let user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                ok: false,
                msg: 'User does not exist',
            });
        }

        // User validation - password
        const validPassword = bcrypt.compareSync(password, user.password);

        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Incorrect password',
            });
        }

        // Generate JWT
        const token = await generateJWT(user.id, user.name);

        //  Success
        res.status(200).json({
            ok: true,
            uid: user.id,
            name: user.name,
            token,
        });
    } catch (error) {}
};

/**
 * Verify JWT and return a new JWT
 * @param {*} req
 * @param {*} res
 */
const renewToken = async (req, res = response) => {
    const { uid, name } = req.user;

    // Generate new token
    const token = await generateJWT(uid, name);

    res.json({
        ok: true,
        uid,
        name,
        token,
    });
};

const deleteUser = (req, res = response) => {};

module.exports = {
    createUser,
    deleteUser,
    renewToken,
    loginUser,
};
