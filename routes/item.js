/*
    Authentication routes
    URL = host + /api/item
*/

const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();

const { fieldValidator } = require('../middlewares/fieldValidator');
const {
    createItem,
    getItem,
    updateItem,
    deleteItem,
    getAllItems,
} = require('../controllers/item');
const { jwtValidator } = require('../middlewares/jwtValidator');

// JWT validation - Move or comment to make routes public.
router.use( jwtValidator )

// ROUTE - CREATE ITEM
router.post(
    // Route
    '/create',
    // Middlewares
    [   
        check('name', 'Item name must be longer than 4 characters').isLength({
            min: 4,
        }),
        check('description', 'Description is mandatory').not().isEmpty(),
        fieldValidator,
    ],
    // Controller
    createItem
);

// ROUTE - READ ALL ITEMs
router.get(
    // Route
    '/all',
    // Middlewares
    [
    ],
    // Controller
    getAllItems
);

// ROUTE - READ ITEM
router.get(
    // Route
    '/:id',
    // Middlewares
    [
    ],
    // Controller
    getItem
);


// ROUTE - UPDATE ITEM
router.put(
    // Route
    '/:id',
    // Middlewares
    [
        check('name', 'IItem name must be longer than 4 characters').isLength({
            min: 4,
        }),
        check('description', 'Description is mandatory').not().isEmpty(),
        fieldValidator
    ],
    // Controller
    updateItem
);

// ROUTE - DELETE ITEM
router.delete(
    // Route
    '/:id',
    // Middlewares
    [
        check('name', 'IItem name must be longer than 4 characters').isLength({
            min: 4,
        }),
    ],
    // Controller
    deleteItem
);

module.exports = router;
