/*
    Authentication routes
    URL = host + /api/auth
*/

const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();

const { fieldValidator } = require('../middlewares/fieldValidator');
const { jwtValidator } = require('../middlewares/jwtValidator');
const {
    createUser,
    deleteUser,
    renewToken,
    loginUser,
} = require('../controllers/auth');

// ROUTE - LOGIN USER 
router.post(
    // Route
    '/',
    // Middlewares
    [
        check('email', 'Incorrect email format').isEmail(),
        check('password', 'Password must be longer than 6 characters').isLength(
            { min: 6 }
        ),
        fieldValidator
    ],
    // Controller
    loginUser
);

// ROUTE - ADD NEW USER
router.post(
    // Route
    '/new',
    // Middlewares
    [
        check('name', 'Name is mandatory').not().isEmpty(),
        check('email', 'Incorrect email format').isEmail(),
        check('password', 'Password must be longer than 6 characters').isLength(
            { min: 6 }
        ),
        fieldValidator
    ],
    // Controller
    createUser
);

// ROUTE - RENEW JWT
router.get(
    // Route
    '/renew',
    // Middlewares
    [
        jwtValidator
    ],
    // Controller
    renewToken);

// Delete user
router.post('/delete', deleteUser);

module.exports = router;
