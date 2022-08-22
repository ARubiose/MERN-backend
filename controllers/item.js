const Item = require('../models/ItemModel');

/**
 * Controller for /api/item/delete
 * @param {express.Request} req
 * @param {express.Response} res
 */
const getAllItems = async (req, res) => {
    const items = await Item.find().populate('user', 'name');

    res.status(200).json({
        ok: true,
        items,
    });
};

/**
 * Controller for /api/item/create
 * @param {express.Request} req
 * @param {express.Response} res
 */
const createItem = async (req, res) => {
    const { name, description } = req.body;
    const { uid } = req.user;
    try {
        // Item validation - Item does exist
        let item = await Item.findOne({ name });
        if (item) {
            return res.status(400).json({
                ok: false,
                msg: 'Item with same name already exists',
            });
        }

        // Create item object
        item = new Item(req.body);
        item.user = uid;
        // Save item
        const itemSaved = await item.save();

        // Sucess
        res.status(201).json({
            ok: true,
            item: itemSaved,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Please, talk to the administrator',
        });
    }
};

/**
 * Controller for /api/item/
 * @param {express.Request} req
 * @param {express.Response} res
 */
const getItem = async (req, res) => {
    res.status(200).json({
        ok: true,
        msg: 'Get item',
    });
};

/**
 * Controller for /api/item/update
 * @param {express.Request} req
 * @param {express.Response} res
 */
const updateItem = async (req, res) => {
    const itemId = req.params.id;
    const { uid } = req.user;

    try {
        const item = await Item.findById(itemId);

        // Item not found
        if (!item) {
            return res.status(404).json({
                ok: false,
                msg: 'Item not found.',
            });
        }

        // User not authorized
        if (item.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'Unauthorized action.',
            });
        }

        const updatedItem = {
            ...req.body,
            user: uid,
        };

        const newItem = await Item.findByIdAndUpdate(itemId, updatedItem, {
            new: true,
        });

        res.status(200).json({
            ok: true,
            msg: 'Updated',
            item: newItem,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Talked to the administrator',
        });
    }
};
/**
 * Controller for /api/item/delete
 * @param {express.Request} req
 * @param {express.Response} res
 */
const deleteItem = async (req, res) => {
    const itemId = req.params.id;
    const { uid } = req.user;

    try {
        const item = await Item.findById(itemId);

        // Item not found
        if (!item) {
            return res.status(404).json({
                ok: false,
                msg: 'Item not found.',
            });
        }

        // User not authorized
        if (item.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'Unauthorized action.',
            });
        }

        const deletedItem = await Item.findByIdAndDelete(itemId);

        res.status(200).json({
            ok: true,
            msg: 'Deleted',
            item: deletedItem,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Talked to the administrator',
        });
    }
};

module.exports = {
    createItem,
    getItem,
    updateItem,
    deleteItem,
    getAllItems,
};
